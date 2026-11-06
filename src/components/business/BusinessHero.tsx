import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { BusinessDashboardMockup } from './BusinessDashboardMockup';
import styles from './BusinessHero.module.css';

export const BusinessHero: React.FC = () => {
  const { t, isRtl } = useLanguage();

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const arrowForward = isRtl ? '←' : '→';

  return (
    <section className={`wrap ${styles.hero}`} id="top">
      <div>
        <div className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          {t('bizEyebrow')}
        </div>
        <h1 className={styles.headline}>
          {t('bizH1Start')} <span>{t('bizH1Span')}</span>
        </h1>
        <p className={styles.lead}>
          {t('bizLead')}
        </p>
        <div className={styles.actions}>
          <a
            className={`${styles.btn} ${styles.primary}`}
            href="#download"
            onClick={handleScrollTo('download')}
          >
            {t('bizCtaPrimary')} <span aria-hidden="true">{arrowForward}</span>
          </a>
          <a
            className={`${styles.btn} ${styles.secondary}`}
            href="#features"
            onClick={handleScrollTo('features')}
          >
            {t('bizCtaSecondary')} <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className={styles.trust}>
          <div className={styles.avatars} aria-hidden="true">
            <span className={styles.avatar}>✂</span>
            <span className={styles.avatar}>✦</span>
            <span className={styles.avatar}>●</span>
          </div>
          <span>
            {t('bizTrust')} <strong>{t('bizTrustBold')}</strong>
          </span>
        </div>
      </div>

      <div className={styles.visualColumn}>
        <BusinessDashboardMockup />
      </div>
    </section>
  );
};
