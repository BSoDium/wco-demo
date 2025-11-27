import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

/** Whether the app is currently in "development" mode, as opposed to "test" or "production" */
const dev = process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    Icons({
      compiler: "jsx",
      jsx: "react",
      defaultClass: "unplugin-icon",
      scale: 1,
    }),
    // Automatically resolve paths based on the `tsconfig.json` file
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "WCO Demo App",
        short_name: "WCO Demo",
        description: "A demo app for Window Controls Overlay",
        theme_color: "#ffffff",
        display: "standalone",
        display_override: ["window-controls-overlay"],
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
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
});
