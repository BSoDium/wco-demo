import { css } from "@emotion/react";
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import IconBell from "~icons/lucide/bell";
import IconBookOpen from "~icons/lucide/book-open";
import IconChevronDown from "~icons/lucide/chevron-down";
import IconSearch from "~icons/lucide/search";
import IconTriangle from "~icons/lucide/triangle";

export default function NavigationBarHeader() {
  return (
    <Stack
      direction="row"
      id="navigation-bar-top"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        px: 2,
        mb: 1,
      }}
    >
      {/* Left Side */}
      <Stack direction="row" spacing={1.5} alignItems="center">
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
          <IconChevronDown />
        </IconButton>
      </Stack>

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
          sx={{ width: 240, display: { xs: "none", md: "flex" } }}
        />
        <Button size="sm" variant="outlined" color="neutral">
          Feedback
        </Button>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{ borderRadius: "100vmax" }}
        >
          <IconBell />
        </IconButton>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{ borderRadius: "100vmax" }}
        >
          <IconBookOpen />
        </IconButton>
        <Avatar
          src="https://github.com/BSoDium.png"
          size="sm"
          sx={{ cursor: "pointer" }}
        />
      </Stack>
    </Stack>
  );
}
