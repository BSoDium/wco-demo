import { CssBaseline, CssVarsProvider } from "@mui/joy";
import joyTheme, { defaultMode } from "@/app/themes/joy/joyTheme";
import { MotionConfig } from "motion/react";
import { themeConfig } from "@/config/themeConfig";

export default function Providers({ children }: { children: React.ReactNode }) {
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
            {children}
          </MotionConfig>
      </CssVarsProvider>
  );
}
