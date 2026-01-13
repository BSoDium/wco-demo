import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import joyTheme, { defaultMode } from "@/themes/joyTheme";
import { MotionConfig } from "motion/react";
import { themeConfig } from "@/config/themeConfig";
import "@/scss/app.global.scss";
import { LinksFunction } from "@remix-run/node";
import useDisableScrollSnap from "@/hooks/useDisableScrollSnap";
import useThemeColor from "@/hooks/useThemeColor";

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/manifest.webmanifest" },
];

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#0A0E0E" />
        <Meta />
        <Links />
        <script src="/pwa-init.js"></script>
        <script src="/theme-loader.js"></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}

function App() {
  useDisableScrollSnap();
  useThemeColor();

  return (
    <CssVarsProvider
      defaultMode={defaultMode}
      theme={joyTheme}
      modeStorageKey={themeConfig.modeStorageKey}
    >
      <CssBaseline />
      <MotionConfig
        transition={{
          ease: [0.19, 0, 0, 1],
          duration: 0.5,
        }}
      >
        <Outlet />
      </MotionConfig>
    </CssVarsProvider>
  );
}

export default App;
