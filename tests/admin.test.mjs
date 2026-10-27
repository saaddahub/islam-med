import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { DEFAULT_CONTENT, clinicLinks, isImageUrl, validateContent, validateImageFile } from '../src/content/model.ts';

const clone = () => structuredClone(DEFAULT_CONTENT);
const memoryStorage = () => {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
};
async function api(env) {
  const source = (await readFile(new URL('../src/content/api.ts', import.meta.url), 'utf8'))
    .replaceAll('import.meta.env', JSON.stringify(env))
    .replace("import('appwrite')", `import(${JSON.stringify(import.meta.resolve('appwrite'))})`)
    .replace("'./model'", JSON.stringify(new URL('../src/content/model.ts', import.meta.url).href));
  const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}#${crypto.randomUUID()}`);
}

test('existing website content is valid and extracted copy contains decoded text', () => {
  assert.doesNotThrow(() => validateContent(DEFAULT_CONTENT));
  assert.ok(!JSON.stringify(DEFAULT_CONTENT.copy).includes('&amp;'));
});

test('content rejects broken rendering shapes, unsafe images, duplicate IDs and empty doctor identities', () => {
  for (const mutate of [
    data => { data.copy.Hero.text_1 = null; },
    data => { data.doctors[0].image = 'javascript:alert(1)'; },
    data => { data.doctors[0].image = '//example.com/image.jpg'; },
    data => { data.doctors[1].id = data.doctors[0].id; },
    data => { data.doctors[0].name = ' '; },
    data => { data.departments[0].id = 'broken-route'; },
    data => { data.facilities = []; },
    data => { data.steps = []; },
    data => { data.gallery = []; },
    data => { data.details['department-gynecology'][0].paragraphs = [123]; },
    data => { data.clinic.email = 'broken'; },
    data => { data.copy.Hero.text_1 = 'x'.repeat(12001); },
  ]) {
    const data = clone(); mutate(data); assert.throws(() => validateContent(data));
  }
  const data = clone(); data.doctors = []; assert.doesNotThrow(() => validateContent(data));
});

test('image inputs reject executable schemes and unsupported or oversized uploads', () => {
  assert.equal(isImageUrl('/images/clinic.webp'), true);
  assert.equal(isImageUrl('https://example.com/photo.jpg'), true);
  for (const value of ['javascript:alert(1)', 'data:image/svg+xml,hi', 'http://example.com/a.jpg', '//example.com/a.jpg', '/\\example.com/a.jpg', 'https://user:pass@example.com/a.jpg']) assert.equal(isImageUrl(value), false);
  assert.doesNotThrow(() => validateImageFile({ type: 'image/jpeg', size: 1500 }));
  for (const file of [{ type: 'image/svg+xml', size: 100 }, { type: 'image/jpeg', size: 9 * 1024 * 1024 }, { type: 'image/png', size: 0 }]) assert.throws(() => validateImageFile(file));
});

test('contact links are derived from edited details rather than supplied hrefs', () => {
  const clinic = clinicLinks({ ...DEFAULT_CONTENT.clinic, phone: '+92 (321) 123-4567', email: 'reception@example.com', phoneHref: 'javascript:bad' });
  assert.equal(clinic.phoneHref, 'tel:+923211234567');
  assert.equal(clinic.emailHref, 'mailto:reception@example.com');
});

test('local draft saving is isolated from the public site and rejects stale saves', async () => {
  globalThis.localStorage = memoryStorage(); globalThis.sessionStorage = memoryStorage();
  const client = await api({ DEV: true });
  const data = clone(); data.copy.Hero.text_1 = 'Private draft headline';
  const saved = await client.saveDraft(data, 0);
  assert.equal(saved.version, 1);
  assert.equal((await client.loadContent(true)).content.copy.Hero.text_1, 'Private draft headline');
  assert.equal((await client.loadContent()).content.copy.Hero.text_1, DEFAULT_CONTENT.copy.Hero.text_1);
  await assert.rejects(client.saveDraft(data, 0), /Another tab/);
  await assert.rejects(client.publishDraft(1, 0), /Connect Appwrite/);
});

