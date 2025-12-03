/**
 * Dynamically sets the theme color meta tag based on user preferences or system settings.
 *
 * NOTE: This file duplicates configuration from src/config/themeConfig.ts.
 * If you change the theme config, you must update this file as well.
 */
(function () {
  const config = {
    modeStorageKey: "app-mode",
    colors: {
      light: "#fbfcfe",
      dark: "#0A0E0E",
    },
  };

  const storageKey = config.modeStorageKey;
  const savedMode = localStorage.getItem(storageKey);
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  let activeMode = savedMode;
  if (!activeMode || activeMode === "system") {
    activeMode = systemPrefersDark ? "dark" : "light";
  }

  const themeColors = config.colors;
  const themeColor = themeColors[activeMode] || themeColors.dark;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", themeColor);
  }
})();
