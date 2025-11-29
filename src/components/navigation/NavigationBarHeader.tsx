import { css } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { motion, type MotionStyle } from "motion/react";
import IconBell from "~icons/lucide/bell";
import IconBookOpen from "~icons/lucide/book-open";
import IconChevronUpDown from "~icons/lucide/chevrons-up-down";
import IconSearch from "~icons/lucide/search";
import IconTriangle from "~icons/lucide/triangle";

export default function NavigationBarHeader({
  style,
}: {
  style?: MotionStyle;
}) {
  return (
    <Stack
      component={motion.div}
      direction="row"
      id="navigation-bar-top"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        mb: 1.5,
      }}
      style={style}
    >
      {/* Left Side */}
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        color="var(--joy-palette-text-primary)"
      >
        <IconTriangle
          style={{ width: 20, height: 20, fill: "currentColor" }}
          css={css`
            & > path {
              fill: currentColor;
            }
          `}
        />
        <Typography level="title-md" textColor="divider">
          /
        </Typography>

        <Avatar
          src="https://github.com/Photonsquid.png"
          size="sm"
          sx={{
            width: 20,
            height: 20,
            outline: "1px solid var(--joy-palette-neutral-outlinedBorder)",
          }}
        />
        <Typography level="title-sm">Photonsquid</Typography>

        <Chip size="sm" variant="soft" color="neutral">
          Hobby
        </Chip>

        <IconButton size="sm" variant="plain" color="neutral">
          <IconChevronUpDown />
        </IconButton>
      </Stack>

      <Box
        id="drag-area"
        css={css`
          -webkit-app-region: drag;
          height: 100%;
          min-width: 0;
          flex-grow: 1;
        `}
      />

      {/* Right Side */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Input
          size="sm"
          placeholder="Find..."
          startDecorator={<IconSearch />}
          endDecorator={
            <Chip size="sm" variant="outlined" sx={{ borderRadius: "sm" }}>
              F
            </Chip>
          }
          sx={{
            width: { md: 150, lg: 250 },
            display: { xs: "none", sm: "none", md: "flex" },
          }}
        />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{ display: { xs: "none", sm: "none", md: "inline-flex" } }}
        >
          Feedback
        </Button>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            borderRadius: "100vmax",
            display: { xs: "none", sm: "inline-flex" },
          }}
        >
          <IconBell />
        </IconButton>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            borderRadius: "100vmax",
            display: { xs: "none", sm: "none", md: "inline-flex" },
          }}
        >
          <IconBookOpen />
        </IconButton>
        <Avatar
          src="https://github.com/BSoDium.png"
          variant="outlined"
          size="sm"
          sx={{ cursor: "pointer" }}
        />
      </Stack>
    </Stack>
  );
}
