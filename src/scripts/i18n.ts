import { translations } from "../i18n/translations";

type Lang = "es" | "en";
type Dictionary = Record<string, string>;
interface TranslationsMap {
  es: Dictionary;
  en: Dictionary;
}

const translationsMap: TranslationsMap = translations;

const isLang = (value: unknown): value is Lang => value === "es" || value === "en";

const applyTranslations = (lang: Lang) => {
  const dict = translationsMap[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && dict[key]) {
      el.textContent = dict[key];
    }
  });
  document.dispatchEvent(new CustomEvent("lang-changed", { detail: { lang } }));
};

const initI18n = () => {
  const toggle = document.getElementById("lang-toggle");
  const savedRaw = localStorage.getItem("lang");
  const saved = isLang(savedRaw) ? savedRaw : "es";

  const setLabel = (lang: Lang) => {
    if (toggle) {
      toggle.textContent = lang === "es" ? "EN" : "ES";
      toggle.setAttribute("aria-label", lang === "es" ? "Cambiar a ingles" : "Switch to Spanish");
    }
  };

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = isLang(localStorage.getItem("lang")) ? (localStorage.getItem("lang") as Lang) : "es";
      const next: Lang = current === "es" ? "en" : "es";
      localStorage.setItem("lang", next);
      setLabel(next);
      applyTranslations(next);
    });
  }

  setLabel(saved);
  applyTranslations(saved);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initI18n);
} else {
  initI18n();
}
