import {
  type ColorPaletteProp,
  type ColorSystem,
  type CssVarsThemeOptions,
  extendTheme,
  type Palette,
  type Theme,
  type VariantProp,
} from "@mui/joy/styles";

export const schemes = ["light", "dark"] as const;
export const defaultScheme = "light";
export type Scheme = (typeof schemes)[number];

export const modes = [...schemes, "system"] as const;
export const defaultMode = "system";
export type Mode = (typeof modes)[number];

export const joyColors = [
  "danger",
  "warning",
  "success",
  "neutral",
  "primary",
] as const satisfies ColorPaletteProp[];
export type JoyColor = (typeof joyColors)[number];

export const joyVariants = [
  "plain",
  "outlined",
  "soft",
  "solid",
] as const satisfies VariantProp[];
export type JoyVariant = (typeof joyVariants)[number];

export const overrideThemeOptions: CssVarsThemeOptions = {
  cssVarPrefix: "joy",
  colorSchemes: {
    light: {
      palette: {
        neutral: {
          solidBg: "var(--joy-palette-neutral-900)",
          solidColor: "var(--joy-palette-neutral-100)",
          solidHoverBg: "var(--joy-palette-neutral-800)",
          solidActiveBg: "var(--joy-palette-neutral-700)",
        },
      },
    },
    dark: {
      palette: {
        neutral: {
          solidBg: "var(--joy-palette-neutral-100)",
          solidColor: "var(--joy-palette-neutral-900)",
          solidHoverBg: "var(--joy-palette-neutral-300)",
          solidActiveBg: "var(--joy-palette-neutral-400)",
        },
        primary: {
          solidBg: "var(--joy-palette-primary-700)",
          solidColor: "var(--joy-palette-primary-50)",
          solidHoverBg: "var(--joy-palette-primary-600)",
          solidActiveBg: "var(--joy-palette-primary-500)",
        },
        success: {
          solidBg: "var(--joy-palette-success-700)",
          solidColor: "var(--joy-palette-success-50)",
          solidHoverBg: "var(--joy-palette-success-600)",
          solidActiveBg: "var(--joy-palette-success-500)",
        },
      },
    },
  },
  components: {},
};

export type JoyTheme = Theme;
export type JoyBreakpoints = Theme["breakpoints"];
export type JoyColorSystem = ColorSystem;
export type JoyPalette = Palette;
export default extendTheme(overrideThemeOptions);
