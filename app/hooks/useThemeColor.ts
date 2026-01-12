import { useTheme } from "@mui/joy/styles";
import { useEffect } from "react";
import { themeConfig } from "@/config/themeConfig";

export default function useThemeColor() {
  const theme = useTheme();
  const surface = theme.palette.background.surface;
  const themeColor =
    surface.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/)?.[0] ||
    themeConfig.colors.light;

  useEffect(() => {
    if (typeof document === "undefined") return;
    
    const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
    if (themeColorMetaTag) {
      themeColorMetaTag.setAttribute("content", themeColor);
    }
  }, [themeColor]);
}
