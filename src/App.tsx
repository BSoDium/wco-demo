import { lazy, StrictMode } from "react";
import "@/scss/app.global.scss";

const Providers = lazy(() => import("@/app/providers/Providers"));
const Router = lazy(() => import("@/app/routes/Router"));

export default function App() {
  return (
    <StrictMode>
      <Providers>
        <Router />
      </Providers>
    </StrictMode>
  );
}
