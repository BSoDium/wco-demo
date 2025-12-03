import {
  Box,
  Button,
  Link,
  Stack,
  Typography,
  type ColorPaletteProp,
} from "@mui/joy";
import ThemeSwitcher from "@/components/navigation/ThemeSwitcher";
import IconGithub from "~icons/lucide/github";
import IconHeart from "~icons/lucide/heart";
import IconCode from "~icons/lucide/code";
import { motion } from "motion/react";
import { css } from "@emotion/react";

function FooterButton({
  href,
  startDecorator,
  children,
  color = "neutral",
}: {
  href: string;
  startDecorator: React.ReactNode;
  children: React.ReactNode;
  color?: ColorPaletteProp;
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
        lineHeight: 1,
        background: `color-mix(in srgb, var(--joy-palette-${color}-softBg), transparent 100%)`,
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
      whileHover={{
        background: `color-mix(in srgb, var(--joy-palette-${color}-softBg), transparent 50%)`,
      }}
      whileTap={{
        background: `color-mix(in srgb, var(--joy-palette-${color}-softBg), transparent 0%)`,
      }}
      transition={{
        background: { ease: "easeIn", duration: 0.2 },
      }}
      css={css`
        svg > * {
          stroke-width: 2.5px;
        }
      `}
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
        py: 2.5,
        px: 4,
        width: "100vw",
        backgroundColor: "background.surface",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Stack direction="row" gap={2} alignItems="center" px={1.3}>
            <Typography level="body-sm">
              © {new Date().getFullYear()}{" "}
              <Link
                href="https://bsodium.fr"
                target="_blank"
                rel="noopener noreferrer"
                underline="always"
              >
                BSoDium
              </Link>
              .
            </Typography>
            <Typography level="body-sm" color="neutral">
              UI inspired by{" "}
              <Link
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                underline="always"
                color="neutral"
              >
                Vercel
              </Link>
              .
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
    </Box>
  );
}
