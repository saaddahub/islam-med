import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export const schema = JSON.parse(await readFile(new URL('../appwrite/schema.json', import.meta.url), 'utf8'));
const samePermissions = (actual, expected) => Array.isArray(actual) && [...actual].sort().join('\n') === [...expected].sort().join('\n');

export async function setupAppwrite({ endpoint, projectId, key, databaseId = schema.databaseId, tableId = schema.tableId, bucketId = schema.bucketId }, fetcher = fetch) {
  if (!endpoint || !projectId || !key) throw new Error('Set APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID and APPWRITE_API_KEY locally before running setup.');
  const url = new URL(endpoint);
  if (url.protocol !== 'https:' || url.username || url.password || !/^\/v1\/?$/.test(url.pathname) || url.search || url.hash) throw new Error('Use the HTTPS Appwrite API endpoint ending in /v1.');
  for (const id of [projectId, databaseId, tableId, bucketId]) if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/.test(id)) throw new Error('Appwrite resource IDs must be 1–36 letters, digits, periods, hyphens or underscores.');
  const base = endpoint.replace(/\/$/, '');
  async function request(path, method = 'GET', body) {
    const response = await fetcher(base + path, {
      method, headers: { 'X-Appwrite-Project': projectId, 'X-Appwrite-Key': key, 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw Object.assign(new Error(`Appwrite setup returned HTTP ${response.status} for ${path}. Check the setup key scopes and project settings.`), { code: response.status });
    return response.json();
  }
  async function ensure(path, parent, body, compatible = () => true) {
    let current;
    try { current = await request(path); }
    catch (error) { if (error.code !== 404) throw error; return request(parent, 'POST', body); }
    if (!compatible(current)) throw new Error(`Existing resource ${path} has different settings. Review it in Appwrite; setup will not overwrite it.`);
    return current;
  }
  const databasePath = `/tablesdb/${databaseId}`;
  await ensure(databasePath, '/tablesdb', { databaseId, name: 'Islam Medical Complex', specification: 'serverless' });
  const tablePath = `${databasePath}/tables/${tableId}`;
  await ensure(tablePath, `${databasePath}/tables`, { tableId, ...schema.table }, item => item.rowSecurity === true && samePermissions(item.$permissions, schema.table.permissions));
  for (const column of schema.columns) {
    const { type, ...body } = column;
    const columnPath = `${tablePath}/columns/${column.key}`;
    let current = await ensure(columnPath, `${tablePath}/columns/${type}`, body, item => item.required === true && [type, type === 'mediumtext' ? 'string' : type].includes(item.type) && (!column.size || item.size >= column.size));
    for (let attempt = 0; current.status === 'processing' && attempt < 30; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      current = await request(columnPath);
    }
    if (current.status !== 'available') throw new Error(`Column ${column.key} is not ready. Wait a moment and rerun setup; existing content is preserved.`);
  }
  for (const row of schema.rows) await ensure(`${tablePath}/rows/${row.rowId}`, `${tablePath}/rows`, row, item => samePermissions(item.$permissions, row.permissions));
  await ensure(`/storage/buckets/${bucketId}`, '/storage/buckets', { bucketId, ...schema.bucket }, item => item.fileSecurity === false && item.enabled === true && item.maximumFileSize === schema.bucket.maximumFileSize && samePermissions(item.$permissions, schema.bucket.permissions) && samePermissions(item.allowedFileExtensions, schema.bucket.allowedFileExtensions));
  return { databaseId, tableId, bucketId };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  setupAppwrite({
    endpoint: process.env.APPWRITE_ENDPOINT || process.env.VITE_APPWRITE_ENDPOINT,
    projectId: process.env.APPWRITE_PROJECT_ID || process.env.VITE_APPWRITE_PROJECT_ID,
    key: process.env.APPWRITE_API_KEY,
    databaseId: process.env.VITE_APPWRITE_DATABASE_ID,
    tableId: process.env.VITE_APPWRITE_CONTENT_TABLE_ID,
    bucketId: process.env.VITE_APPWRITE_MEDIA_BUCKET_ID,
  }).then(() => process.stdout.write('Appwrite content tables and image bucket are ready. Add the siteadmin label to authorized staff accounts, then revoke the setup key.\n')).catch(error => {
    process.stderr.write(error.message + '\n'); process.exitCode = 1;
  });
}
