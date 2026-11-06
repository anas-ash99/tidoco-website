import React, { createContext, useContext, useEffect, useState } from 'react';

export type PageRoute = 'business' | 'client';

interface RouterContextType {
  currentPage: PageRoute;
  navigateTo: (page: PageRoute) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPage: 'business',
  navigateTo: () => {},
});

export function useAppRouter() {
  return useContext(RouterContext);
}

function resolvePageFromLocation(): PageRoute {
  if (typeof window === 'undefined') return 'business';

  const path = window.location.pathname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.toLowerCase();

  if (
    path.startsWith('/client') ||
    path.startsWith('/clients') ||
    searchParams.get('page') === 'client' ||
    searchParams.get('role') === 'client' ||
    hash.startsWith('#client')
  ) {
    return 'client';
  }

  return 'business';
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
    const targetPath = page === 'client' ? '/clients' : '/';
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

