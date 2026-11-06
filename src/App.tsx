import React from 'react';
import { RouterProvider, useAppRouter } from './router/Router';
import { LanguageProvider } from './i18n/LanguageContext';
import { BusinessPage } from './pages/BusinessPage';
import { ClientPage } from './pages/ClientPage';

const AppContent: React.FC = () => {
  const { currentPage } = useAppRouter();
  return currentPage === 'client' ? <ClientPage /> : <BusinessPage />;
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
