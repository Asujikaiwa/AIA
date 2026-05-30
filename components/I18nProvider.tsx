"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_EVENT,
  STORAGE_KEY,
  isLocale,
  pick,
  translate,
  type DictKey,
  type Locale,
  type Localized
} from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: DictKey) => string;
};

const I18nContext = createContext<Ctx>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (k) => k
});

export default function I18nProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // initial: read from localStorage (avoid SSR mismatch by reading in effect)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      // ignore
    }
    // listen to cross-tab + custom events
    const onChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (isLocale(saved)) setLocaleState(saved);
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", onChange);
    window.addEventListener(LOCALE_EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(LOCALE_EVENT, onChange);
    };
  }, []);

  // เปลี่ยน lang attr ของ <html> ตาม locale
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
      window.dispatchEvent(new Event(LOCALE_EVENT));
    } catch {
      // ignore
    }
    setLocaleState(l);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      setLocale,
      t: (key) => translate(locale, key)
    }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export function useT() {
  return useContext(I18nContext).t;
}

/** เลือกข้อความหลายภาษาจาก data object (Localized type) */
export function usePick() {
  const { locale } = useContext(I18nContext);
  return (v: Localized) => pick(v, locale);
}
