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
};

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("lang-select");
  const savedRaw = localStorage.getItem("lang");
  const saved = isLang(savedRaw) ? savedRaw : "es";
  if (select instanceof HTMLSelectElement) {
    select.value = saved;
    select.addEventListener("change", (event) => {
      const target = event.target;
      if (target instanceof HTMLSelectElement) {
        const lang = isLang(target.value) ? target.value : "es";
        localStorage.setItem("lang", lang);
        applyTranslations(lang);
      }
    });
  }
  applyTranslations(saved);
});
