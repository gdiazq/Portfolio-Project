type ThemeMode = "dark" | "light";
const isTheme = (value: unknown): value is ThemeMode => value === "dark" || value === "light";

const getSavedTheme = (): ThemeMode => {
  const saved = localStorage.getItem("theme");
  return isTheme(saved) ? saved : "dark";
};

const setTheme = (theme: ThemeMode) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
};

const setThemeLabel = (theme: ThemeMode) => {
  const label = theme === "dark" ? "Cambiar a claro" : "Cambiar a oscuro";
  const button = document.getElementById("theme-toggle");
  if (button) {
    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    button.setAttribute("aria-label", label);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("theme-toggle");
  const currentTheme = getSavedTheme();
  setTheme(currentTheme);
  setThemeLabel(currentTheme);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const next: ThemeMode = getSavedTheme() === "dark" ? "light" : "dark";
      setTheme(next);
      setThemeLabel(next);
    });
  }
});
