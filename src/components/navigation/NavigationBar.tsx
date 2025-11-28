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
import NavigationBarHeader from "./NavigationBarHeader";
import NavigationBarTabs from "./NavigationBarTabs";
import NavigationBarTitle from "./NavigationBarTitle";

export default function NavigationBar({
  children,
  collapsedHeight: collapsedHeightFactory = (rect) =>
    rect && rect.height > 0 ? 50 + rect.height : 41,
  expandedHeight: expandedHeightFactory = (rect) =>
    rect && rect.height > 0 ? 120 : 81,
}: {
  children: ReactNode | ReactNode[];
  collapsedHeight?: ((titleBarRect?: DOMRect | null) => number) | number;
  expandedHeight?: ((titleBarRect?: DOMRect | null) => number) | number;
}) {
  // Retrieve title bar rectangle for WCO support
  const titleBarRect = useTitleBarRect();
  const usesWCO = titleBarRect !== null && titleBarRect.height > 0;

  // Determine heights
  const collapsedHeight =
    typeof collapsedHeightFactory === "function"
      ? collapsedHeightFactory(titleBarRect)
      : collapsedHeightFactory;
  const expandedHeight =
    typeof expandedHeightFactory === "function"
      ? expandedHeightFactory(titleBarRect)
      : expandedHeightFactory;
  const heightVariation = expandedHeight - collapsedHeight;

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
    if (newNavY < -heightVariation) newNavY = -heightVariation;
    navY.set(newNavY);
  });

  // Handle header padding for WCO
  const headerPaddingLeft = useTransform(
    navY,
    [0, -heightVariation],
    [16, usesWCO ? titleBarRect.x : 16]
  );
  const headerPaddingRight = useTransform(
    navY,
    [0, -heightVariation],
    [
      16,
      usesWCO ? window.innerWidth - (titleBarRect.x + titleBarRect.width) : 16,
    ]
  );

  // Compute title styles
  const titlePaddingLeft = usesWCO ? titleBarRect.x + 8 : 0;
  const titlePaddingRight = usesWCO
    ? window.innerWidth - (titleBarRect.x + titleBarRect.width)
    : 0;
  const titleHeight = usesWCO ? titleBarRect.height : 0;

  // Handle scroll snapping - position anchors at absolute positions
  const snapTopY = useTransform(() => pageScrollY.get() + navY.get());
  const snapBottomY = useTransform(
    () => pageScrollY.get() + navY.get() + heightVariation
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
        {usesWCO && (
          <NavigationBarTitle
            paddingLeft={titlePaddingLeft}
            paddingRight={titlePaddingRight}
            height={titleHeight}
          />
        )}
        <NavigationBarHeader
          style={{
            paddingLeft: headerPaddingLeft,
            paddingRight: headerPaddingRight,
          }}
        />
        <NavigationBarTabs />
      </Stack>
      {children}
    </>
  );
}
