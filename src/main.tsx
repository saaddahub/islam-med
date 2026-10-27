import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './mobile.css'
import { ContentProvider } from './content/ContentProvider'

// eslint-disable-next-line react/only-export-components -- This entry point keeps the editor out of the public startup bundle.
const AdminPanel = lazy(() => import('./admin/AdminPanel'));
const isAdmin = /^\/admin\/?$/.test(location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin
      ? <Suspense fallback={<div className="content-loading">Opening website editor…</div>}><AdminPanel /></Suspense>
      : <ContentProvider><App /></ContentProvider>}
  </StrictMode>,
)
