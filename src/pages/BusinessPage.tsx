import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BusinessHero } from '../components/business/BusinessHero';
import { BusinessFeatures } from '../components/business/BusinessFeatures';
import { BusinessAudience } from '../components/business/BusinessAudience';
import { BusinessCta } from '../components/business/BusinessCta';

export const BusinessPage: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = t('metaBusinessTitle');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('metaBusinessDesc'));
    }
  }, [t, language]);

  return (
    <>
      <Header role="business" />
      <main id="top">
        <BusinessHero />
        <BusinessFeatures />
        <BusinessAudience />
        <BusinessCta />
      </main>
      <Footer role="business" />
    </>
  );
};
