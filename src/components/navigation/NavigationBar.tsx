import { Stack } from "@mui/joy";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { useTitleBarRect } from "@/hooks/useTitleBarRect";
import NavigationBarTabs from "./NavigationBarTabs";

export default function NavigationBar({
  children,
  collapsedHeight = 80,
  expandedHeight = 120,
}: {
  children: ReactNode | ReactNode[];
  collapsedHeight?: number;
  expandedHeight?: number;
}) {
  const heightDiff = expandedHeight - collapsedHeight;

  // Retrieve title bar rectangle for WCO support
  const titleBarRect = useTitleBarRect();

  // Observe page scroll position
  const { scrollY: pageScrollY } = useScroll({ axis: "y" });

  // Handle nav collapse/expand on scroll with GPU-accelerated transforms
  const navY = useMotionValue(0);
  useMotionValueEvent(pageScrollY, "change", (latest) => {
    const previous = pageScrollY.getPrevious() || 0;
    const delta = latest - previous;

    const currentNavY = navY.get();
    let newNavY = currentNavY - delta;
    if (newNavY > 0) newNavY = 0;
    if (newNavY < -heightDiff) newNavY = -heightDiff;
    navY.set(newNavY);
  });

  // Handle top element offset for WCO

  // Handle scroll snapping - position anchors at absolute positions
  const snapTopY = useTransform(() => pageScrollY.get() + navY.get());
  const snapBottomY = useTransform(
    () => pageScrollY.get() + navY.get() + heightDiff
  );

  // Ref for the nav element
  const navRef = useRef<HTMLElement>(null);

  return (
    <>
      <motion.span
        id="nav-snap-anchor-top"
        style={{
          position: "absolute",
          scrollSnapAlign: "start",
          top: snapTopY,
          width: "100vw",
          height: 1,
          background: "transparent",
          zIndex: 10000,
        }}
      />
      <motion.span
        id="nav-snap-anchor-bottom"
        style={{
          position: "absolute",
          scrollSnapAlign: "start",
          top: snapBottomY,
          width: "100vw",
          height: 1,
          background: "transparent",
          zIndex: 10000,
        }}
      />
      <Stack
        ref={navRef}
        direction="column"
        layoutId="navigation-bar"
        layoutRoot
        id="navigation-bar"
        component={motion.nav}
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          y: navY,
          height: `${expandedHeight}px`,
          justifyContent: "flex-end",
          padding: 0,
          width: "100vw",
          zIndex: 1000,
          backgroundColor: "var(--joy-palette-background-surface)",
          borderBottom: "1px solid var(--joy-palette-divider)",
        }}
      >
        <Stack direction="row" id="navigation-bar-top">
          top
        </Stack>
        <NavigationBarTabs />
      </Stack>
      {children}
    </>
  );
}
