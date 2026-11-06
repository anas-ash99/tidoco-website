import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { SupportedLanguage, Direction, SUPPORTED_LANGUAGES, LanguageInfo } from './types';
import { translations, TranslationKey } from './translations';

export const COOKIE_NAME = 'tidoco_lang';

interface LanguageContextType {
  language: SupportedLanguage;
  direction: Direction;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: TranslationKey) => string;
  languages: LanguageInfo[];
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  direction: 'ltr',
  setLanguage: () => {},
  t: (key: TranslationKey) => translations.en[key] || key,
  languages: Object.values(SUPPORTED_LANGUAGES),
  isRtl: false,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function getBrowserLanguage(): SupportedLanguage | null {
  if (typeof navigator === 'undefined') return null;

  const browserLangs = navigator.languages && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const rawLang of browserLangs) {
    if (!rawLang) continue;
    const lang = rawLang.toLowerCase();

    // Hebrew: 'he' or legacy ISO 'iw'
    if (lang.startsWith('he') || lang.startsWith('iw')) {
      return 'he';
    }
    // Arabic: 'ar'
    if (lang.startsWith('ar')) {
      return 'ar';
    }
    // English: 'en'
    if (lang.startsWith('en')) {
      return 'en';
    }
  }

  return null;
}

export function getLangFromPath(pathname: string): SupportedLanguage | null {
  if (!pathname) return null;
  const lower = pathname.toLowerCase();
  if (/(?:^|\/)he(?:\/|$)/.test(lower)) {
    return 'he';
  }
  if (/(?:^|\/)ar(?:\/|$)/.test(lower)) {
    return 'ar';
  }
  if (/(?:^|\/)en(?:\/|$)/.test(lower)) {
    return 'en';
  }
  return null;
}

export function getLocalizedPath(pathname: string, lang: SupportedLanguage): string {
  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  let subpath = pathname;
  if (subpath.startsWith(base)) {
    subpath = subpath.slice(base.length);
  } else if (subpath.startsWith('/')) {
    subpath = subpath.slice(1);
  }

  // Strip existing language prefix if present at start of subpath
  subpath = subpath.replace(/^(?:he|ar|en)(?:\/|$)/, '');

  if (lang === 'en') {
    return subpath ? `${base}${subpath}` : base;
  }
  return subpath ? `${base}${lang}/${subpath}` : `${base}${lang}/`;
}

function resolveInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';

  // 1. Language segment in URL path (highest priority, e.g. /tidoco-website/he/ or /ar/)
  const pathLang = getLangFromPath(window.location.pathname);
  if (pathLang) {
    return pathLang;
  }

  // 2. Explicit query parameter ?lang=
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang')?.toLowerCase();
  if (langParam === 'he' || langParam === 'ar' || langParam === 'en') {
    return langParam as SupportedLanguage;
  }

  // 3. Saved cookie
  const cookieLang = getCookie(COOKIE_NAME);
  if (cookieLang === 'he' || cookieLang === 'ar' || cookieLang === 'en') {
    return cookieLang as SupportedLanguage;
  }

  // Fallback to localStorage if cookie isn't populated
  const localLang = localStorage.getItem(COOKIE_NAME);
  if (localLang === 'he' || localLang === 'ar' || localLang === 'en') {
    return localLang as SupportedLanguage;
  }

  // 4. Browser language default
  const browserLang = getBrowserLanguage();
  if (browserLang) {
    return browserLang;
  }

  // 5. Fallback
  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(resolveInitialLanguage);

  const direction = useMemo<Direction>(() => {
    return SUPPORTED_LANGUAGES[language].dir;
  }, [language]);

  const isRtl = direction === 'rtl';

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      setCookie(COOKIE_NAME, lang);
      localStorage.setItem(COOKIE_NAME, lang);
      const targetPath = getLocalizedPath(window.location.pathname, lang);
      const url = new URL(window.location.href);
      url.pathname = targetPath;
      url.searchParams.delete('lang');
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = direction;
      // Ensure cookie is saved
      if (!getCookie(COOKIE_NAME)) {
        setCookie(COOKIE_NAME, language);
      }
    }
    if (typeof window !== 'undefined') {
      const currentPathLang = getLangFromPath(window.location.pathname);
      if (language !== 'en' && !currentPathLang) {
        const targetPath = getLocalizedPath(window.location.pathname, language);
        const url = new URL(window.location.href);
        url.pathname = targetPath;
        url.searchParams.delete('lang');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [language, direction]);

  const t = (key: TranslationKey): string => {
    const langDict = translations[language] || translations.en;
    if (key in langDict) {
      return (langDict as Record<string, string>)[key];
    }
    return translations.en[key] || key;
  };

  const languages = useMemo(() => Object.values(SUPPORTED_LANGUAGES), []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        t,
        languages,
        isRtl,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
