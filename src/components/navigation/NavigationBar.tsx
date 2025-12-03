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
  isStandalone: boolean
) => number;

// Navigation configuration constants
const NAV_CONFIG = {
  // Individual component heights
  HEADER_HEIGHT: 45, // NavigationBarHeader row height
  TABS_HEIGHT: 40, // NavigationBarTabs row height

  // Browser mode offsets (extra padding when address bar is visible)
  BROWSER: {
    COLLAPSED_OFFSET: 5,
    EXPANDED_OFFSET: 15,
  },

  // WCO mode offset (extra padding below window controls when collapsed)
  WCO: {
    COLLAPSED_OFFSET: 8,
  },
} as const;

// Derived heights for different navbar states
const HEIGHTS = {
  // When collapsed (no title bar visible)
  COLLAPSED: NAV_CONFIG.TABS_HEIGHT + 1, // Tabs + border
  // When expanded (header + tabs visible)
  EXPANDED: NAV_CONFIG.HEADER_HEIGHT + NAV_CONFIG.TABS_HEIGHT + 1, // Header + Tabs + border
  // When using WCO (header + tabs, title bar handled separately)
  WCO_BASE: NAV_CONFIG.HEADER_HEIGHT + NAV_CONFIG.TABS_HEIGHT,
} as const;

const defaultCollapsedHeight: HeightFactory = (rect, isStandalone) =>
  rect && rect.height > 0
    ? HEIGHTS.WCO_BASE + NAV_CONFIG.WCO.COLLAPSED_OFFSET
    : HEIGHTS.COLLAPSED +
      (isStandalone ? 0 : NAV_CONFIG.BROWSER.COLLAPSED_OFFSET);

const defaultExpandedHeight: HeightFactory = (rect, isStandalone) =>
  rect && rect.height > 0
    ? HEIGHTS.WCO_BASE + rect.height
    : HEIGHTS.EXPANDED +
      (isStandalone ? 0 : NAV_CONFIG.BROWSER.EXPANDED_OFFSET);

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
  const titleBarRect = useTitleBarRect();
  const { isStandalone } = usePWAInstall();

  // Calculate heights from WCO and standalone status
  const { usesWCO, expandedHeight, heightVariation } = useNavigationHeights(
    isStandalone,
    titleBarRect,
    collapsedHeightFactory,
    expandedHeightFactory
  );

  // Handle scroll logic
  const { navY, pageScrollY } = useNavigationScrollBehavior(
    heightVariation,
    threshold
  );

  // Handle layout animations
  const { headerPaddingLeft, headerPaddingRight } = useNavigationLayout(
    navY,
    heightVariation,
    titleBarRect,
    usesWCO
  );

  // Compute static title styles
  const titleStyles =
    usesWCO && titleBarRect
      ? {
          paddingLeft: titleBarRect.x + (titleBarRect.x === 0 ? 16 : 8),
          paddingRight:
            window.innerWidth - (titleBarRect.x + titleBarRect.width),
          height: titleBarRect.height,
        }
      : { paddingLeft: 0, paddingRight: 0, height: 0 };

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
        {usesWCO && <NavigationBarTitle {...titleStyles} />}
        <NavigationBarHeader
          style={{
            paddingLeft: headerPaddingLeft,
            paddingRight: headerPaddingRight,
          }}
          availableWidth={usesWCO && titleBarRect ? titleBarRect.width : undefined}
        />
        <NavigationBarTabs />
      </Stack>
      {children}
    </>
  );
}

const anchorStyle = {
  position: "absolute",
  scrollSnapAlign: "start",
  width: "100vw",
  height: 1,
  background: "transparent",
  zIndex: 10000,
} as const;

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
