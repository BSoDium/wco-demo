import { Stack, Typography } from "@mui/joy";
import { usePageTitle } from "@/hooks/usePageTitle";
import FadingTypography from "../FadingTypography";
import { css } from "@emotion/react";
import IconChevronRight from "~icons/lucide/chevron-right";

/**
 * The title component for the navigation bar, displaying the app name and current page title.
 */
export default function NavigationBarTitle({
  paddingLeft = 16,
  paddingRight = 16,
  height = 24,
}: {
  paddingLeft?: number;
  paddingRight?: number;
  height?: number;
}) {
  const { title } = usePageTitle();

  return (
    <Stack
      id="navigation-bar-title"
      sx={{
        paddingLeft: `${paddingLeft}px`,
        paddingRight: `${paddingRight}px`,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        flexGrow: 1,
      }}
      css={css`
        -webkit-app-region: drag;
      `}
    >
      <Stack
        direction="row"
        sx={{
          height: `${height}px`,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography level="body-xs" fontWeight="lg">
          WCO API Demo
        </Typography>
        <IconChevronRight style={{ margin: "0 8px", fontSize: "0.75rem" }} />
        <FadingTypography
          level="body-xs"
          fontWeight="lg"
          textColor="text.primary"
        >
          {title}
        </FadingTypography>
      </Stack>
    </Stack>
  );
}
