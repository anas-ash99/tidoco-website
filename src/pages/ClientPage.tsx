import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ClientHero } from '../components/client/ClientHero';
import { ClientFeatures } from '../components/client/ClientFeatures';
import { ClientCta } from '../components/client/ClientCta';

export const ClientPage: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = t('metaClientTitle');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('metaClientDesc'));
    }
  }, [t, language]);

  return (
    <>
      <Header role="client" />
      <main id="top">
        <ClientHero />
        <ClientFeatures />
        <ClientCta />
      </main>
      <Footer role="client" />
    </>
  );
};
