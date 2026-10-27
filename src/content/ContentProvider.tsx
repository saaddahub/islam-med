import { useEffect, useState, type ReactNode } from 'react';
import { DEFAULT_CONTENT, type SiteContent } from './model';
import { loadContent } from './api';
import { ContentContext } from './context';

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const preview = new URLSearchParams(location.search).get('preview') === 'draft';
  useEffect(() => {
    let active = true;
    loadContent(preview).then(record => { if (active) setContent(record.content); }).catch(() => {
      if (active) setError(preview ? 'The draft could not be opened. Sign in to the admin panel and save it first.' : 'Updated content is temporarily unavailable. Showing the original website.');
    }).finally(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, [preview]);
  if (!ready) return <div className="content-loading" role="status">Preparing your visit…</div>;
  return <ContentContext value={content}>
    {preview && <div className="draft-preview-banner">Private draft preview · visitors still see the published website. <a href="/admin">Back to editor</a></div>}
    {error && <div className="content-error" role="status">{error}</div>}
    {children}
  </ContentContext>;
}
