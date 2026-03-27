import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio_language');
      return stored || 'id';
    }
    return 'id';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_language', language);
    }
  }, [language]);

  const t = (key) => {
    try {
      const keys = key.split('.');
      let value = translations[language];
      for (const k of keys) {
        if (value === undefined || value === null) return key;
        value = value[k];
      }
      return value || key;
    } catch (e) {
      console.error('Translation error:', e);
      return key;
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return { language: 'id', t: (key) => key, toggleLanguage: () => {} };
  }
  return context;
}
