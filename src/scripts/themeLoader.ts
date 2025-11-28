/**
 * Dynamically sets the theme color meta tag based on user preferences or system settings.
 *
 * This script is necessary due to a limitation in the Vite PWA plugin, which does not support
 * dynamic theme color changes at load time. By executing this script early in the page lifecycle,
 * we can apply the correct theme color before the initial render, preventing flash of incorrect
 * theme color.
 *
 * The script prioritizes theme selection in the following order:
 * 1. User's saved theme preference from localStorage
 * 2. System color scheme preference (prefers-color-scheme media query)
 * 3. Falls back to "dark" theme if no preference is found
 *
 * @param config - The theme configuration object containing color mappings and storage key
 * @returns void
 *
 * @example
 * ```typescript
 * // Inject this script in the HTML head before other content loads
 * themeLoaderScript(themeConfig);
 * ```
 */
/// <reference lib="dom" />
import { themeConfig } from "../config/themeConfig";

/**
 *
 */
export const themeLoaderScript = (config: typeof themeConfig) => {
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

  const themeColor =
    themeColors[activeMode as keyof typeof themeColors] || themeColors.dark;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColor);
  console.log(`Applied ${activeMode} theme with color ${themeColor}`);
};
