import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLangFromPath } from '../i18n/LanguageContext';

export type PageRoute = 'coming-soon' | 'business' | 'client';

interface RouterContextType {
  currentPage: PageRoute;
  navigateTo: (page: PageRoute) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPage: 'coming-soon',
  navigateTo: () => {},
});

export function useAppRouter() {
  return useContext(RouterContext);
}

function resolvePageFromLocation(): PageRoute {
  if (typeof window === 'undefined') return 'coming-soon';

  const path = window.location.pathname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.toLowerCase();

  // Preserved routes: works both at domain root / and under subpaths like /tidoco-website/
  if (
    path.includes('/client') ||
    path.includes('/clients') ||
    searchParams.get('page') === 'client' ||
    searchParams.get('role') === 'client' ||
    hash.startsWith('#client')
  ) {
    return 'client';
  }

  if (
    path.includes('/business') ||
    searchParams.get('page') === 'business' ||
    searchParams.get('role') === 'business' ||
    hash.startsWith('#business')
  ) {
    return 'business';
  }

  // Home route points to the coming-soon page
  return 'coming-soon';
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(resolvePageFromLocation);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(resolvePageFromLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    const lang = getLangFromPath(window.location.pathname);
    const langPrefix = lang && lang !== 'en' ? `${lang}/` : '';

    let targetPath = `${cleanBase}${langPrefix}`;
    if (page === 'client') targetPath = `${cleanBase}${langPrefix}clients`;
    else if (page === 'business') targetPath = `${cleanBase}${langPrefix}business`;

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </RouterContext.Provider>
  );
};
