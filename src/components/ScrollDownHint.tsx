import { Stack, Typography } from "@mui/joy";
import { motion, useScroll, useTransform } from "motion/react";
import IconArrowDown from "~icons/lucide/arrow-down";

export default function ScrollDownHint() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [0.6, 0]);

  return (
    <Stack
      component={motion.div}
      alignItems="center"
      gap={1}
      style={{ opacity }}
      sx={{
        mt: 15,
      }}
      animate={{
        y: [0, 0, -10, 0, -5, 0, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        times: [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1],
      }}
    >
      <Typography
        level="body-xs"
        fontWeight="lg"
        textTransform="uppercase"
        letterSpacing="md"
      >
        Scroll down
      </Typography>
      <IconArrowDown />
    </Stack>
  );
}
