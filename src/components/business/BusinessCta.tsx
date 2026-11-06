import React from 'react';
import { STORE_LINKS } from '../../config/links';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './BusinessSections.module.css';

export const BusinessCta: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.cta} id="download">
      <div className="wrap">
        <div className={styles.eyebrowLight}>{t('bizCtaEyebrow')}</div>
        <h2 className={styles.ctaTitle}>
          {t('bizCtaH2')}
        </h2>
        <p className={styles.ctaLead}>
          {t('bizCtaLead')}
        </p>
        <div className={styles.actions} style={{ justifyContent: 'center' }}>
          <a
            className={styles.ctaBtn}
            href={STORE_LINKS.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Tidoco from the App Store (External prototype link)"
          >
             &nbsp; App Store
          </a>
          <a
            className={styles.ctaBtn}
            href={STORE_LINKS.googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Tidoco on Google Play (External prototype link)"
          >
            ▶ &nbsp; Google Play
          </a>
        </div>
      </div>
    </section>
  );
};
