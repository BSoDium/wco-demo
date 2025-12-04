import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";
import { themeConfig } from "./src/config/themeConfig";

/** Port to use for Vite development server */
const VITE_PORT = 1111;

/**
 * Get the base URL for the application based on the deployment environment.
 * @returns The base URL as a string.
 */
function getBaseUrl() {
  // Production and preview deployments on Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Default to localhost for development
  return `http://localhost:${VITE_PORT}`;
}

export default defineConfig(({ mode }) => {
  /** Whether the app is currently in "development" mode */
  const dev = mode === "development";
  /** Base URL for the application */
  const baseUrl = getBaseUrl();

  return {
    server: {
      port: VITE_PORT,
      strictPort: true,
    },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
      // Enable importing SVGs as React components
      svgr(),
      // Enable icon imports from unplugin-icons
      Icons({
        compiler: "jsx",
        jsx: "react",
        defaultClass: "unplugin-icon",
        scale: 1,
      }),
      // Automatically resolve paths based on the `tsconfig.json` file
      tsconfigPaths(),
      // Progressive Web App support
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
          name: "WCO Demo App",
          short_name: "WCO Demo",
          description: "A demo app for Window Controls Overlay",
          theme_color: themeConfig.colors.light,
          display: "standalone",
          display_override: ["window-controls-overlay"],
          start_url: "/",
          id: "/",
          related_applications: [
            {
              platform: "webapp",
              url: `${baseUrl}/manifest.webmanifest`,
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
      // Generate a self-signed certificate for local development
      ...(dev ? [mkcert()] : []),
    ],
    resolve: {
      alias: {
        // Resolve `@` to the `src` directory
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
