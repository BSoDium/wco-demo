import NavigationBar from "@/components/navigation/NavigationBar";
import useThemeColor from "@/hooks/useThemeColor";
import { lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

const Main = lazy(() => import("@/app/pages/Main"));

export default function Router() {
  useThemeColor();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <NavigationBar>
              <Outlet />
            </NavigationBar>
          }
        >
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
