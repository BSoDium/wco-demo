import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

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
  ],
  resolve: {
    alias: {
      // Resolve `@` to the `src` directory
      "@": resolve(__dirname, "./src"),
    },
  },
});
