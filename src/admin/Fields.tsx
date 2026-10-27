import { useId, useState } from 'react';
import { ImagePlus, Images, Upload, X } from 'lucide-react';
import Modal from '../components/Modal';
import { listImages, uploadImage, isLocalDemo } from '../content/api';

const FIELD_LABELS: Record<string, string> = {
  name: 'Name', department: 'Specialty', yearMeta: 'Directory label', role: 'Professional role', experience: 'Experience', qualifications: 'Qualifications', bio: 'Biography', image: 'Photograph', availability: 'Clinic timings', title: 'Title', subtitle: 'Short introduction', tag: 'Photo label', description: 'Description', specs: 'Highlights', heading: 'Heading', thumbnail: 'Detail photograph', label: 'Caption title', shortDesc: 'Introduction', focus: 'Care focus', paragraphs: 'Paragraphs', items: 'Bullet points', step: 'Step number', area: 'Area', city: 'City', location: 'Location label', address: 'Full address', shortAddress: 'Short address', phone: 'Reception phone', email: 'Reception email', clinicHours: 'Clinic hours', emergencyCare: 'Emergency care information',
};
const HIDDEN_FIELDS = ['id', 'kind', 'illustration', 'relatedServices', 'phoneHref', 'emailHref'];

export function ImageField({ label, value, onChange, onBusy }: { label: string; value: string; onChange: (value: string) => void; onBusy: (busy: boolean) => void }) {
  const id = useId();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [library, setLibrary] = useState<{ name: string; url: string }[] | null>(null);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true); onBusy(true); setError('');
    try { onChange(await uploadImage(file)); }
    catch (error) { setError((error as Error).message); }
    finally { setBusy(false); onBusy(false); }
  }
  async function openLibrary() {
    setLoadingLibrary(true); setError('');
    try { setLibrary(await listImages()); }
    catch (error) { setError((error as Error).message); }
    finally { setLoadingLibrary(false); }
  }
  return <div className="admin-image-field">
    <span className="admin-label">{label}</span>
    <div className="admin-image-control">
      <img src={value || undefined} alt={`${label} preview`} onError={event => { event.currentTarget.dataset.failed = 'true'; }} onLoad={event => { delete event.currentTarget.dataset.failed; }} />
      <div>
        <label className={`admin-button admin-button-small ${busy ? 'is-disabled' : ''}`} htmlFor={id}><Upload size={16} />{busy ? 'Uploading…' : 'Upload photograph'}</label>
        <input id={id} type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={event => { void upload(event.target.files?.[0]); event.target.value = ''; }} className="admin-file-input" />
        <button type="button" className="admin-text-button" onClick={openLibrary} disabled={busy || loadingLibrary}><Images size={15} />{loadingLibrary ? 'Opening library…' : 'Choose from library'}</button>
        <p className="admin-hint">JPG, PNG, WebP or AVIF · up to 8 MB</p>
        {isLocalDemo && <p className="admin-hint">Uploads become available when Appwrite is connected.</p>}
      </div>
    </div>
    <details className="admin-image-address"><summary>Use an image address</summary><label className="admin-field"><span>Image URL or website image path</span><input type="text" value={value} onChange={event => onChange(event.target.value)} placeholder="https://…" /></label></details>
    {error && <p className="admin-field-error" role="alert">{error}</p>}
    <Modal isOpen={library !== null} onClose={() => setLibrary(null)} labelledBy={`${id}-library`} className="admin-dialog admin-media-dialog">
      <div className="admin-dialog-heading"><h2 id={`${id}-library`}>Choose a photograph</h2><button className="admin-icon-button" aria-label="Close image library" onClick={() => setLibrary(null)}><X size={20} /></button></div>
      {library?.length ? <div className="admin-media-grid">{library.map(file => <button key={file.name} onClick={() => { onChange(file.url); setLibrary(null); }} aria-label={`Use photograph ${file.name}`}><img src={file.url} alt="Uploaded clinic photograph" loading="lazy" /><span>Use photograph</span></button>)}</div> : <div className="admin-empty"><ImagePlus size={30} /><h3>No photographs uploaded yet</h3><p>Close this window and upload your first photograph.</p></div>}
    </Modal>
  </div>;
}

export function TextField({ label, value, onChange, multiline = false, hint, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; hint?: string; type?: string }) {
  return <label className={`admin-field ${multiline ? 'admin-field-wide' : ''}`}><span>{label}</span>
    {multiline ? <textarea value={value} onChange={event => onChange(event.target.value)} rows={value.length > 300 ? 6 : 3} maxLength={12000} /> : <input type={type} value={value} onChange={event => onChange(event.target.value)} maxLength={12000} />}
    {hint && <small>{hint}</small>}
  </label>;
}

export function ObjectFields({ value, onChange, onBusy }: { value: Record<string, unknown>; onChange: (value: Record<string, unknown>) => void; onBusy: (busy: boolean) => void }) {
  return <div className="admin-form-grid">{Object.entries(value).filter(([key]) => !HIDDEN_FIELDS.includes(key)).map(([key, field]) => {
    const label = FIELD_LABELS[key] || key;
    const change = (next: unknown) => onChange({ ...value, [key]: next });
    if (key === 'image' || key === 'thumbnail') return <ImageField key={key} label={label} value={field as string} onChange={change} onBusy={onBusy} />;
    if (Array.isArray(field)) return <TextField key={key} label={label} value={field.join('\n')} onChange={next => change(next.split('\n'))} multiline hint="One entry per line." />;
    if (typeof field === 'string') return <TextField key={key} label={label} value={field} onChange={change} multiline={['bio', 'description', 'shortDesc', 'clinicHours', 'address'].includes(key) || field.length > 130} type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} />;
    return null;
  })}</div>;
}
