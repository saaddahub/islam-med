# Website editor setup — Appwrite

The editor at `/admin` uses Appwrite Authentication, TablesDB and Storage. The website keeps its design and its Save draft → Preview → Publish workflow. No Appwrite API secret belongs in the website or in chat.

## 1. Public project settings

1. Copy the **API endpoint** (including `/v1`) and **Project ID** from your Appwrite project settings.
2. Add a **Web platform** for `127.0.0.1` and another for `localhost` if you use that hostname. Add the deployed website hostname before launch. This permits browser requests.
3. Enable email/password authentication. In **Auth → Users**, create each staff account and add the exact label `siteadmin` to authorized website editors. Accounts without that label have no editing or upload access. Staff provisioning and password resets are managed through the console, not a public website registration form.
4. Create `.env.local` using the settings below and enter the public endpoint and project ID. The default database/table/bucket IDs are `imc`, `site_content`, and `site_media`. Environment files stay local and are excluded from Git.

```env
VITE_APPWRITE_ENDPOINT=https://YOUR-REGION.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=YOUR-PROJECT-ID
VITE_APPWRITE_DATABASE_ID=imc
VITE_APPWRITE_CONTENT_TABLE_ID=site_content
VITE_APPWRITE_MEDIA_BUCKET_ID=site_media
```

Only public settings are bundled into the website. The build rejects keys, tokens, passwords or secrets in `VITE_APPWRITE_` variables. Restart Vite after changing configuration; set the same public variables in your hosting build settings and rebuild for production.

## 2. Create the database and image bucket

Choose console setup or the optional local script. Both use `appwrite/schema.json`.

### Console setup — no API key needed

1. Create a **TablesDB** database with ID `imc`, using the free serverless specification.
2. Create a table with ID `site_content`. Enable **Row security** and leave all **table permissions empty**. Permissions belong to individual rows below.
3. Add these required columns, without defaults:

| Key | Type | Settings |
| --- | --- | --- |
| `content` | Mediumtext | Required |
| `version` | Integer | Required; minimum 0, maximum 2147483647 |
| `updated_at` | String | Required; size 40 |
| `guard` | String | Required; size 36 |

4. Create two rows, each with `content` = empty string, `version` = `0`, `updated_at` = empty string and `guard` = empty string:

| Row ID | Read | Update | Create / Delete |
| --- | --- | --- | --- |
| `draft` | Label `siteadmin` | Label `siteadmin` | None |
| `published` | Any | Label `siteadmin` | None |

Do not grant Any/Users access to the table or draft row, or ordinary-user update access. The browser never creates content rows.

5. Create a Storage bucket with ID `site_media`. Enable it and disable **File security**. Set maximum file size to `8388608` bytes (8 MB), allowed extensions to `jpg`, `jpeg`, `png`, `webp`, `avif`, and compression to None. Set **Read = Any**, **Create = Label siteadmin**, with no Update/Delete permissions. File security stays off so per-file permissions cannot override these bucket rules. Replacement photos receive new IDs; old photos remain available to existing pages and drafts.

### Optional local setup script

For automatic setup, create a temporary server API key with only these scopes:

- **Databases:** `databases.read`, `databases.write`, `tables.read`, `tables.write`, `columns.read`, `columns.write`, `rows.read`, `rows.write`.
- **Storage:** `buckets.read`, `buckets.write`.

No Auth, Functions, Sites, Messaging or other scopes are needed. Use a short expiry. This is a local provisioning key, never a browser key. Create an ignored `.env.setup.local` file locally:

```env
APPWRITE_ENDPOINT=https://YOUR-REGION.cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=YOUR-PROJECT-ID
APPWRITE_API_KEY=YOUR-TEMPORARY-SETUP-KEY
```

Run with Node.js 24:

```powershell
node --env-file=.env.setup.local scripts/setup-appwrite.mjs
```

If this OneDrive checkout reports `EPERM` while resolving parent directories:

```powershell
node --preserve-symlinks --preserve-symlinks-main --env-file=.env.setup.local scripts/setup-appwrite.mjs
```

