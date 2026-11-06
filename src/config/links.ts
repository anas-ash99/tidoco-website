/**
 * Configuration module for external store URLs and contact links.
 * 
 * NOTE FOR OWNER:
 * The production App Store and Google Play store listings have not yet been supplied.
 * Update these placeholder values once your store applications are published.
 */

export const STORE_LINKS = {
  // Safe clearly-labeled placeholder until Apple App Store URL is provided
  appStoreUrl: 'https://apps.apple.com/app/tidoco/id0000000000?demo=placeholder',
  
  // Safe clearly-labeled placeholder until Google Play Store URL is provided
  googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.tidoco.app&demo=placeholder',
  
  // Contact and support email
  contactEmail: 'mailto:hello@tdco.app',

  // Prototype notice flag
  isStoreLinksConfigured: false,
} as const;

