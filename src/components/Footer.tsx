import { Box, Button, Container, Stack, Typography } from "@mui/joy";
import ThemeSwitcher from "@/components/navigation/ThemeSwitcher";
import IconGithub from "~icons/lucide/github";
import IconHeart from "~icons/lucide/heart";
import IconCode from "~icons/lucide/code";
import { motion } from "motion/react";

function FooterButton({
  href,
  startDecorator,
  children,
  color = "neutral",
}: {
  href: string;
  startDecorator: React.ReactNode;
  children: React.ReactNode;
  color?: "neutral" | "danger";
}) {
  return (
    <Button
      component={motion.a}
      layoutId={`footer-button-${href}`}
      href={href}
      target="_blank"
      rel="noopener"
      variant="plain"
      color={color}
      startDecorator={startDecorator}
      style={{
        overflow: "hidden",
        position: "relative",
        minHeight: "initial",
        borderRadius: "100vmax",
        padding: ".625rem .775rem .625rem .625rem",
        fontSize: "var(--joy-fontSize-sm)",
        background:
          "color-mix(in srgb, var(--joy-palette-neutral-softBg), transparent 100%)",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
      whileHover={{
        background:
          "color-mix(in srgb, var(--joy-palette-neutral-softBg), transparent 50%)",
      }}
      whileTap={{
        background:
          "color-mix(in srgb, var(--joy-palette-neutral-softBg), transparent 0%)",
      }}
      transition={{
        background: { ease: "easeIn", duration: 0.2 },
      }}
    >
      {children}
    </Button>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        pb: 2,
        width: "100vw",
        backgroundColor: "background.surface",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="md">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <Typography level="body-sm">
              © {new Date().getFullYear()} BSoDium.
            </Typography>
            <Typography level="body-sm" color="neutral">
              UI inspired by Vercel.
            </Typography>
          </Stack>

          <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
            <FooterButton
              href="https://github.com/BSoDium"
              startDecorator={<IconGithub />}
            >
              GitHub
            </FooterButton>
            <FooterButton
              href="https://github.com/BSoDium/wco-demo"
              startDecorator={<IconCode />}
            >
              Source Code
            </FooterButton>
            <FooterButton
              href="https://github.com/sponsors/BSoDium"
              color="danger"
              startDecorator={<IconHeart />}
            >
              Sponsor
            </FooterButton>
            <ThemeSwitcher />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
