"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { PiGlobe, PiMoon, PiSun } from "react-icons/pi";

export type Language = "uk" | "en";
export type Theme = "light" | "dark";

type PreferencesValue = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<PreferencesValue | null>(null);
const preferencesEvent = "pixora-preferences-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(preferencesEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(preferencesEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getLanguageSnapshot(): Language {
  return localStorage.getItem("pixora-language") === "en" ? "en" : "uk";
}

function getThemeSnapshot(): Theme {
  return localStorage.getItem("pixora-theme") === "dark" ? "dark" : "light";
}

function notifyPreferenceChange() {
  window.dispatchEvent(new Event(preferencesEvent));
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getLanguageSnapshot, () => "uk");
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => "light");

  const value = useMemo<PreferencesValue>(
    () => ({
      language,
      theme,
      setLanguage: (nextLanguage) => {
        localStorage.setItem("pixora-language", nextLanguage);
        document.documentElement.lang = nextLanguage;
        document.documentElement.dataset.language = nextLanguage;
        notifyPreferenceChange();
      },
      toggleTheme: () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        localStorage.setItem("pixora-theme", nextTheme);
        document.documentElement.dataset.theme = nextTheme;
        notifyPreferenceChange();
      },
    }),
    [language, theme],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences must be used within PreferencesProvider");
  return context;
}

export function PreferenceControls() {
  const { language, setLanguage, theme, toggleTheme } = usePreferences();
  const dark = theme === "dark";

  return (
    <div className="preference-controls" aria-label={language === "uk" ? "Налаштування сайту" : "Site preferences"}>
      <button
        className="theme-toggle"
        type="button"
        aria-label={dark ? (language === "uk" ? "Увімкнути світлу тему" : "Use light theme") : (language === "uk" ? "Увімкнути темну тему" : "Use dark theme")}
        onClick={toggleTheme}
      >
        <span className="preference-icon" aria-hidden="true">
          {dark ? <PiMoon /> : <PiSun />}
        </span>
        <span className="preference-label">
          {dark ? (language === "uk" ? "Темна" : "Dark") : language === "uk" ? "Світла" : "Light"}
        </span>
      </button>

      <button
        className="language-toggle"
        type="button"
        aria-label={language === "uk" ? "Switch to English" : "Перемкнути на українську"}
        onClick={() => setLanguage(language === "uk" ? "en" : "uk")}
      >
        <PiGlobe aria-hidden="true" />
        <span>{language === "uk" ? "EN" : "УКР"}</span>
      </button>
    </div>
  );
}
