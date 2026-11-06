import React from 'react';
import { useAppRouter } from '../../router/Router';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import styles from './Header.module.css';

interface HeaderProps {
  role: 'business' | 'client';
}

export const Header: React.FC<HeaderProps> = ({ role }) => {
  const { navigateTo } = useAppRouter();
  const { t, isRtl } = useLanguage();

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const arrowSymbol = isRtl ? '↖' : '↗';

  return (
    <header className={`wrap ${styles.nav}`}>
      <a
        className={styles.brand}
        href="#top"
        onClick={handleScrollTo('top')}
        aria-label="Tidoco home"
      >
        <img src="/tidoco_logo.png" alt="Tidoco logo" width="40" height="40" />
        <span>{t('brandName')}</span>
      </a>

      <nav className={styles.links} aria-label="Main navigation">
        {/* Route switcher link */}
        {role === 'business' ? (
          <button
            type="button"
            className={styles.switcherLink}
            onClick={() => navigateTo('client')}
            aria-label="Switch to Client landing page"
          >
            <span className={styles.switcherBadge}>{t('navClientAppBadge')}</span>
            <span>{t('navSwitchToClient')}</span>
          </button>
        ) : (
          <button
            type="button"
            className={styles.switcherLink}
            onClick={() => navigateTo('business')}
            aria-label="Switch to Business landing page"
          >
            <span className={styles.switcherBadge}>{t('navBusinessAppBadge')}</span>
            <span>{t('navSwitchToBusiness')}</span>
          </button>
        )}

        {role === 'business' ? (
          <>
            <a href="#features" onClick={handleScrollTo('features')}>{t('navFeatures')}</a>
            <a href="#for-business" onClick={handleScrollTo('for-business')}>{t('navForBusiness')}</a>
          </>
        ) : (
          <>
            <a href="#discover" onClick={handleScrollTo('discover')}>{t('navDiscover')}</a>
            <a href="#discover" onClick={handleScrollTo('discover')}>{t('navHowItWorks')}</a>
          </>
        )}

        {/* Language selector */}
        <LanguageSwitcher />

        <a
          href="#download"
          onClick={handleScrollTo('download')}
          className={styles.navCta}
        >
          {t('navGetApp')} <span aria-hidden="true">{arrowSymbol}</span>
        </a>
      </nav>
    </header>
  );
};
