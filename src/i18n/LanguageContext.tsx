import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { SupportedLanguage, Direction, SUPPORTED_LANGUAGES, LanguageInfo } from './types';
import { translations, TranslationKey } from './translations';

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

function resolveInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';

  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang')?.toLowerCase();
  if (langParam === 'he' || langParam === 'ar' || langParam === 'en') {
    return langParam as SupportedLanguage;
  }

  const savedLang = localStorage.getItem('tidoco_lang');
  if (savedLang === 'he' || savedLang === 'ar' || savedLang === 'en') {
    return savedLang as SupportedLanguage;
  }

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
      localStorage.setItem('tidoco_lang', lang);
      const url = new URL(window.location.href);
      if (lang === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', lang);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = direction;
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
