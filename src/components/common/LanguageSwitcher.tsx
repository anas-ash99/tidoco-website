import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SupportedLanguage } from '../../i18n/types';
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangInfo = languages.find((l) => l.code === language) || languages[0];

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={`${styles.triggerBtn} ${compact ? styles.compact : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select language. Current: ${currentLangInfo.name}`}
      >
        <span className={styles.globeIcon} aria-hidden="true">🌐</span>
        <span className={styles.langName}>{currentLangInfo.nativeName}</span>
        <span className={styles.arrow} aria-hidden="true">{isOpen ? '▴' : '▾'}</span>
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox" aria-label="Available languages">
          {languages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <li
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                className={`${styles.option} ${isSelected ? styles.selectedOption : ''}`}
                onClick={() => handleSelect(lang.code)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelect(lang.code);
                  }
                }}
                tabIndex={0}
              >
                <span className={styles.optionNative}>{lang.nativeName}</span>
                <span className={styles.optionEnglish}>{lang.name}</span>
                {isSelected && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

