import { Typography } from "@mui/joy";
import { AnimatePresence, motion } from "motion/react";
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
  return (
    <Typography component="span" {...rest}>
      <AnimatePresence mode="wait" onExitComplete={onTransitionEnd}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 5, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -5, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </Typography>
  );
}
