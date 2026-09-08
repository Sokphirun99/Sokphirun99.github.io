import { useEffect } from 'react';
import en from '../data/translations/en.js';
import { languages } from '../data/translations/index.js';
import { LanguageContext } from './LanguageContext';

export function LanguageProvider({ children }) {
  useEffect(() => {
    localStorage.removeItem('preferredLanguage');
    document.documentElement.lang = 'en';
  }, []);

  return (
    <LanguageContext.Provider value={{ lang: 'en', setLang: () => {}, t: en, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}