test('production without configuration never enables the local editor or reads browser drafts', async () => {
  globalThis.sessionStorage = memoryStorage();
  globalThis.localStorage = { getItem() { throw new Error('Production must not read local drafts'); } };
  const client = await api({ DEV: false });
  assert.equal(client.isLocalDemo, false);
  assert.equal((await client.loadContent(true)).version, 0);
  await assert.rejects(client.saveDraft(clone(), 0), /Connect Appwrite/);
});

const APPWRITE_ENV = { DEV: false, VITE_APPWRITE_ENDPOINT: 'https://fra.cloud.appwrite.io/v1', VITE_APPWRITE_PROJECT_ID: 'clinic-project' };
function fakeAppwrite() {
  const seed = { content: '', version: 0, updated_at: '', guard: '' };
  const state = { rows: { draft: structuredClone(seed), published: structuredClone(seed) }, requests: [], transactions: new Map(), loggedIn: false, labels: ['siteadmin'], beforeCommit: null, uploaded: [] };
  const fail = (code, message) => Response.json({ code, message, type: 'test_failure' }, { status: code });
  state.fetch = async (url, options = {}) => {
    const parsed = new URL(url); const path = parsed.pathname.replace(/^\/v1/, '');
    const method = options.method || 'GET'; const body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
    const headers = new Headers(options.headers);
    state.requests.push({ path, method, body, headers, credentials: options.credentials });
    if (path === '/account/sessions/email') { state.loggedIn = true; return Response.json({ $id: 'session' }); }
    if (path === '/account/sessions/current' && method === 'DELETE') { state.loggedIn = false; return Response.json({}); }
    if (path === '/account') return state.loggedIn ? Response.json({ $id: 'staff', email: 'staff@example.com', labels: state.labels }) : fail(401, 'No session');
    const admin = state.loggedIn && state.labels.includes('siteadmin');
    if (path.includes('/storage/')) {
      if (!admin) return fail(403, 'Not authorized');
      if (method === 'POST') {
        state.uploaded.push({ file: body.get('file'), permissions: body.getAll('permissions[]'), headers });
        return Response.json({ $id: body.get('fileId'), chunksTotal: 1, chunksUploaded: 1 });
      }
      return Response.json({ total: 2, files: [{ $id: 'photo1', name: 'clinic.jpg', chunksTotal: 1, chunksUploaded: 1 }, { $id: 'partial', name: 'unfinished.jpg', chunksTotal: 2, chunksUploaded: 1 }] });
    }
    if (path === '/tablesdb/transactions' && method === 'POST') {
      if (!admin) return fail(403, 'Not authorized');
      const id = crypto.randomUUID(); state.transactions.set(id, { snapshots: {}, staged: {} }); return Response.json({ $id: id });
    }
    if (path.startsWith('/tablesdb/transactions/') && method === 'PATCH') {
      if (!admin) return fail(403, 'Not authorized');
      const id = path.split('/').at(-1); const tx = state.transactions.get(id);
      if (body.rollback) { state.transactions.delete(id); return Response.json({ $id: id }); }
      if (state.beforeCommit) { const act = state.beforeCommit; state.beforeCommit = null; act(); }
      if (Object.entries(tx.snapshots).some(([key, snapshot]) => JSON.stringify(state.rows[key]) !== snapshot)) return fail(409, 'Transaction conflict');
      Object.assign(state.rows, structuredClone(tx.staged)); state.transactions.delete(id); return Response.json({ $id: id });
    }
    const rowId = path.split('/').at(-1);
    if (!['draft', 'published'].includes(rowId)) throw new Error('Unexpected request: ' + path);
    if ((rowId === 'draft' || method !== 'GET') && !admin) return fail(403, 'Not authorized');
    const transactionId = method === 'GET' ? parsed.searchParams.get('transactionId') : body?.transactionId;
    const tx = state.transactions.get(transactionId);
    if (method === 'PATCH') {
      assert.ok(tx, 'writes must be inside a transaction');
      if (!tx.snapshots[rowId]) tx.snapshots[rowId] = JSON.stringify(state.rows[rowId]);
      tx.staged[rowId] = { ...(tx.staged[rowId] || state.rows[rowId]), ...body.data };
    }
    return Response.json(tx?.staged[rowId] || state.rows[rowId]);
  };
  return state;
}

