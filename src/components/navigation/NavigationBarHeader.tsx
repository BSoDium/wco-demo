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

// Breakpoints for WCO-aware responsive behavior (based on available width, not viewport)
const WCO_BREAKPOINTS = {
  SHOW_SEARCH: 700, // Show search input when available width >= 700px
  SHOW_FEEDBACK: 600, // Show feedback button when available width >= 600px
  SHOW_DOCS: 550, // Show docs button when available width >= 550px
  SHOW_HOBBY_CHIP: 450, // Show "Hobby" chip when available width >= 450px
} as const;

interface NavigationBarHeaderProps {
  style?: MotionStyle;
  /**
   * The available width for the header content.
   * In WCO mode, this is the title bar width; otherwise undefined (use viewport breakpoints).
   */
  availableWidth?: number;
}

export default function NavigationBarHeader({
  style,
  availableWidth,
}: NavigationBarHeaderProps) {
  // Determine visibility based on availableWidth (WCO mode) or fall back to viewport breakpoints
  const useWcoBreakpoints = availableWidth !== undefined;

  const showSearch = useWcoBreakpoints
    ? availableWidth >= WCO_BREAKPOINTS.SHOW_SEARCH
    : undefined; // Let CSS breakpoints handle it
  const showFeedback = useWcoBreakpoints
    ? availableWidth >= WCO_BREAKPOINTS.SHOW_FEEDBACK
    : undefined;
  const showDocs = useWcoBreakpoints
    ? availableWidth >= WCO_BREAKPOINTS.SHOW_DOCS
    : undefined;
  const showHobbyChip = useWcoBreakpoints
    ? availableWidth >= WCO_BREAKPOINTS.SHOW_HOBBY_CHIP
    : undefined;
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
        gap={1.5}
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

        <Chip
          size="sm"
          variant="soft"
          color="neutral"
          sx={{
            display:
              showHobbyChip === false
                ? "none"
                : showHobbyChip === true
                ? "inline-flex"
                : { xs: "none", sm: "inline-flex" },
          }}
        >
          Hobby
        </Chip>

        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          sx={{ paddingX: 0.5, minWidth: 0, ml: -1 }}
        >
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
            display:
              showSearch === false
                ? "none"
                : showSearch === true
                ? "flex"
                : { xs: "none", sm: "none", md: "flex" },
          }}
        />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            display:
              showFeedback === false
                ? "none"
                : showFeedback === true
                ? "inline-flex"
                : { xs: "none", sm: "none", md: "inline-flex" },
          }}
        >
          Feedback
        </Button>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            borderRadius: "100vmax",
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
            display:
              showDocs === false
                ? "none"
                : showDocs === true
                ? "inline-flex"
                : { xs: "none", sm: "none", md: "inline-flex" },
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
