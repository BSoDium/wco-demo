import type { Palette } from "@mui/joy";

export const primary = {
  50: "#eefcfaff",
  100: "#c9f3ecff",
  200: "#87e3d4ff",
  300: "#41d2baff",
  400: "#26a18dff",
  500: "#1d7c6cff",
  600: "#124e44ff",
  700: "#0e3a33ff",
  800: "#092a24ff",
  900: "#071d18ff",
} as const satisfies Partial<Palette["primary"]>;

export const neutral = {
  50: "#fcfdfdff",
  100: "#ebefeeff",
  200: "#c7d1cfff",
  300: "#a1afadff",
  400: "#7e918eff",
  500: "#5c706dff",
  600: "#39514fff",
  700: "#2a3735ff",
  800: "#1c2221ff",
  900: "#090b0bff",
} as const satisfies Partial<Palette["neutral"]>;

export const success = {
  50: "#eff5f1",
  100: "#d4f1e6",
  200: "#9deac4",
  300: "#5ed191",
  400: "#1fb45e",
  500: "#159c36",
  600: "#138827",
  700: "#136921",
  800: "#0e481b",
  900: "#0b2b17",
} as const satisfies Partial<Palette["success"]>;
