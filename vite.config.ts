import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import Icons from "unplugin-icons/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";
import { themeConfig } from "./app/config/themeConfig";

/** Port to use for Vite development server */
const VITE_PORT = 1111;

/**
 * Get the base URL for the application based on the deployment environment.
 * @returns The base URL as a string.
 */
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${VITE_PORT}`;
}

export default defineConfig(({ mode }) => {
  const dev = mode === "development";
  const baseUrl = getBaseUrl();

  return {
    server: {
      port: VITE_PORT,
      strictPort: true,
    },
    plugins: [
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
      }),
      svgr(),
      Icons({
        compiler: "jsx",
        jsx: "react",
        defaultClass: "unplugin-icon",
        scale: 1,
      }),
      tsconfigPaths(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        devOptions: {
          enabled: true,
        },
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "favicon-16x16.png",
          "favicon-32x32.png",
        ],
        manifest: {
          name: "Window Controls Overlay Demo",
          short_name: "WCO Demo",
          description: "A demo app for Window Controls Overlay",
          theme_color: themeConfig.colors.light,
          display: "standalone",
          display_override: ["window-controls-overlay"],
          start_url: "/",
          scope: "/",
          id: "Window-Controls-Overlay-Demo",
          related_applications: [
            {
              platform: "webapp",
              url: `${baseUrl}/manifest.webmanifest`,
              id: baseUrl,
            },
          ],
          icons: [
            {
              src: "android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
      ...(dev ? [mkcert()] : []),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./app"),
      },
    },
  };
});
