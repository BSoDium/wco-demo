import joyTheme, { type JoyBreakpoints } from "@/app/themes/joy/joyTheme";
import { useMediaQuery } from "usehooks-ts";

export type JoyBreakpointSelector = Exclude<
  Extract<keyof JoyBreakpoints, string>,
  "keys" | "values" | "unit"
>;

export type JoyBreakpointOptions = {
  [key in JoyBreakpointSelector]: Parameters<JoyBreakpoints[key]>;
};

/**
 * A custom hook that generates a media query string based on the specified breakpoint selector
 * and options, and evaluates it using `useMediaQuery`.
 *
 * @param selector - The breakpoint selector used to generate the media query.
 * @param options - Additional options required by the breakpoint selector.
 * @returns A boolean indicating whether the media query matches the current viewport.
 */
export default function useBreakpoint<Selector extends JoyBreakpointSelector>(
  selector: Selector,
  ...options: JoyBreakpointOptions[Selector]
) {
  const selectorFunction = joyTheme.breakpoints[selector] as (
    ...args: typeof options
  ) => string;
  
  const cssQuery = selectorFunction(...options);
  const mediaQuery = cssQuery.replace("@media ", "");

  return useMediaQuery(mediaQuery);
}