The script creates the serverless database, table, columns, rows and image bucket. Reruns preserve content and refuse to overwrite resources with different permissions. Column creation can take a few seconds; rerun if a column is not ready. It does not create staff users, assign labels, change authentication settings or provision paid compute.

Revoke the setup key and remove its local file after setup. Never use a `VITE_` variable for this key or send it in chat.

## 3. Try the editor

Open `/admin`, sign in with a labeled staff account, save the first draft and choose Preview. Return using Back to editor, then Publish and confirm. The original committed site remains the public fallback until first publication.

Appwrite's SDK manages sessions with secure cookies and its local-storage fallback. Sessions can persist after closing a tab; sign out on shared devices. For production cookie restrictions, follow Appwrite's custom API domain guidance for using a subdomain of your website.

Saves and publications use Appwrite transactions. Staged guard updates enroll affected rows in conflict detection before reading their versions. Version mismatches and intervening changes roll back the whole action. Publication checks both draft and public versions. Copy unsaved text before reloading after a conflict. Visitors see published updates on their next page load.

## Everyday editing

- **Doctors:** search, edit, add or remove profiles. New profiles need a name, specialty and role.
- **Website text:** text and images grouped by section. Welcome includes the sculpture's main photo and mobile supporting photos. Planning a visit includes four visit steps.
- **Departments & services:** names, introductions, care focus, paragraphs and bullet points; existing routes and illustration choices stay connected.
- **Facilities:** photos, labels, descriptions and highlights.
- **Photo gallery:** add, remove and reorder photos, captions and detail images.
- **Clinic details:** shared contact information; phone, email and map links are generated automatically.
- **Media library:** JPG, PNG, WebP and AVIF, up to 8 MB. The SDK handles chunking. The library shows the 100 latest completed uploads; older selected files continue working.

Save draft does not publish. Changes across sections are saved together. Unsaved work triggers a warning before leaving.

Uploads become public immediately, before publication. Use only clinic-approved public photographs without private patient information. Old files are retained so replacements cannot break existing pages. Remove unused files through the Appwrite console only after checking references.

## Local preview and deployment

Without configuration, Vite development provides a labeled local editor. Browser-only drafts cannot upload or publish. Public pages never read them unless `?preview=draft` is selected. Production disables the local editor.

Deploy `dist` over HTTPS. The root `vercel.json` routes `/admin` and `/admin/` to `index.html` on Vercel, preserving normal asset requests. Netlify-style hosts receive `_redirects`. Set the public `VITE_APPWRITE_ENDPOINT` and `VITE_APPWRITE_PROJECT_ID` variables in the hosting project's environment settings before building; local environment files are deliberately excluded from Git. Redeploy after changing hosting variables. The CSP allows database requests only to the configured Appwrite API origin; rebuild when changing it.

The Free plan has resource limits and can pause inactive projects. Check [current Free-plan limits](https://appwrite.io/docs/advanced/billing/free) before relying on it for a live client site.

## Verify the connected project

1. Anonymous visitors can read `published` and public images, but cannot read `draft`, save, publish or upload.
2. Ordinary accounts without `siteadmin` cannot read/update drafts, update public content or upload. Row/bucket permissions enforce this independently of the UI.
3. An administrator can sign in, upload an image larger than 5 MB (exercising chunking), save, reload, preview and publish.
4. Two editor tabs cannot overwrite each other's versions or partially publish a failed transaction.
5. Removing `siteadmin` blocks subsequent protected requests even while a session remains active.
6. Public reads omit credentials and request only the published row. Built browser code contains no API secret.

Tests simulate API behavior and verify permission/setup contracts. Real Appwrite transactions, cookie/CORS behavior and upload access still need testing against your project.

References: [authentication](https://appwrite.io/docs/advanced/security/authentication), [labels](https://appwrite.io/docs/products/auth/labels), [transactions](https://appwrite.io/docs/products/databases/tablesdb/transactions), [API key scopes](https://appwrite.io/docs/partners/project/api-keys).
