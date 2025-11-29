import { Stack } from "@mui/joy";
import { motion, useTransform, type MotionValue } from "motion/react";
import { type ReactNode } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useTitleBarRect } from "@/hooks/useTitleBarRect";
import NavigationBarHeader from "./NavigationBarHeader";
import NavigationBarTabs from "./NavigationBarTabs";
import NavigationBarTitle from "./NavigationBarTitle";
import {
  useNavigationHeights,
  useNavigationLayout,
  useNavigationScrollBehavior,
} from "./useNavigationAnimation";

// Default height factories
export type HeightFactory = (
  titleBarRect: DOMRect | null,
  isInstalled: boolean
) => number;

const defaultCollapsedHeight: HeightFactory = (rect, isInstalled) =>
  rect && rect.height > 0 ? 52 + rect.height : 41 + (isInstalled ? 0 : 5);

const defaultExpandedHeight: HeightFactory = (rect, isInstalled) =>
  rect && rect.height > 0 ? 122 : 81 + (isInstalled ? 0 : 15);

interface NavigationBarProps {
  /** The content to be rendered below the navigation bar. */
  children: ReactNode | ReactNode[];
  /**
   * Function or number to determine the collapsed height of the navbar.
   * Defaults to a factory that accounts for WCO and installation status.
   */
  collapsedHeight?: HeightFactory | number;
  /**
   * Function or number to determine the expanded height of the navbar.
   * Defaults to a factory that accounts for WCO and installation status.
   */
  expandedHeight?: HeightFactory | number;
  /**
   * The scroll distance (in pixels) required to trigger a state change (collapse/expand)
   * when the navbar is in a stable state (fully expanded or fully collapsed).
   * Defaults to 100.
   */
  threshold?: number;
}

/**
 * A responsive navigation bar that supports Window Controls Overlay (WCO) and
 * scroll-linked animations. It automatically adjusts its layout and height
 * based on the scroll position and WCO state.
 */
export default function NavigationBar({
  children,
  collapsedHeight: collapsedHeightFactory = defaultCollapsedHeight,
  expandedHeight: expandedHeightFactory = defaultExpandedHeight,
  threshold = 100,
}: NavigationBarProps) {
  // 1. Get Title Bar Rect
  const titleBarRect = useTitleBarRect();
  const { isInstalled } = usePWAInstall();

  // 2. Calculate Heights
  const { usesWCO, expandedHeight, heightVariation } = useNavigationHeights(
    isInstalled,
    titleBarRect,
    collapsedHeightFactory,
    expandedHeightFactory
  );

  // 3. Handle Scroll Logic
  const { navY, pageScrollY } = useNavigationScrollBehavior(
    heightVariation,
    threshold
  );

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

  return (
    <>
      <NavigationSnapAnchors
        pageScrollY={pageScrollY}
        navY={navY}
        heightVariation={heightVariation}
      />

      <Stack
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

/**
 * Renders invisible snap anchors to facilitate scroll snapping behavior
 * in relation to the navigation bar's position. These anchors help maintain
 * a fully visible navigation bar, no matter where the scroll position ends up.
 *
 * @param pageScrollY - The current vertical scroll position of the page.
 * @param navY - The current Y position of the navigation bar.
 * @param heightVariation - The difference between expanded and collapsed heights.
 */
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
    position: "absolute",
    scrollSnapAlign: "start",
    width: "100vw",
    height: 1,
    background: "transparent",
    zIndex: 10000,
  } as const;

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
