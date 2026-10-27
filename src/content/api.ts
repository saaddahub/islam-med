import { emptyRecord, validateContent, validateImageFile, type ContentRecord, type SiteContent } from './model';

export const appwriteEndpoint = (import.meta.env.VITE_APPWRITE_ENDPOINT || '').replace(/\/$/, '');
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || '';
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'imc';
const tableId = import.meta.env.VITE_APPWRITE_CONTENT_TABLE_ID || 'site_content';
const bucketId = import.meta.env.VITE_APPWRITE_MEDIA_BUCKET_ID || 'site_media';
export const isConnected = Boolean(appwriteEndpoint && projectId);
export const isLocalDemo = !isConnected && import.meta.env.DEV;
const LOCAL_DRAFT_KEY = 'imc-admin-local-draft';
const CONFLICT = 'Another administrator saved changes. Reload the editor before saving; copy any unsaved text first.';
let email = '';

async function createServices() {
  if (!isConnected) throw new Error('Connect Appwrite before saving shared website content.');
  const { Client, Account, TablesDB, Storage, Query, ID } = await import('appwrite');
  const client = new Client().setEndpoint(appwriteEndpoint).setProject(projectId);
  return { account: new Account(client), database: new TablesDB(client), storage: new Storage(client), Query, ID };
}
let servicePromise: ReturnType<typeof createServices> | undefined;
const services = () => servicePromise ??= createServices();

function readableError(error: unknown): Error {
  if (error instanceof SyntaxError) return new Error('The saved website content could not be opened. Ask your website manager to check the saved draft.');
  const failure = error as { code?: number; message?: string };
  if (failure.code === 401) return new Error('Sign-in expired or credentials are incorrect. Please sign in again.');
  if (failure.code === 403) return new Error('This account does not have website administrator access.');
  if (failure.code === 409) return new Error(CONFLICT);
  if (failure.code === 404) return new Error('The website database or image bucket is missing. Complete the Appwrite setup and try again.');
  if (failure.code === 429) return new Error('Too many requests. Wait a moment, then try again.');
  if (failure.code && failure.code >= 400) return new Error('Appwrite could not complete this action. Check the project setup and try again.');
  if (failure.message === 'Failed to fetch' || error instanceof TypeError || (error as Error).name === 'TimeoutError') return new Error('Could not reach the website database. Check your connection and try again.');
  return error instanceof Error ? error : new Error('The action could not be completed. Please try again.');
}

export async function signIn(username: string, password: string) {
  const { account } = await services();
  try {
    await account.createEmailPasswordSession({ email: username, password });
    if (!await requireAdmin()) throw new Error('Sign in to the website editor.');
  } catch (error) { await signOut().catch(() => {}); throw readableError(error); }
}
export async function requireAdmin() {
  if (!isConnected) return false;
  const { account } = await services();
  let user;
  try { user = await account.get(); }
  catch (error) {
    if ((error as { code?: number }).code === 401) { email = ''; return false; }
    throw readableError(error);
  }
  if (!user.labels.includes('siteadmin')) {
    await signOut().catch(() => {});
    throw new Error('This account does not have website administrator access.');
  }
  email = user.email;
  return true;
}
export const currentEmail = () => email;
export async function signOut() {
  try { const { account } = await services(); await account.deleteSession({ sessionId: 'current' }); }
  catch (error) { if ((error as { code?: number }).code !== 401) throw readableError(error); }
  finally { email = ''; }
}

function parseRecord(input: unknown): ContentRecord {
  const row = input as { content?: unknown; version?: unknown; updated_at?: unknown };
  if (row?.version === 0 && row.content === '') return emptyRecord();
  if (!row || !Number.isSafeInteger(row.version) || (row.version as number) < 1 || typeof row.updated_at !== 'string' || !Number.isFinite(Date.parse(row.updated_at))) throw new Error('The saved content has an invalid version or date.');
  const content = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;
  validateContent(content);
  return { content, version: row.version as number, updated_at: row.updated_at };
}
export async function loadContent(draft = false): Promise<ContentRecord> {
  if (isLocalDemo) {
    // shortcut: local drafts are developer previews only; connect Appwrite for shared editing and publishing.
    const data = draft ? localStorage.getItem(LOCAL_DRAFT_KEY) : null;
    return data ? parseRecord(JSON.parse(data)) : emptyRecord();
  }
  if (!isConnected) return emptyRecord();
  try {
    if (draft) {
      // Appwrite enforces the draft's siteadmin permission on this request.
      const { database } = await services();
      return parseRecord(await database.getRow({ databaseId, tableId, rowId: 'draft' }));
    }
    // Public reads use no session or SDK, and can only request the published row.
    const response = await fetch(`${appwriteEndpoint}/tablesdb/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}/rows/published`, {
      headers: { 'X-Appwrite-Project': projectId }, signal: AbortSignal.timeout(15000), credentials: 'omit',
    });
    if (!response.ok) throw Object.assign(new Error(), { code: response.status });
    return parseRecord(await response.json());
  } catch (error) { throw readableError(error); }
}

