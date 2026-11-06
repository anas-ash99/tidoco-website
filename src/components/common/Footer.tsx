import React from 'react';
import { STORE_LINKS } from '../../config/links';
import { useAppRouter } from '../../router/Router';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import styles from './Footer.module.css';

interface FooterProps {
  role: 'business' | 'client';
}

export const Footer: React.FC<FooterProps> = ({ role }) => {
  const { navigateTo } = useAppRouter();
  const { t } = useLanguage();

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.footerInner}`}>
        <a
          className={styles.brand}
          href="#top"
          onClick={handleScrollTo('top')}
          aria-label="Tidoco home"
        >
          <img src="/tidoco_logo.png" alt="" width="30" height="30" aria-hidden="true" />
          <span>{t('brandName')}</span>
        </a>

        <div className={styles.tagline}>
          {role === 'business' ? t('footerCopyrightBiz') : t('footerCopyrightClient')}
        </div>

        <div className={styles.footLinks}>
          <button
            type="button"
            className={styles.roleLink}
            onClick={() => navigateTo(role === 'business' ? 'client' : 'business')}
          >
            {role === 'business' ? t('footerSwitchToClient') : t('footerSwitchToBiz')}
          </button>
          <LanguageSwitcher compact />
          <a href={STORE_LINKS.contactEmail}>{t('footerContact')}</a>
          {role === 'business' ? (
            <a href="#features" onClick={handleScrollTo('features')}>{t('navFeatures')}</a>
          ) : (
            <a href="#discover" onClick={handleScrollTo('discover')}>{t('navDiscover')}</a>
          )}
          <a href="#download" onClick={handleScrollTo('download')}>{t('footerDownload')}</a>
        </div>
      </div>
    </footer>
  );
};
