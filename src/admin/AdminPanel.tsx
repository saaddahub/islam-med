import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, BookOpen, Check, CheckCircle2, ChevronRight, CircleHelp, ExternalLink, Eye, FileText, Heart, ImagePlus, Images, LayoutDashboard, LoaderCircle, LogOut, MapPin, Plus, Save, Search, Settings2, ShieldCheck, Stethoscope, Trash2, Upload, X } from 'lucide-react';
import Logo from '../components/Logo';
import Modal from '../components/Modal';
import { COPY_SCHEMA } from '../content/copy';
import { DEFAULT_CONTENT, emptyRecord, type ContentRecord, type SiteContent } from '../content/model';
import { currentEmail, isConnected, isLocalDemo, listImages, loadContent, publishDraft, requireAdmin, saveDraft, signIn, signOut, uploadImage } from '../content/api';
import { ImageField, ObjectFields, TextField } from './Fields';
import './admin.css';

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'doctors', label: 'Doctors', icon: Stethoscope },
  { id: 'pages', label: 'Website text', icon: FileText },
  { id: 'departments', label: 'Departments & services', icon: BookOpen },
  { id: 'facilities', label: 'Facilities', icon: Heart },
  { id: 'gallery', label: 'Photo gallery', icon: Images },
  { id: 'contact', label: 'Clinic details', icon: MapPin },
  { id: 'media', label: 'Media library', icon: ImagePlus },
] as const;
type Page = typeof NAV[number]['id'];
type Dialog = { kind: 'publish' | 'discard' } | { kind: 'remove'; collection: 'doctors' | 'gallery'; index: number; name: string } | null;
const dateLabel = (value: string | null) => value ? new Intl.DateTimeFormat('en-PK', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Karachi' }).format(new Date(value)) : 'No saved draft yet';

function LoginForm({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try { await signIn(email, password); setPassword(''); onSignedIn(); }
    catch (error) { setError((error as Error).message); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="admin-login-form">
    <label className="admin-field"><span>Email address</span><input type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@clinic.com" /></label>
    <label className="admin-field"><span>Password</span><input type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} /></label>
    {error && <p className="admin-field-error" role="alert">{error}</p>}
    <button className="admin-button admin-primary" disabled={busy}>{busy ? <LoaderCircle className="admin-spin" size={18} /> : <ShieldCheck size={18} />}{busy ? 'Signing in…' : 'Sign in to your website'}</button>
    <p className="admin-hint">Need access or a password reset? Ask the person who manages your clinic’s website.</p>
  </form>;
}

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(isLocalDemo);
  const [loading, setLoading] = useState(isConnected || isLocalDemo);
  const [loadFailed, setLoadFailed] = useState(false);
  const [page, setPage] = useState<Page>('overview');
  const [content, setContent] = useState<SiteContent>(() => structuredClone(DEFAULT_CONTENT));
  const [draft, setDraft] = useState<ContentRecord>(emptyRecord);
  const [published, setPublished] = useState<ContentRecord>(emptyRecord);
  const [baseline, setBaseline] = useState(() => JSON.stringify(DEFAULT_CONTENT));
  const [busy, setBusy] = useState(false);
  const [uploads, setUploads] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [copySection, setCopySection] = useState<keyof typeof COPY_SCHEMA>('Hero');
  const [careKey, setCareKey] = useState('department-gynecology');
  const [dialog, setDialog] = useState<Dialog>(null);
  const [reauth, setReauth] = useState(false);
  const [help, setHelp] = useState(false);
  const [media, setMedia] = useState<{ name: string; url: string }[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dirty = JSON.stringify(content) !== baseline;
  const unpublished = !published.version || baseline !== JSON.stringify(published.content);
  const working = busy || uploads > 0;
  const uploadBusy = (value: boolean) => setUploads(count => Math.max(0, count + (value ? 1 : -1)));

  useEffect(() => {
    document.title = 'Website editor — Islam Medical Complex';
    document.getElementById('startup')?.remove();
    document.body.classList.remove('is-loading');
    document.documentElement.dataset.motion = 'none';
    const noindex = document.createElement('meta'); noindex.name = 'robots'; noindex.content = 'noindex, nofollow'; document.head.append(noindex);
    let active = true;
    if (!isConnected) return () => { noindex.remove(); };
    requireAdmin().then(allowed => { if (active) { setAuthenticated(allowed); if (!allowed) setLoading(false); } }).catch(error => { if (active) { setError(error.message); setLoading(false); } });
    return () => { active = false; noindex.remove(); };
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    let active = true;
    Promise.all([loadContent(true), loadContent()]).then(([saved, live]) => {
      if (!active) return;
      const initial = saved.version ? saved.content : live.content;
      setDraft(saved); setPublished(live); setContent(structuredClone(initial)); setBaseline(JSON.stringify(initial)); setError('');
    }).catch(error => { if (active) { setError(error.message); setLoadFailed(true); } }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [authenticated]);

  useEffect(() => {
    if (!dirty && !uploads) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty, uploads]);

  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, [page]);

  async function refreshMedia() {
    setMediaLoading(true);
    try { setMedia(await listImages()); }
    catch (error) { reportError(error); }
    finally { setMediaLoading(false); }
  }
  useEffect(() => {
    if (page !== 'media' || !authenticated) return;
    let active = true;
    listImages().then(files => { if (active) setMedia(files); }).catch(error => { if (active) reportError(error); }).finally(() => { if (active) setMediaLoading(false); });
    return () => { active = false; };
  }, [page, authenticated]);

  function reportError(error: unknown) {
    const text = (error as Error).message;
    setError(text); setMessage('');
    if (/session|expired|sign in again/i.test(text)) setReauth(true);
  }
  function change<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent(previous => ({ ...previous, [key]: value })); setMessage(''); setError('');
  }
  async function save() {
    setBusy(true); setError(''); setMessage('');
    // Keep multiline editing natural, but do not publish empty qualification or timing rows.
    const cleaned = structuredClone(content);
    cleaned.doctors.forEach(doctor => { doctor.qualifications = doctor.qualifications.filter(line => line.trim()); doctor.availability = doctor.availability.filter(line => line.trim()); });
    try {
      const record = await saveDraft(cleaned, draft.version);
      setDraft(record); setContent(cleaned); setBaseline(JSON.stringify(cleaned));
      setMessage(isLocalDemo ? 'Draft saved in this browser. Connect Appwrite to publish it.' : 'Draft saved. Your live website has not changed.');
    } catch (error) { reportError(error); }
    finally { setBusy(false); }
  }
  async function confirm() {
    if (!dialog) return;
    if (dialog.kind === 'discard') { setContent(JSON.parse(baseline)); setDialog(null); setMessage('Unsaved changes discarded. Your last saved draft is still here.'); return; }
    if (dialog.kind === 'remove') {
      const { collection, index } = dialog;
      change(collection, content[collection].filter((_, i) => i !== index) as typeof content[typeof collection]);
      if (collection === 'doctors') setSelectedDoctor(null);
      setDialog(null); return;
    }
    setBusy(true); setError('');
    try { const live = await publishDraft(draft.version, published.version); setPublished(live); setDialog(null); setMessage('Published. Your changes are now on the public website.'); }
    catch (error) { reportError(error); setDialog(null); }
    finally { setBusy(false); }
  }
  async function logout() {
    if (dirty || uploads) { setError('Save or discard your changes before signing out.'); return; }
    setBusy(true);
    try { await signOut(); setAuthenticated(false); }
    catch (error) { setAuthenticated(false); reportError(error); }
    finally { setBusy(false); }
  }

  if (loading) return <div className="admin-loading" role="status"><Logo variant="full" /><LoaderCircle className="admin-spin" size={24} /><p>Opening your website editor…</p></div>;
  if (!authenticated) return <div className="admin-login">
    <div className="admin-login-content"><a href="/" aria-label="Back to Islam Medical Complex"><Logo variant="full" /></a><div><h1>A little care for<br /><em>your website.</em></h1><p>Keep your clinic’s information as thoughtful and up to date as the care you provide.</p>
      {isConnected ? <><h2>Welcome back</h2><p className="admin-login-intro">Sign in to manage your website.</p>{error && <p role="alert" className="admin-field-error">{error}</p>}<LoginForm onSignedIn={() => { setLoading(true); setLoadFailed(false); setAuthenticated(true); }} /></> : <div className="admin-setup"><h2>Connect your website editor</h2><p>The admin panel is ready. Add your Appwrite project settings and create an administrator to enable secure editing.</p><p>Follow <code>docs/admin-setup.md</code> in the project.</p><a href="/" className="admin-text-button">Back to website <ArrowUpRight size={16} /></a></div>}
    </div><span className="admin-login-footnote"><ShieldCheck size={16} />For authorized clinic staff</span></div>
    <div className="admin-login-photo"><img src="/images/imc-pharmacy-1800.webp" alt="The pharmacy at Islam Medical Complex" /><div><span>Islam Medical Complex</span><p>Care, brought together.</p></div></div>
  </div>;

  const doctorIndex = content.doctors.findIndex(doctor => doctor.id === selectedDoctor);
  const doctor = content.doctors[doctorIndex];
  const selectedCare = [...content.departments, ...content.services].find(entry => `${entry.kind}-${entry.id}` === careKey)!;
  const pageTitle = NAV.find(item => item.id === page)!.label;
  const matchingDoctors = content.doctors.filter(doctor => `${doctor.name} ${doctor.department} ${doctor.role}`.toLowerCase().includes(search.toLowerCase()));
  const updateDoctor = (value: Record<string, unknown>) => change('doctors', content.doctors.map((entry, index) => index === doctorIndex ? value as unknown as typeof doctor : entry));
  const navigate = (next: Page) => { setSearch(''); setPage(next); setSelectedDoctor(null); if (next === 'media') setMediaLoading(true); };

  return <div className="admin-app">
    <a className="skip-link" href="#admin-main">Skip to editor</a>
    <aside className="admin-sidebar">
      <a href="/" className="admin-brand" aria-label="Islam Medical Complex website"><Logo variant="full" /></a>
      <div className="admin-workspace-label"><span className="admin-status-dot" />Website workspace</div>
      <nav aria-label="Admin navigation">{NAV.map(item => <button type="button" key={item.id} onClick={() => navigate(item.id)} aria-current={page === item.id ? 'page' : undefined}><item.icon size={19} /><span>{item.label}</span>{item.id === 'doctors' && <small>{content.doctors.length}</small>}</button>)}</nav>
      <div className="admin-sidebar-bottom"><button className="admin-help" aria-label="A little guidance" onClick={() => setHelp(true)}><CircleHelp size={19} /><span>A little guidance</span><ArrowUpRight size={16} /></button><a href="/" target="_blank" rel="noopener noreferrer"><ExternalLink size={17} />Visit live website</a><div className="admin-account"><span className="admin-account-avatar">{isLocalDemo ? 'LP' : currentEmail().slice(0, 2).toUpperCase()}</span><div><strong>{isLocalDemo ? 'Local preview' : 'Clinic administrator'}</strong><span>{isLocalDemo ? 'Development workspace' : currentEmail()}</span></div>{!isLocalDemo && <button aria-label="Sign out" disabled={working} onClick={logout}><LogOut size={17} /></button>}</div></div>
    </aside>
    <div className="admin-workspace">
      <header className="admin-toolbar"><div className="admin-breadcrumb">Your website<ChevronRight size={14} /><span>{pageTitle}</span></div><div className="admin-toolbar-actions"><span className={`admin-save-state ${dirty ? 'has-changes' : ''}`}>{dirty ? 'Unsaved changes' : <><Check size={14} />{draft.version ? 'Draft up to date' : 'Ready to edit'}</>}</span><button className="admin-button admin-preview-button" onClick={() => { location.href = '/?preview=draft'; }} disabled={dirty || working || loadFailed} title={dirty ? 'Save your draft before previewing' : 'View your saved draft'}><Eye size={16} /><span>Preview</span></button><button className="admin-button" disabled={working || loadFailed || (!dirty && draft.version > 0)} onClick={save}><Save size={16} /><span>{busy ? 'Working…' : uploads ? 'Uploading…' : 'Save draft'}</span></button><button className="admin-button admin-primary" disabled={!isConnected || dirty || working || loadFailed || !draft.version || !unpublished} onClick={() => setDialog({ kind: 'publish' })} title={isLocalDemo ? 'Connect Appwrite to publish' : dirty ? 'Save your draft first' : 'Make your saved draft public'}>Publish<ArrowUpRight size={16} /></button></div></header>
      {isLocalDemo && <div className="admin-demo-banner"><Settings2 size={16} /><span><strong>Local preview.</strong> Try the editor and save drafts in this browser. Connect Appwrite for staff login, uploads and publishing.</span></div>}
      <div className="admin-announcements" aria-live="polite">{message && <p className="admin-success"><CheckCircle2 size={18} />{message}<button aria-label="Dismiss notification" onClick={() => setMessage('')}><X size={16} /></button></p>}{error && <p className="admin-error" role="alert">{error}<button aria-label="Dismiss error" onClick={() => setError('')}><X size={16} /></button></p>}</div>
      <main id="admin-main" className="admin-main" tabIndex={-1}>
        {loadFailed ? <div className="admin-empty"><h1>We couldn’t open your content</h1><p>{error}</p><button className="admin-button" onClick={() => location.reload()}>Try again</button></div> : <>
        <div className="admin-page-heading"><div><h1 ref={headingRef} tabIndex={-1}>{page === 'overview' ? <>Make yourself <em>at home.</em></> : page === 'doctors' && doctor ? doctor.name : pageTitle}</h1><p>{page === 'overview' ? 'A thoughtful space to keep your website up to date.' : page === 'doctors' ? 'Introduce your care team. Update profiles, photographs and clinic timings.' : page === 'pages' ? 'The words your visitors see, organized by where they appear.' : page === 'departments' ? 'Keep care information clear, accurate and easy to find.' : page === 'facilities' ? 'Update the spaces and services patients can explore.' : page === 'gallery' ? 'Give visitors a closer look at your clinic.' : page === 'contact' ? 'One place for the contact details used throughout your website.' : 'Your uploaded photographs, ready to use across the website.'}</p></div>
          {page === 'doctors' && !doctor && <button className="admin-button admin-primary" disabled={working} onClick={() => { const id = `doctor-${crypto.randomUUID()}`; change('doctors', [...content.doctors, { id, name: 'New doctor', department: '', yearMeta: '', role: '', experience: '', qualifications: [], bio: '', image: '/doctor-placeholder.svg', availability: [] }]); setSelectedDoctor(id); }}><Plus size={17} />Add doctor</button>}
          {page === 'gallery' && <button className="admin-button admin-primary" disabled={working || content.gallery.length >= 20} onClick={() => change('gallery', [...content.gallery, { id: `photo-${crypto.randomUUID()}`, heading: 'Your clinic', image: '/images/imc-pharmacy-1800.webp', thumbnail: '/images/imc-corridor-restored.webp', label: 'A closer look', description: '' }])}><Plus size={17} />Add photograph</button>}
        </div>

        {page === 'overview' && <>
          <section className="admin-welcome"><div><span className="admin-welcome-mark"><Heart size={23} strokeWidth={1.4} /></span><h2>Your care.<br />Your people.<br /><em>Your website.</em></h2><p>A new face on the team, a refreshed photograph, a change of hours. It all starts here.</p><button className="admin-button admin-primary" onClick={() => navigate('pages')}>Edit your website<ArrowRight size={17} /></button></div><figure><img src={content.copy.Hero.photograph_3} alt="Current website welcome photograph" /><figcaption><span>Islam Medical Complex</span><span>{content.clinic.location}</span></figcaption></figure></section>
          <div className="admin-overview-columns"><section className="admin-quick-edits"><h2>What would you like to update?</h2>{[{ title: 'Meet the team', text: `${content.doctors.length} doctor profiles · photographs, bios & timings`, page: 'doctors' as const, icon: Stethoscope }, { title: 'Find the right words', text: 'Headings, descriptions & website information', page: 'pages' as const, icon: FileText }, { title: 'A fresh perspective', text: `${content.gallery.length} gallery photographs · images & captions`, page: 'gallery' as const, icon: Images }, { title: 'Stay in touch', text: 'Contact details, location & reception hours', page: 'contact' as const, icon: MapPin }].map(item => <button key={item.page} onClick={() => navigate(item.page)}><item.icon size={22} strokeWidth={1.4} /><span><strong>{item.title}</strong><small>{item.text}</small></span><ArrowUpRight size={19} /></button>)}</section>
            <aside className="admin-publishing-note"><div className="admin-note-heading"><ShieldCheck size={23} /><h2>You’re in control.</h2></div><p>Take your time. Changes stay in your draft until you choose to publish.</p><ol><li><span>1</span><div><strong>Make your changes</strong><p>Edit a section, photo or doctor profile.</p></div></li><li><span>2</span><div><strong>Save & take a look</strong><p>Preview your saved draft as visitors will see it.</p></div></li><li><span>3</span><div><strong>Publish when you’re ready</strong><p>Your updates appear on the live website.</p></div></li></ol><div className="admin-draft-timestamp"><span>Last draft saved</span><strong>{dateLabel(draft.updated_at)}</strong></div>{published.updated_at && <div className="admin-draft-timestamp"><span>Last published</span><strong>{dateLabel(published.updated_at)}</strong></div>}</aside></div>
        </>}

        {page === 'doctors' && (doctor ? <>
          <button className="admin-text-button admin-back" onClick={() => setSelectedDoctor(null)}><ArrowLeft size={16} />All doctors</button>
          <section className="admin-editor-surface"><div className="admin-editor-intro"><h2>Profile details</h2><p>These details appear in the doctor directory and profile window.</p></div><fieldset disabled={working}><ObjectFields value={doctor as unknown as Record<string, unknown>} onChange={updateDoctor} onBusy={uploadBusy} /></fieldset><div className="admin-editor-footer"><button className="admin-text-button admin-danger" disabled={working} onClick={() => setDialog({ kind: 'remove', collection: 'doctors', index: doctorIndex, name: doctor.name })}><Trash2 size={16} />Remove this doctor</button><p>Removal takes effect on the live website after publishing.</p></div></section>
        </> : <>
          <div className="admin-list-toolbar"><label className="admin-search"><Search size={18} /><input aria-label="Search doctors" placeholder="Search by name or specialty…" value={search} onChange={event => setSearch(event.target.value)} /></label><span>{matchingDoctors.length} {matchingDoctors.length === 1 ? 'doctor' : 'doctors'}</span></div>
          <div className="admin-doctor-list">{matchingDoctors.map(doctor => <button key={doctor.id} className="admin-doctor-row" onClick={() => setSelectedDoctor(doctor.id)}><img src={doctor.image} alt="" loading="lazy" /><span className="admin-doctor-identity"><strong>{doctor.name}</strong><small>{doctor.role || 'Add a professional role'}</small></span><span className="admin-doctor-specialty">{doctor.department || 'Specialty needed'}</span><span className="admin-doctor-timings">{doctor.availability[0] || 'Add clinic timings'}</span><span className="admin-edit-link">Edit profile<ArrowUpRight size={16} /></span></button>)}</div>
          {!matchingDoctors.length && <div className="admin-empty"><Search size={28} /><h2>{content.doctors.length ? 'No matching doctors' : 'Introduce your first doctor'}</h2><p>{content.doctors.length ? 'Try a different name or specialty.' : 'Choose Add doctor to create a profile.'}</p></div>}
        </>)}

        {page === 'pages' && <div className="admin-split-editor"><nav className="admin-section-list" aria-label="Website sections">{Object.entries(COPY_SCHEMA).map(([key, section]) => <button key={key} aria-current={copySection === key ? 'true' : undefined} onClick={() => setCopySection(key as keyof typeof COPY_SCHEMA)}>{section.title}<ChevronRight size={15} /></button>)}<button onClick={() => { navigate('pages'); setCopySection('HowItWorksSticky'); }}>Visit steps<ChevronRight size={15} /></button></nav>
          <section className="admin-editor-surface"><div className="admin-editor-intro"><h2>{COPY_SCHEMA[copySection].title}</h2><p>Update the text and photographs below. The website’s layout stays in place.</p></div><fieldset disabled={working}><div className="admin-copy-fields">{Object.entries(COPY_SCHEMA[copySection].fields).map(([key, field]) => {
            const changeCopy = (value: string) => change('copy', { ...content.copy, [copySection]: { ...content.copy[copySection], [key]: value } });
            return field.kind === 'image' ? <ImageField key={`${copySection}-${key}`} label={field.label} value={content.copy[copySection][key]} onChange={changeCopy} onBusy={uploadBusy} /> : <TextField key={`${copySection}-${key}`} label={field.label} value={content.copy[copySection][key]} multiline={field.value.length > 100} onChange={changeCopy} hint={`On the website: “${field.value.trim().slice(0, 100)}${field.value.length > 100 ? '…' : ''}”`} />;
          })}</div>{copySection === 'HowItWorksSticky' && content.steps.map((step, index) => <div className="admin-embedded-section" key={index}><h3>Visit step {index + 1}</h3><ObjectFields value={step as unknown as Record<string, unknown>} onChange={value => change('steps', content.steps.map((item, i) => i === index ? value as unknown as typeof step : item))} onBusy={uploadBusy} /></div>)}</fieldset></section></div>}

        {page === 'departments' && <div className="admin-split-editor"><nav className="admin-section-list" aria-label="Department and service selection"><h2>Departments</h2>{[...content.departments, ...content.services].map((entry, index) => <div key={`${entry.kind}-${entry.id}`}>{index === content.departments.length && <h2>Services</h2>}<button aria-current={careKey === `${entry.kind}-${entry.id}` ? 'true' : undefined} onClick={() => setCareKey(`${entry.kind}-${entry.id}`)}>{entry.name}<ChevronRight size={15} /></button></div>)}</nav><section className="admin-editor-surface"><div className="admin-editor-intro"><h2>{selectedCare.name}</h2><p>Edit the introduction and reading page. Existing navigation links stay connected.</p></div><fieldset disabled={working}><ObjectFields value={selectedCare as unknown as Record<string, unknown>} onChange={value => { const key = selectedCare.kind === 'department' ? 'departments' : 'services'; change(key, content[key].map(entry => entry.id === selectedCare.id ? value as unknown as typeof selectedCare : entry)); }} onBusy={uploadBusy} />{(content.details[careKey] || []).map((section, index) => <div className="admin-embedded-section" key={`${careKey}-${index}`}><h3>Reading section {index + 1}</h3><ObjectFields value={section as unknown as Record<string, unknown>} onChange={value => change('details', { ...content.details, [careKey]: content.details[careKey].map((item, i) => i === index ? value as unknown as typeof section : item) })} onBusy={uploadBusy} /></div>)}</fieldset></section></div>}

        {page === 'facilities' && <div className="admin-stacked-editors">{content.facilities.map((facility, index) => <details className="admin-editor-surface admin-disclosure" key={facility.id} open={index === 0}><summary><span><strong>{facility.title}</strong><small>{facility.tag}</small></span><ChevronRight size={20} /></summary><fieldset disabled={working}><ObjectFields value={facility as unknown as Record<string, unknown>} onChange={value => change('facilities', content.facilities.map((entry, i) => i === index ? value as unknown as typeof facility : entry))} onBusy={uploadBusy} /></fieldset></details>)}</div>}

        {page === 'gallery' && <div className="admin-stacked-editors">{content.gallery.map((photo, index) => <details className="admin-editor-surface admin-disclosure" key={photo.id} open={index === 0}><summary><img src={photo.image} alt="" /><span><strong>{photo.label}</strong><small>{photo.heading}</small></span><ChevronRight size={20} /></summary><fieldset disabled={working}><ObjectFields value={photo as unknown as Record<string, unknown>} onChange={value => change('gallery', content.gallery.map((entry, i) => i === index ? value as unknown as typeof photo : entry))} onBusy={uploadBusy} /><div className="admin-gallery-actions"><button className="admin-button admin-button-small" disabled={index === 0} onClick={() => { const next = [...content.gallery]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; change('gallery', next); }}><ArrowUp size={15} />Move earlier</button><button className="admin-button admin-button-small" disabled={index === content.gallery.length - 1} onClick={() => { const next = [...content.gallery]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; change('gallery', next); }}><ArrowDown size={15} />Move later</button><button className="admin-text-button admin-danger" disabled={content.gallery.length === 1} onClick={() => setDialog({ kind: 'remove', collection: 'gallery', index, name: photo.label })}><Trash2 size={15} />Remove photograph</button></div></fieldset></details>)}</div>}

        {page === 'contact' && <section className="admin-editor-surface"><div className="admin-editor-intro"><h2>Help people find their care.</h2><p>Changes update the footer, reception window and navigation. Phone, email and map links are created automatically.</p></div><fieldset disabled={working}><ObjectFields value={content.clinic} onChange={value => change('clinic', value as SiteContent['clinic'])} onBusy={uploadBusy} /></fieldset></section>}

        {page === 'media' && <section className="admin-media-library"><div className="admin-media-upload"><div><Upload size={26} strokeWidth={1.4} /><h2>A fresh photograph starts here.</h2><p>Upload clinic and staff photographs, then choose them from any image field.</p><p className="admin-hint">Uploaded images are public. Use clinic-approved photographs, without private patient information.</p></div><label className="admin-button admin-primary" htmlFor="media-upload"><Plus size={17} />{uploads ? 'Uploading…' : 'Upload photograph'}</label><input className="admin-file-input" id="media-upload" type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={working} onChange={async event => { const file = event.target.files?.[0]; event.target.value = ''; if (!file) return; uploadBusy(true); try { await uploadImage(file); await refreshMedia(); setMessage('Photograph uploaded. Choose it from the library in any image field.'); } catch (error) { reportError(error); } finally { uploadBusy(false); } }} /></div>{mediaLoading ? <p role="status">Opening your media library…</p> : media.length ? <div className="admin-media-grid">{media.map(file => <button key={file.name} onClick={async () => { try { await navigator.clipboard.writeText(file.url); setMessage('Image address copied. Paste it into an image address field.'); } catch { setError('Could not copy the address. Choose this photograph from an image field’s library instead.'); } }}><img src={file.url} alt="Uploaded clinic photograph" loading="lazy" /><span>Copy image address<ExternalLink size={14} /></span></button>)}</div> : <div className="admin-empty"><Images size={32} /><h2>Your photographs will live here.</h2><p>{isLocalDemo ? 'Connect Appwrite to start uploading and sharing photographs.' : 'Upload your first photograph above. Existing website photographs remain available in their current sections.'}</p></div>}</section>}

        <footer className="admin-page-footer"><span><Heart size={14} />Care, brought together.</span>{dirty && <button className="admin-text-button" onClick={() => setDialog({ kind: 'discard' })} disabled={working}>Discard unsaved changes</button>}</footer>
        </>}
      </main>
    </div>
    <Modal isOpen={dialog !== null} onClose={() => { if (!busy) setDialog(null); }} labelledBy="admin-confirm-title" className="admin-dialog"><div className="admin-dialog-heading"><h2 id="admin-confirm-title">{dialog?.kind === 'publish' ? 'Ready to share your changes?' : dialog?.kind === 'remove' ? `Remove ${dialog.name}?` : 'Discard unsaved changes?'}</h2><button className="admin-icon-button" aria-label="Close confirmation" disabled={busy} onClick={() => setDialog(null)}><X size={20} /></button></div><p>{dialog?.kind === 'publish' ? 'Your saved draft will replace the content on the public website. Take one last look in Preview if you need to.' : dialog?.kind === 'remove' ? 'This removes the entry from your draft. The live website changes only when you publish.' : 'This returns the editor to your last saved draft. Changes made since that save will be lost.'}</p><div className="admin-dialog-actions"><button className="admin-button" disabled={busy} onClick={() => setDialog(null)}>Keep editing</button><button className="admin-button admin-primary" disabled={busy} onClick={confirm}>{busy ? 'Publishing…' : dialog?.kind === 'publish' ? 'Publish changes' : dialog?.kind === 'remove' ? 'Remove from draft' : 'Discard changes'}<ArrowRight size={16} /></button></div></Modal>
    <Modal isOpen={help} onClose={() => setHelp(false)} labelledBy="admin-help-title" className="admin-dialog"><div className="admin-dialog-heading"><h2 id="admin-help-title">A little guidance</h2><button className="admin-icon-button" aria-label="Close guidance" onClick={() => setHelp(false)}><X size={20} /></button></div><ol className="admin-help-steps"><li>Choose a section from the menu.</li><li>Edit the text or choose a photograph. Doctors and gallery entries have their own editors.</li><li>Choose <strong>Save draft</strong>. Your public website stays the same.</li><li>Choose <strong>Preview</strong> to check the saved draft.</li><li>Choose <strong>Publish</strong>, then confirm when you’re ready for visitors to see it.</li></ol><p>Changes across sections are saved together. Keep this tab open until saving finishes. For setup or account help, ask your website manager.</p></Modal>
    <Modal isOpen={reauth} onClose={() => setReauth(false)} labelledBy="admin-reauth-title" className="admin-dialog"><div className="admin-dialog-heading"><h2 id="admin-reauth-title">Sign in again</h2><button className="admin-icon-button" aria-label="Close sign in" onClick={() => setReauth(false)}><X size={20} /></button></div><p>Your unsaved work is still in the editor.</p><LoginForm onSignedIn={() => { setReauth(false); setError(''); setMessage('Signed in again. You can save your changes now.'); }} /></Modal>
  </div>;
}
