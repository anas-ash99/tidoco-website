import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import styles from './ComingSoonPage.module.css';

export const ComingSoonPage: React.FC = () => {
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    document.title = t('comingSoonMetaTitle');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('comingSoonMetaDesc'));
    }
  }, [t]);

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={`${styles.wrap} ${styles.nav}`}>
        <a className={styles.brand} href={import.meta.env.BASE_URL || '/'} aria-label="Tidoco home">
          <img src={`${import.meta.env.BASE_URL}tidoco_logo.png`} alt="Tidoco logo" width="40" height="40" />
          <span>{t('brandName')}</span>
        </a>
        <div className={styles.navControls}>
          <LanguageSwitcher compact />
        </div>
      </header>

      {/* Main Hero */}
      <main className={`${styles.wrap} ${styles.hero}`}>
        <section>
          <div className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true" />
            {t('comingSoonEyebrow')}
          </div>
          <h1 className={styles.headline}>
            <span>{t('comingSoonH1Span')}</span>{' '}
            {t('comingSoonH1End')}
          </h1>
          <p className={styles.lead}>{t('comingSoonLead')}</p>
          <p className={styles.note}>{t('comingSoonNote')}</p>
        </section>

        {/* Visual Teaser Mockup */}
        <div
          className={styles.visual}
          aria-label="Preview of the Tidoco booking app"
          role="img"
        >
          <div className={styles.orb} aria-hidden="true" />

          {/* Static Mockup Phone */}
          <div
            className={`${styles.phone} ${isRtl ? styles.rtlPhone : ''}`}
            aria-hidden="true"
          >
            {/* Status bar */}
            <div className={styles.status}>
              <span>2:21</span>
              <span>▮▮ &nbsp;◉ &nbsp;▰</span>
            </div>

            {/* App Head */}
            <div className={styles.apphead}>
              <img
                src={`${import.meta.env.BASE_URL}tidoco_logo.png`}
                alt=""
                className={styles.mark}
                width="46"
                height="46"
              />
              <div>
                <b>{t('brandName')}</b>
                <small>{t('comingSoonAppSubhead')}</small>
              </div>
            </div>

            {/* Greet */}
            <div className={styles.greet}>
              <b>{t('comingSoonGreetingBold')}</b>
              <span>{t('comingSoonGreetingSub')}</span>
            </div>

            {/* Metrics */}
            <div className={`${styles.metrics} ${isRtl ? styles.rtlMetrics : ''}`}>
              <div>
                <strong>3</strong>
                <small>{t('comingSoonMetricAppointments')}</small>
              </div>
              <div className={styles.metricGreen}>
                <strong>$50</strong>
                <small>{t('comingSoonMetricRevenue')}</small>
              </div>
              <div className={styles.metricOrange}>
                <strong>1</strong>
                <small>{t('comingSoonMetricRequest')}</small>
              </div>
            </div>

            {/* Section: Quick Actions */}
            <div className={styles.section}>{t('comingSoonQuickActions')}</div>
            <div className={styles.tiles}>
              <div className={styles.tile}>
                <i>＋</i>
                <b>{t('comingSoonFindService')}</b>
                <small>{t('comingSoonDiscoverNearby')}</small>
              </div>
              <div className={`${styles.tile} ${styles.tileGreen}`}>
                <i>▦</i>
                <b>{t('comingSoonManageBookings')}</b>
                <small>{t('comingSoonPlansTogether')}</small>
              </div>
            </div>

            {/* Appointments */}
            <div className={styles.appointments}>
              <div className={styles.section}>{t('comingSoonComingUpToday')}</div>
              <div className={styles.appt}>
                <span className={styles.person}>✓</span>
                <div>
                  <b>{t('comingSoonNextAppt')}</b>
                  <small>{t('comingSoonAllDetails')}</small>
                </div>
              </div>
              <div className={styles.appt}>
                <span className={styles.person}>♥</span>
                <div>
                  <b>{t('comingSoonSaveFavs')}</b>
                  <small>{t('comingSoonFindAgain')}</small>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Callout Toasts */}
          <div
            className={`${styles.toast} ${styles.one} ${isRtl ? styles.rtlOne : ''}`}
            aria-hidden="true"
          >
            <i>✓</i>
            <span>
              {t('comingSoonToastOne')}
              <small>{t('comingSoonToastOneSub')}</small>
            </span>
          </div>

          <div
            className={`${styles.toast} ${styles.two} ${isRtl ? styles.rtlTwo : ''}`}
            aria-hidden="true"
          >
            <i>◷</i>
            <span>
              {t('comingSoonToastTwo')}
              <small>{t('comingSoonToastTwoSub')}</small>
            </span>
          </div>

          <div
            className={`${styles.toast} ${styles.three} ${isRtl ? styles.rtlThree : ''}`}
            aria-hidden="true"
          >
            <i>▦</i>
            <span>
              {t('comingSoonToastThree')}
              <small>{t('comingSoonToastThreeSub')}</small>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        {t('comingSoonFooter')}
      </footer>
    </div>
  );
};

