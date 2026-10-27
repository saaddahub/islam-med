import { createContext, useContext } from 'react';
import { DEFAULT_CONTENT, type SiteContent } from './model';

export const ContentContext = createContext<SiteContent>(DEFAULT_CONTENT);
export const useContent = () => useContext(ContentContext);
