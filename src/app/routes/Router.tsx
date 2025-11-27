/* istanbul ignore file -- @preserve */
import { lazy } from "react";
import { BrowserRouter,  Route, Routes } from "react-router";
// Standard lazy-loaded components
const Main = lazy(() => import("@/app/pages/Main"));

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
    </BrowserRouter>
  );
}
