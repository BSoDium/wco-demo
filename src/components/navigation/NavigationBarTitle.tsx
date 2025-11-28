import { Stack } from "@mui/joy";
import { usePageTitle } from "@/hooks/usePageTitle";
import TypeWriter from "../TypeWriter";

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
    >
      <Stack
        sx={{
          height: `${height}px`,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <TypeWriter typeInterval={25} level="body-sm" textColor="text.tertiary">
          {title}
        </TypeWriter>
      </Stack>
    </Stack>
  );
}
