import { useState, useEffect, useCallback } from 'react';
import { loadTranslations, languages } from '../data/translations/index.js';
import { LanguageContext } from './LanguageContext';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('preferredLanguage');
    const isValid = saved && languages.some((l) => l.code === saved);
    return isValid ? saved : 'en';
  });
  const [t, setT] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadTranslations(lang).then((translations) => {
      if (!cancelled) setT(translations);
    });
    return () => { cancelled = true; };
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const changeLang = useCallback((code) => {
    if (languages.some((l) => l.code === code)) {
      setLang(code);
    }
  }, []);

  if (!t) {
    // Minimal placeholder to avoid flash; matches the app background color
    return <div className="min-h-screen bg-[#f5f5f7]" />;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}
