import { CssBaseline, CssVarsProvider } from "@mui/joy";
import joyTheme, { defaultMode } from "@/app/themes/joy/joyTheme";
import { MotionConfig } from "motion/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <CssVarsProvider
        defaultMode={defaultMode}
        theme={joyTheme}
        modeStorageKey="app-mode"
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
