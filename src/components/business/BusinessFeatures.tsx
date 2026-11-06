import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './BusinessSections.module.css';

export const BusinessFeatures: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.features} id="features">
      <div className="wrap">
        <div className={styles.center}>
          <div className={styles.eyebrow}>{t('bizFeatEyebrow')}</div>
          <h2 className={styles.sectionTitle} style={{ whiteSpace: 'pre-line' }}>
            {t('bizFeatH2')}
          </h2>
          <p className={styles.sectionLead}>
            {t('bizFeatLead')}
          </p>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.icon} aria-hidden="true">▦</div>
            <h3>{t('bizCard1Title')}</h3>
            <p>{t('bizCard1Text')}</p>
          </article>

          <article className={styles.card}>
            <div className={styles.icon} aria-hidden="true">♙</div>
            <h3>{t('bizCard2Title')}</h3>
            <p>{t('bizCard2Text')}</p>
          </article>

          <article className={styles.card}>
            <div className={styles.icon} aria-hidden="true">↗</div>
            <h3>{t('bizCard3Title')}</h3>
            <p>{t('bizCard3Text')}</p>
          </article>
        </div>
      </div>
    </section>
  );
};
