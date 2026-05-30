import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from '@/lib/translations';
import { t } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Load language from localStorage on mount
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && (saved === 'en' || saved === 'hi')) {
      setLanguageState(saved);
    }
    setIsHydrated(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: (key: string) => t(key, language),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
