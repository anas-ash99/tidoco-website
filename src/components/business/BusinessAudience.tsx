import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './BusinessSections.module.css';

export const BusinessAudience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.audience} id="for-business">
      <div className={`wrap ${styles.audienceRow}`}>
        <div>
          <div className={styles.eyebrow}>{t('bizAudienceEyebrow')}</div>
          <h2 className={styles.sectionTitle} style={{ whiteSpace: 'pre-line' }}>
            {t('bizAudienceH2')}
          </h2>
          <p className={styles.sectionLead} style={{ margin: 0, maxWidth: 470 }}>
            {t('bizAudienceLead')}
          </p>
          <div className={styles.checks}>
            <div className={styles.check}>
              <b aria-hidden="true">✓</b> {t('bizCheck1')}
            </div>
            <div className={styles.check}>
              <b aria-hidden="true">✓</b> {t('bizCheck2')}
            </div>
            <div className={styles.check}>
              <b aria-hidden="true">✓</b> {t('bizCheck3')}
            </div>
            <div className={styles.check}>
              <b aria-hidden="true">✓</b> {t('bizCheck4')}
            </div>
          </div>
        </div>

        <aside className={styles.quote}>
          <div className={styles.quoteMark} aria-hidden="true">“</div>
          <p>{t('bizQuoteText')}</p>
          <div className={styles.quoteFoot}>
            <strong>{t('bizQuoteFootBold')}</strong>
            <span>{t('brandName')}</span>
          </div>
        </aside>
      </div>
    </section>
  );
};
