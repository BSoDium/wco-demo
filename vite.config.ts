import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";
import { themeConfig } from "./src/config/themeConfig";
import { themeLoaderScript } from "./src/scripts/themeLoader";

/** Whether the app is currently in "development" mode, as opposed to "test" or "production" */
const dev = process.env.NODE_ENV === "development";

export default defineConfig({
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
    // Inject theme loader script into index.html
    {
      name: "html-theme-script-injection",
      transformIndexHtml(html) {
        const script = `
          <script>
            (${themeLoaderScript.toString()})(${JSON.stringify(themeConfig)})
          </script>
        `;
        return html.replace("</head>", `${script}</head>`);
      },
    },
  ],
  resolve: {
    alias: {
      // Resolve `@` to the `src` directory
      "@": resolve(__dirname, "./src"),
    },
  },
});