async function transact(action: (database: Awaited<ReturnType<typeof services>>['database'], transactionId: string) => Promise<ContentRecord>) {
  const { database } = await services();
  let transactionId: string | undefined;
  try {
    transactionId = (await database.createTransaction({ ttl: 60 })).$id;
    const record = await action(database, transactionId);
    await database.updateTransaction({ transactionId, commit: true });
    return record;
  } catch (error) {
    if (transactionId) await database.updateTransaction({ transactionId, rollback: true }).catch(() => {});
    throw readableError(error);
  }
}

export async function saveDraft(content: SiteContent, version: number): Promise<ContentRecord> {
  validateContent(content);
  if (!Number.isSafeInteger(version) || version < 0) throw new Error('Reload the editor before saving.');
  if (isLocalDemo) {
    const existing = await loadContent(true);
    if (existing.version !== version) throw new Error('Another tab saved this draft. Reload before saving.');
    const record = { content, version: version + 1, updated_at: new Date().toISOString() };
    try { localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(record)); }
    catch { throw new Error('This browser could not save the draft. Free some browser storage and try again.'); }
    return record;
  }
  return transact(async (database, transactionId) => {
    // Stage before reading: the guard enrolls the row in Appwrite's conflict detection.
    await database.updateRow({ databaseId, tableId, rowId: 'draft', data: { guard: crypto.randomUUID() }, transactionId });
    const current = await database.getRow({ databaseId, tableId, rowId: 'draft', transactionId });
    if (current.version !== version) throw new Error(CONFLICT);
    const record = { content, version: version + 1, updated_at: new Date().toISOString() };
    await database.updateRow({ databaseId, tableId, rowId: 'draft', data: { ...record, content: JSON.stringify(content) }, transactionId });
    return record;
  });
}
export async function publishDraft(draftVersion: number, publishedVersion: number): Promise<ContentRecord> {
  if (!Number.isSafeInteger(draftVersion) || draftVersion < 1 || !Number.isSafeInteger(publishedVersion) || publishedVersion < 0) throw new Error('Save a draft before publishing.');
  return transact(async (database, transactionId) => {
    for (const rowId of ['draft', 'published']) await database.updateRow({ databaseId, tableId, rowId, data: { guard: crypto.randomUUID() }, transactionId });
    const draft = await database.getRow({ databaseId, tableId, rowId: 'draft', transactionId });
    const live = await database.getRow({ databaseId, tableId, rowId: 'published', transactionId });
    if (draft.version !== draftVersion || live.version !== publishedVersion) throw new Error(CONFLICT);
    const record = { content: parseRecord(draft).content, version: publishedVersion + 1, updated_at: new Date().toISOString() };
    await database.updateRow({ databaseId, tableId, rowId: 'published', data: { ...record, content: JSON.stringify(record.content) }, transactionId });
    return record;
  });
}
export async function uploadImage(file: File): Promise<string> {
  validateImageFile(file);
  if (isLocalDemo) throw new Error('Connect Appwrite to upload photographs. You can try an existing image address in this local preview.');
  try {
    if (!await requireAdmin()) throw new Error('Sign in again to upload photographs.');
    const { storage, ID } = await services();
    const fileId = ID.unique();
    const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' }[file.type];
    await storage.createFile({ bucketId, fileId, file: new File([file], `${fileId}.${ext}`, { type: file.type }), permissions: [] });
    return storage.getFileView({ bucketId, fileId });
  } catch (error) { throw readableError(error); }
}
export async function listImages(): Promise<{ name: string; url: string }[]> {
  if (isLocalDemo) return [];
  try {
    if (!await requireAdmin()) throw new Error('Sign in again to open the image library.');
    const { storage, Query } = await services();
    // shortcut: show the latest 100 uploads; add pagination if the clinic needs to browse older files.
    const { files } = await storage.listFiles({ bucketId, queries: [Query.limit(100), Query.orderDesc('$createdAt')] });
    return files.filter(file => file.chunksUploaded === file.chunksTotal).map(file => ({ name: file.name, url: storage.getFileView({ bucketId, fileId: file.$id }) }));
  } catch (error) { throw readableError(error); }
}
