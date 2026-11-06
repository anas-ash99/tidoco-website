import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './BusinessDashboardMockup.module.css';

export const BusinessDashboardMockup: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <div
      className={`${styles.visualContainer} ${isRtl ? styles.rtlVisual : ''}`}
      aria-label="Tidoco business dashboard preview"
      role="img"
    >
      <div className={styles.orb} aria-hidden="true" />

      {/* Main static decorative dashboard mockup */}
      <div className={`${styles.tidocoBoard} ${isRtl ? styles.rtlBoard : ''}`} aria-hidden="true">
        {/* Status bar */}
        <div className={styles.miniStatus}>
          <span>2:21</span>
          <span>▮▮ &nbsp;◉ &nbsp;▰</span>
        </div>

        {/* Board Header */}
        <div className={styles.boardHead}>
          <img
            src={`${import.meta.env.BASE_URL}tidoco_logo.png`}
            alt=""
            className={styles.calendarLogo}
            width="54"
            height="54"
          />
          <div>
            <b>{t('brandName')}</b>
            <small>{t('bizBoardSubhead')}</small>
          </div>
          <span className={styles.bell}>♟</span>
        </div>

        {/* Main Content */}
        <div className={styles.tabContent}>
          {/* Greeting */}
          <div className={styles.boardGreeting}>
            <b>{t('bizGreetingBold')}</b>
            <span>{t('bizGreetingSub')}</span>
          </div>

          {/* Metrics */}
          <div className={styles.boardMetrics}>
            <div>
              <b>3</b>
              <span>{t('bizMetricAppointments')}</span>
            </div>
            <div>
              <b>$50</b>
              <span>{t('bizMetricRevenue')}</span>
            </div>
            <div>
              <b>1</b>
              <span>{t('bizMetricPending')}</span>
            </div>
          </div>

          {/* Board Body */}
          <div className={styles.boardBody}>
            <div className={styles.boardQuick}>
              <b>{t('bizQuickActions')}</b>
              <div className={styles.quickTile}>
                <i>＋</i>
                <span>
                  <strong>{t('bizAddAppointments')}</strong>
                  <small>{t('bizManualBooking')}</small>
                </span>
              </div>
              <div className={styles.quickTile}>
                <i>⚙</i>
                <span>
                  <strong>{t('bizManageServices')}</strong>
                  <small>{t('bizEditPricing')}</small>
                </span>
              </div>
            </div>

            <div className={styles.boardAppointments}>
              <b>
                {t('bizTodayAppointments')}{' '}
                <span className={styles.viewAllBtn}>
                  {t('bizViewAll')}
                </span>
              </b>

              <div className={styles.appointmentList}>
                <div className={styles.clientRow}>
                  <i>●</i>
                  <span>
                    <strong>Daniel Alon</strong>
                    <small>Classic Precision Haircut</small>
                  </span>
                  <span className={`${styles.statusBadge} ${styles.pending}`}>
                    10:00–10:30&nbsp; · &nbsp;{t('bizStatusPending')}
                  </span>
                </div>

                <div className={styles.clientRow}>
                  <i>●</i>
                  <span>
                    <strong>Sarah Goldstein</strong>
                    <small>Skin Fade & Haircut</small>
                  </span>
                  <span className={`${styles.statusBadge} ${styles.ok}`}>
                    11:30–12:15&nbsp; · &nbsp;{t('bizStatusConfirmed')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tab bar */}
        <div className={styles.boardTabs}>
          <span className={`${styles.tabItem} ${styles.activeTab}`}>
            ◆ {t('bizTabDashboard')}
          </span>
          <span className={styles.tabItem}>
            ▣ {t('bizTabCalendar')}
          </span>
          <span className={styles.tabItem}>
            ✂ {t('bizTabServices')}
          </span>
          <span className={styles.tabItem}>
            ● {t('bizTabProfile')}
          </span>
        </div>
      </div>

      {/* Floating callouts / toasts */}
      <div className={`${styles.pop} ${styles.popBooking} ${isRtl ? styles.rtlPopBooking : ''}`} aria-hidden="true">
        <span className={styles.popIcon}>✓</span>
        <span>
          {t('bizPopBooking')}
          <small>Daniel Alon · {t('bizPopBookingSub')}</small>
        </span>
      </div>

      <div className={`${styles.pop} ${styles.popTime} ${isRtl ? styles.rtlPopTime : ''}`} aria-hidden="true">
        <span className={styles.popIcon}>◷</span>
        <span>
          {t('bizPopTime')}
          <small>{t('bizPopTimeSub')}</small>
        </span>
      </div>

      <div className={`${styles.pop} ${styles.popCount} ${isRtl ? styles.rtlPopCount : ''}`} aria-hidden="true">
        <span className={styles.popIcon}>▦</span>
        <span>
          3 {t('bizPopCountAppointments')}
          <small>{t('bizPopCountSub')}</small>
        </span>
      </div>
    </div>
  );
};
