"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import ptTranslations from "@/data/translations/pt.json";
import enTranslations from "@/data/translations/en.json";

type Language = "pt" | "en";
type Translations = typeof ptTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "pt" || saved === "en")) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translations = language === "pt" ? ptTranslations : enTranslations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
