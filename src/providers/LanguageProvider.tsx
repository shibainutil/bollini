import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { Language, TranslationSet } from "../i18n/translations";
import { translations } from "../i18n/translations";

const LANGUAGE_STORAGE_KEY = "bollini-language";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => Promise<void>;
  t: TranslationSet;
};

const defaultLanguage: Language = getLocales()[0]?.languageCode === "de" ? "de" : "en";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_STORAGE_KEY)
      .then((storedLanguage) => {
        if (storedLanguage === "en" || storedLanguage === "de") {
          setLanguageState(storedLanguage);
        }
      })
      .catch(() => {
        return;
      });
  }, []);

  const setLanguage = async (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);

  if (!value) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return value;
}