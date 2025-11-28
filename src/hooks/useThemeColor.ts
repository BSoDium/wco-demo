import { useTheme } from "@mui/joy/styles";
import { useEffect } from "react";

export default function useThemeColor() {
  const theme = useTheme();
  const surface = theme.palette.background.surface;
  const themeColor = surface.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/)?.[0] || "#ffffff";

  useEffect(() => {
    // Set theme-color meta tag
    let themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMetaTag) {
      themeColorMetaTag = document.createElement("meta");
      themeColorMetaTag.setAttribute("name", "theme-color");
      document.head.appendChild(themeColorMetaTag);
    }
    themeColorMetaTag.setAttribute("content", themeColor);

    return () => {
      // Clean up on unmount
      if (themeColorMetaTag) {
        document.head.removeChild(themeColorMetaTag);
      }
    };
  }, [themeColor]);
}
