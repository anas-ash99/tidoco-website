import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './ClientSections.module.css';

export const ClientFeatures: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.features} id="discover">
      <div className="wrap">
        <div className={styles.center}>
          <div className={styles.eyebrow}>{t('clientFeatEyebrow')}</div>
          <h2 className={styles.sectionTitle}>{t('clientFeatH2')}</h2>
          <p className={styles.sectionLead}>
            {t('clientFeatLead')}
          </p>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.icon} aria-hidden="true">⌕</div>
            <h3>{t('clientCard1Title')}</h3>
            <p>{t('clientCard1Text')}</p>
          </article>

          <article className={styles.card}>
            <div className={styles.icon} aria-hidden="true">♡</div>
            <h3>{t('clientCard2Title')}</h3>
            <p>{t('clientCard2Text')}</p>
          </article>

          <article className={styles.card}>
            <div className={styles.icon} aria-hidden="true">▦</div>
            <h3>{t('clientCard3Title')}</h3>
            <p>{t('clientCard3Text')}</p>
          </article>
        </div>
      </div>
    </section>
  );
};
