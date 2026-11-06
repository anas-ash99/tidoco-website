import React from 'react';
import { CATEGORIES, INITIAL_SALONS } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './ClientPhoneMockup.module.css';

export const ClientPhoneMockup: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const sampleSalon = INITIAL_SALONS[0];

  const getCategoryLabel = (catId: string) => {
    switch (catId) {
      case 'Haircut': return t('clientCatHaircut');
      case 'Nails': return t('clientCatNails');
      case 'Facial': return t('clientCatFacial');
      case 'Spa': return t('clientCatSpa');
      case 'Massage': return t('clientCatMassage');
      default: return catId;
    }
  };

  return (
    <div
      className={`${styles.visual} ${isRtl ? styles.rtlVisual : ''}`}
      aria-label="Tidoco client app preview showing nearby salons and services"
      role="img"
    >
      <div className={styles.orb} aria-hidden="true" />

      {/* Main static decorative phone mockup */}
      <div className={`${styles.phone} ${isRtl ? styles.rtlPhone : ''}`} aria-hidden="true">
        {/* Status bar */}
        <div className={styles.status}>
          <span>2:12</span>
          <span>▮▮ &nbsp;◉ &nbsp;▰</span>
        </div>

        {/* Location & profile header */}
        <div className={styles.location}>
          <div className={styles.locText}>
            <small>{t('clientLocationLabel')}</small>
            <b>
              <span className={styles.pin}>●</span> {t('clientLocationCity')}&nbsp;⌄
            </b>
          </div>
          <div className={styles.bellCircle}>
            ♟
          </div>
          <div className={styles.avatar}>
            A
          </div>
        </div>

        {/* Content */}
        <div className={styles.homeTabContent}>
          {/* Search bar */}
          <div className={styles.search}>
            <span>⌕</span>
            <div className={styles.searchPlaceholder}>
              {t('clientSearchPlaceholder')}
            </div>
            <div className={styles.filterBtn}>
              ☷
            </div>
          </div>

          <div className={styles.screenPad}>
            {/* Category pills */}
            <div className={styles.sectionHead}>{t('clientCategoriesHead')}</div>
            <div className={styles.categories}>
              {CATEGORIES.map((cat, idx) => {
                const label = getCategoryLabel(cat.id);
                return (
                  <div
                    key={cat.id}
                    className={`${styles.category} ${idx === 0 ? styles.categorySelected : ''}`}
                  >
                    <i>{cat.icon}</i>
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>

            {/* Salons list header */}
            <div className={styles.salonTitle}>
              <div className={styles.sectionHead}>{t('clientNearbySalons')}</div>
              <span className={styles.seeAllBtn}>
                {t('clientSeeAll')}
              </span>
            </div>

            {/* Salon card */}
            <article className={styles.salonCard}>
              <div className={styles.salonPhoto}>
                <span className={`${styles.heart} ${styles.heartActive}`}>
                  ♥
                </span>
              </div>
              <div className={styles.salonInfo}>
                <div className={styles.salonName}>
                  <b>{sampleSalon.name}</b>
                  <span className={styles.rating}>★ {sampleSalon.rating}</span>
                </div>
                <div className={styles.distance}>
                  ● &nbsp;{sampleSalon.distanceKm} {t('clientKmAway')}
                </div>
                <div className={styles.serviceList}>
                  {sampleSalon.services.map((srv, idx) => (
                    <div key={idx} className={styles.service}>
                      {srv.name}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Bottom nav */}
        <div className={styles.bottomNav}>
          <div className={`${styles.bottomNavItem} ${styles.selected}`}>
            <b>◆</b>
            <span>{t('clientTabHome')}</span>
          </div>
          <div className={styles.bottomNavItem}>
            <b>▦</b>
            <span>{t('clientTabBookings')}</span>
          </div>
          <div className={styles.bottomNavItem}>
            <b>♥</b>
            <span>{t('clientTabFavorites')}</span>
          </div>
          <div className={styles.bottomNavItem}>
            <b>●</b>
            <span>{t('clientTabProfile')}</span>
          </div>
        </div>
      </div>

      {/* Floating callout toasts matching reference */}
      <div className={`${styles.toast} ${styles.toastBooked} ${isRtl ? styles.rtlToastBooked : ''}`} aria-hidden="true">
        <span className={styles.toastIcon}>✓</span>
        <span>
          {t('clientToastBooked')}
          <small>{t('clientToastBookedSub')}</small>
        </span>
      </div>

      <div className={`${styles.toast} ${styles.toastNearby} ${isRtl ? styles.rtlToastNearby : ''}`} aria-hidden="true">
        <span className={styles.toastIcon}>⌖</span>
        <span>
          {t('clientToastNearby')}
          <small>{t('clientToastNearbySub')}</small>
        </span>
      </div>

      <div className={`${styles.toast} ${styles.toastSaved} ${isRtl ? styles.rtlToastSaved : ''}`} aria-hidden="true">
        <span className={styles.toastIcon}>♥</span>
        <span>
          {t('clientToastSaved')}
          <small>{t('clientToastSavedSub')}</small>
        </span>
      </div>
    </div>
  );
};
