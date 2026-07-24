import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { dict, type Lang, type Dict } from "./dictionary";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "tfa_lang";

export function LanguageProvider({ children, initial }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (initial) return initial;
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "en" || stored === "es") return stored;
    const nav = navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
    return nav;
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t.langToggle.aria}
      className={`inline-flex rounded-full border border-gray-200 bg-white p-0.5 text-xs font-semibold ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full transition ${lang === "en" ? "bg-navy text-white" : "text-navy hover:bg-gray-50"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        className={`px-3 py-1 rounded-full transition ${lang === "es" ? "bg-navy text-white" : "text-navy hover:bg-gray-50"}`}
      >
        ES
      </button>
    </div>
  );
}