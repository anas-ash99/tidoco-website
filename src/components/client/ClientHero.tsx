import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ClientPhoneMockup } from './ClientPhoneMockup';
import styles from './ClientHero.module.css';

export const ClientHero: React.FC = () => {
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
          {t('clientEyebrow')}
        </div>
        <h1 className={styles.headline}>
          {t('clientH1Start')}<br />
          <span>{t('clientH1Span')}</span>
          {t('clientH1End') ? ` ${t('clientH1End')}` : ''}
        </h1>
        <p className={styles.lead}>
          {t('clientLead')}
        </p>
        <div className={styles.actions}>
          <a
            className={`${styles.btn} ${styles.primary}`}
            href="#download"
            onClick={handleScrollTo('download')}
          >
            {t('clientCtaPrimary')} <span aria-hidden="true">{arrowForward}</span>
          </a>
          <a
            className={`${styles.btn} ${styles.secondary}`}
            href="#discover"
            onClick={handleScrollTo('discover')}
          >
            {t('clientCtaSecondary')} <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className={styles.socialProof}>
          <span className={styles.bubbleAvatars} aria-hidden="true">
            <i>✂</i>
            <i>♥</i>
            <i>✦</i>
          </span>
          <span>
            {t('clientSocialProof')} <strong>{t('clientSocialProofBold')}</strong>
          </span>
        </div>
      </div>

      <div className={styles.visualColumn}>
        <ClientPhoneMockup />
      </div>
    </section>
  );
};
