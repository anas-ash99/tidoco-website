export type SupportedLanguage = 'en' | 'he' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  dir: Direction;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageInfo> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
  },
  he: {
    code: 'he',
    name: 'Hebrew',
    nativeName: 'עברית',
    dir: 'rtl',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
  },
};

