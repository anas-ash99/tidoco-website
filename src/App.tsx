import React from 'react';
import { RouterProvider, useAppRouter } from './router/Router';
import { LanguageProvider } from './i18n/LanguageContext';
import { ComingSoonPage } from './pages/ComingSoonPage';
import { BusinessPage } from './pages/BusinessPage';
import { ClientPage } from './pages/ClientPage';

const AppContent: React.FC = () => {
  const { currentPage } = useAppRouter();

  // Preserved routes: Business and Client pages remain intact and can be rendered if navigated to
  if (currentPage === 'client') {
    return <ClientPage />;
  }
  if (currentPage === 'business') {
    return <BusinessPage />;
  }

  // Home route (/) renders the Coming Soon teaser page
  return <ComingSoonPage />;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </LanguageProvider>
  );
};

export default App;
