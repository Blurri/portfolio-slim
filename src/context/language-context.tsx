"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Language = "en" | "de";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isLoaded: boolean;
};

const defaultContextValue: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  isLoaded: false,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [translations, setTranslations] = useState<
    Record<string, Record<string, string>>
  >({
    en: {
      "nav.about": "About",
      "nav.technologies": "Technologies",
      "nav.projects": "Projects",
      "nav.experience": "Experience",
      "nav.contact": "Contact",
      "language.en": "English",
      "language.de": "German",
    },
    de: {
      "nav.about": "Über mich",
      "nav.technologies": "Technologien",
      "nav.projects": "Projekte",
      "nav.experience": "Erfahrung",
      "nav.contact": "Kontakt",
      "language.en": "Englisch",
      "language.de": "Deutsch",
    },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const enTranslations = await import("@/translations/en.json").then(
          (module) => module.default
        );
        const deTranslations = await import("@/translations/de.json").then(
          (module) => module.default
        );

        setTranslations({
          en: { ...translations.en, ...enTranslations },
          de: { ...translations.de, ...deTranslations },
        });

        const savedLanguage = localStorage.getItem(
          "language"
        ) as Language | null;
        if (
          savedLanguage &&
          (savedLanguage === "en" || savedLanguage === "de")
        ) {
          setLanguage(savedLanguage);
        }

        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load translations:", error);
        setIsLoaded(true);
      }
    };

    loadTranslations();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("language", language);
    }
  }, [language, isLoaded]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
