import { Stack } from "@mui/joy";
import { motion, useTransform, type MotionValue } from "motion/react";
import { type ReactNode, useRef } from "react";
import { useTitleBarRect } from "@/hooks/useTitleBarRect";
import NavigationBarHeader from "./NavigationBarHeader";
import NavigationBarTabs from "./NavigationBarTabs";
import NavigationBarTitle from "./NavigationBarTitle";
import {
  useNavigationHeights,
  useNavigationLayout,
  useNavigationScroll,
} from "./useNavigationAnimation";

// Default height factories
const defaultCollapsedHeight = (rect?: DOMRect | null) =>
  rect && rect.height > 0 ? 50 + rect.height : 41;

const defaultExpandedHeight = (rect?: DOMRect | null) =>
  rect && rect.height > 0 ? 120 : 81;

interface NavigationBarProps {
  children: ReactNode | ReactNode[];
  collapsedHeight?: ((titleBarRect?: DOMRect | null) => number) | number;
  expandedHeight?: ((titleBarRect?: DOMRect | null) => number) | number;
}

export default function NavigationBar({
  children,
  collapsedHeight: collapsedHeightFactory = defaultCollapsedHeight,
  expandedHeight: expandedHeightFactory = defaultExpandedHeight,
}: NavigationBarProps) {
  // 1. Get Title Bar Rect
  const titleBarRect = useTitleBarRect();

  // 2. Calculate Heights
  const { usesWCO, expandedHeight, heightVariation } = useNavigationHeights(
    titleBarRect,
    collapsedHeightFactory,
    expandedHeightFactory
  );

  // 3. Handle Scroll Logic
  const { navY, pageScrollY } = useNavigationScroll(heightVariation);

  // 4. Handle Layout Animations
  const { headerPaddingLeft, headerPaddingRight } = useNavigationLayout(
    navY,
    heightVariation,
    titleBarRect,
    usesWCO
  );

  // 5. Compute Static Title Styles
  const titlePaddingLeft = usesWCO && titleBarRect ? titleBarRect.x + 8 : 0;
  const titlePaddingRight =
    usesWCO && titleBarRect
      ? window.innerWidth - (titleBarRect.x + titleBarRect.width)
      : 0;
  const titleHeight = usesWCO && titleBarRect ? titleBarRect.height : 0;

  const navRef = useRef<HTMLElement>(null);

  return (
    <>
      <NavigationSnapAnchors
        pageScrollY={pageScrollY}
        navY={navY}
        heightVariation={heightVariation}
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

function NavigationSnapAnchors({
  pageScrollY,
  navY,
  heightVariation,
}: {
  pageScrollY: MotionValue<number>;
  navY: MotionValue<number>;
  heightVariation: number;
}) {
  const snapTopY = useTransform(() => pageScrollY.get() + navY.get());
  const snapBottomY = useTransform(
    () => pageScrollY.get() + navY.get() + heightVariation
  );

  const anchorStyle = {
    position: "absolute" as const,
    scrollSnapAlign: "start" as const,
    width: "100vw",
    height: 1,
    background: "transparent",
    zIndex: 10000,
  };

  return (
    <>
      <motion.span
        id="nav-snap-anchor-top"
        style={{ ...anchorStyle, top: snapTopY }}
      />
      <motion.span
        id="nav-snap-anchor-bottom"
        style={{ ...anchorStyle, top: snapBottomY }}
      />
    </>
  );
}
