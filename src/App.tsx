import { lazy, StrictMode } from "react";
import "@/scss/app.global.scss";
import useDisableScrollSnap from "@/hooks/useDisableScrollSnap";

const Providers = lazy(() => import("@/app/providers/Providers"));
const Router = lazy(() => import("@/app/routes/Router"));

export default function App() {
  useDisableScrollSnap();

  return (
    <StrictMode>
      <Providers>
        <Router />
      </Providers>
    </StrictMode>
  );
}
