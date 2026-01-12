import { Typography } from "@mui/joy";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ComponentProps } from "react";

/**
 * A component that transitions text gracefully using a motion effect.
 * Replaces the previous typewriter effect.
 */
export default function FadingTypography({
  children: text,
  onTransitionEnd,
  ...rest
}: {
  /**
   * The text to be displayed.
   */
  children: string;
  /**
   * A callback function that is called when the exit animation ends.
   */
  onTransitionEnd?: () => void;
} & ComponentProps<typeof Typography>) {
  const prefersReducedMotion = useReducedMotion();
  
  // When reduced motion is preferred, disable blur and y-offset animations
  const motionConfig = {
    y: prefersReducedMotion ? 0 : 10,
    blur: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
    duration: prefersReducedMotion ? 0.2 : 0.4,
  };

  return (
    <Typography component="span" {...rest}>
      <AnimatePresence mode="popLayout" onExitComplete={onTransitionEnd} initial={false}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: motionConfig.y, filter: motionConfig.blur }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -motionConfig.y, filter: motionConfig.blur }}
          transition={{ duration: motionConfig.duration, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </Typography>
  );
}