async function withAppwrite(action) {
  const previous = globalThis.fetch; const backend = fakeAppwrite(); globalThis.fetch = backend.fetch;
  try { return await action(await api(APPWRITE_ENV), backend); } finally { globalThis.fetch = previous; }
}

test('Appwrite sign-in, draft saving and atomic publication preserve public isolation', () => withAppwrite(async (client, backend) => {
  await client.signIn('staff@example.com', 'test-password');
  assert.equal(client.currentEmail(), 'staff@example.com');
  const data = clone(); data.copy.Hero.text_1 = 'Private draft';
  const saved = await client.saveDraft(data, 0);
  assert.equal(saved.version, 1);
  assert.equal((await client.loadContent(true)).content.copy.Hero.text_1, 'Private draft');
  assert.equal((await client.loadContent()).content.copy.Hero.text_1, DEFAULT_CONTENT.copy.Hero.text_1);
  const publicRead = backend.requests.at(-1);
  assert.equal(publicRead.path.endsWith('/rows/published'), true);
  assert.equal(publicRead.credentials, 'omit');
  assert.equal(publicRead.headers.get('x-appwrite-project'), 'clinic-project');
  assert.ok(backend.requests.every(request => !request.headers.has('x-appwrite-key')));
  const live = await client.publishDraft(1, 0);
  assert.equal(live.version, 1);
  assert.equal((await client.loadContent()).content.copy.Hero.text_1, 'Private draft');
  await client.signOut(); assert.equal(await client.requireAdmin(), false);
}));

test('ordinary accounts are rejected and Appwrite permissions independently protect writes', () => withAppwrite(async (client, backend) => {
  backend.labels = [];
  await assert.rejects(client.signIn('ordinary@example.com', 'test-password'), /does not have website administrator access/);
  assert.equal(await client.requireAdmin(), false);
  await assert.rejects(client.saveDraft(clone(), 0), /administrator access/);
  assert.equal(backend.rows.draft.version, 0);
}));

test('stale saves and publishes roll back without changing website content', () => withAppwrite(async (client, backend) => {
  await client.signIn('staff@example.com', 'test-password');
  await client.saveDraft(clone(), 0);
  await assert.rejects(client.saveDraft(clone(), 0), /Another administrator/);
  await assert.rejects(client.publishDraft(2, 0), /Another administrator/);
  assert.equal(backend.rows.draft.version, 1);
  assert.equal(backend.rows.published.version, 0);
  assert.equal(backend.transactions.size, 0);
}));

test('an intervening draft change aborts publication instead of publishing an old snapshot', () => withAppwrite(async (client, backend) => {
  await client.signIn('staff@example.com', 'test-password');
  await client.saveDraft(clone(), 0);
  backend.beforeCommit = () => { backend.rows.draft.version = 2; };
  await assert.rejects(client.publishDraft(1, 0), /Another administrator/);
  assert.equal(backend.rows.published.version, 0);
  assert.equal(backend.rows.published.content, '');
  assert.equal(backend.rows.draft.version, 2);
}));

test('Appwrite uploads use unique safe names and the library excludes partial uploads', () => withAppwrite(async (client, backend) => {
  await client.signIn('staff@example.com', 'test-password');
  const fileUrl = await client.uploadImage(new File(['photo'], 'unsafe-original-name.exe', { type: 'image/jpeg' }));
  assert.match(fileUrl, /^https:\/\/fra\.cloud\.appwrite\.io\/v1\/storage\/buckets\/site_media\/files\/.+\/view\?project=clinic-project/);
  assert.match(backend.uploaded[0].file.name, /^[a-z\d]+\.jpg$/i);
  assert.equal(backend.uploaded[0].file.type, 'image/jpeg');
  const images = await client.listImages();
  assert.equal(images.length, 1); assert.equal(images[0].name, 'clinic.jpg');
}));

test('Appwrite schema keeps drafts private and grants image creation only to administrators', async () => {
  const { schema } = await import('../scripts/setup-appwrite.mjs');
  assert.equal(schema.table.rowSecurity, true);
  for (const row of schema.rows) for (const permission of row.permissions) {
    const label = permission.match(/label:([^\"]+)/)?.[1];
    if (label) assert.match(label, /^[a-zA-Z0-9]{1,36}$/, 'Appwrite label IDs must be alphanumeric');
  }
  assert.deepEqual(schema.table.permissions, []);
  assert.deepEqual(schema.rows.find(row => row.rowId === 'draft').permissions, ['read("label:siteadmin")', 'update("label:siteadmin")']);
  assert.deepEqual(schema.rows.find(row => row.rowId === 'published').permissions, ['read("any")', 'update("label:siteadmin")']);
  assert.deepEqual(schema.bucket.permissions, ['read("any")', 'create("label:siteadmin")']);
  assert.equal(schema.bucket.fileSecurity, false);
  assert.equal(schema.bucket.maximumFileSize, 8 * 1024 * 1024);
});

test('setup is repeatable, preserves content, and refuses to overwrite unsafe permissions', async () => {
  const { setupAppwrite } = await import('../scripts/setup-appwrite.mjs');
  const resources = new Map(); let creates = 0;
  const fetcher = async (url, options) => {
    const path = new URL(url).pathname.replace(/^\/v1/, '');
    if (options.method === 'GET') return resources.has(path) ? Response.json(resources.get(path)) : Response.json({}, { status: 404 });
    assert.equal(options.method, 'POST'); creates++;
    const data = JSON.parse(options.body); let resourcePath = path; let value = { ...data, $permissions: data.permissions || [] };
    if (path === '/tablesdb') resourcePath += '/' + data.databaseId;
    else if (path.endsWith('/tables')) resourcePath += '/' + data.tableId;
    else if (/\/columns\/(mediumtext|integer|string)$/.test(path)) { resourcePath = path.replace(/\/[^/]+$/, '/' + data.key); value.status = 'available'; value.type = path.split('/').at(-1); }
    else if (path.endsWith('/rows')) { resourcePath += '/' + data.rowId; value = { ...value, ...data.data }; }
    else if (path.endsWith('/buckets')) resourcePath += '/' + data.bucketId;
    resources.set(resourcePath, value); return Response.json(value);
  };
  const config = { endpoint: APPWRITE_ENV.VITE_APPWRITE_ENDPOINT, projectId: 'clinic-project', key: 'local-test-only' };
  await setupAppwrite(config, fetcher);
  const created = creates; const row = resources.get('/tablesdb/imc/tables/site_content/rows/draft'); row.content = 'saved draft';
  await setupAppwrite(config, fetcher);
  assert.equal(creates, created); assert.equal(row.content, 'saved draft');
  resources.get('/tablesdb/imc/tables/site_content').$permissions = ['read("any")'];
  await assert.rejects(setupAppwrite(config, fetcher), /will not overwrite/);
  assert.equal(creates, created);
  await assert.rejects(setupAppwrite({ ...config, endpoint: 'http://bad.example/v1' }, fetcher), /HTTPS/);
});
