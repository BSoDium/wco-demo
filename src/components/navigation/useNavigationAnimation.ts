import { useRef } from "react";
import {
  cubicBezier,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { HeightFactory } from "./NavigationBar";

/**
 * Calculates the collapsed and expanded heights of the navigation bar,
 * taking into account the Window Controls Overlay (WCO) and installation status.
 *
 * @param isInstalled - Whether the app is installed as a PWA.
 * @param titleBarRect - The bounding rectangle of the title bar (WCO).
 * @param collapsedHeightFactory - Function or number for collapsed height.
 * @param expandedHeightFactory - Function or number for expanded height.
 * @returns Object containing WCO usage status, calculated heights, and height variation.
 */
export function useNavigationHeights(
  isInstalled: boolean,
  titleBarRect: DOMRect | null,
  collapsedHeightFactory: HeightFactory | number,
  expandedHeightFactory: HeightFactory | number
) {
  const usesWCO = titleBarRect !== null && titleBarRect.height > 0;

  const collapsedHeight =
    typeof collapsedHeightFactory === "function"
      ? collapsedHeightFactory(titleBarRect, isInstalled)
      : collapsedHeightFactory;
  const expandedHeight =
    typeof expandedHeightFactory === "function"
      ? expandedHeightFactory(titleBarRect, isInstalled)
      : expandedHeightFactory;
  const heightVariation = expandedHeight - collapsedHeight;

  return {
    usesWCO,
    collapsedHeight,
    expandedHeight,
    heightVariation,
  };
}

/**
 * Manages the scroll behavior of the navigation bar, including collapsing/expanding
 * animations and threshold logic to prevent accidental layout shifts.
 *
 * @param heightVariation - The difference between expanded and collapsed heights.
 * @param threshold - The scroll distance required to trigger a state change (default: 100).
 * @returns Object containing the navigation Y motion value and page scroll Y motion value.
 */
export function useNavigationScroll(
  heightVariation: number,
  threshold: number = 100
) {
  const { scrollY: pageScrollY } = useScroll({ axis: "y" });
  const navY = useMotionValue(0);
  const scrollBuffer = useRef(0);

  const clampNavY = (value: number) => {
    return Math.max(Math.min(value, 0), -heightVariation);
  };

  useMotionValueEvent(pageScrollY, "change", (latest) => {
    const previous = pageScrollY.getPrevious() || 0;
    const delta = latest - previous;
    const currentNavY = navY.get();

    // If we are near the top of the page, reset buffer and follow standard behavior.
    // This ensures the navbar is always fully expanded at the very top.
    if (latest <= heightVariation + threshold) {
      scrollBuffer.current = 0;
      navY.set(clampNavY(currentNavY - delta));
      return;
    }

    const isScrollingDown = delta > 0;
    const isFullyExpanded = currentNavY >= 0;
    const isFullyCollapsed = currentNavY <= -heightVariation;

    if (isScrollingDown) {
      if (isFullyExpanded) {
        // Navbar is fully expanded, accumulate scroll delta in buffer
        scrollBuffer.current += delta;

        if (scrollBuffer.current > threshold) {
          // Threshold exceeded, start collapsing
          const excess = scrollBuffer.current - threshold;
          navY.set(clampNavY(currentNavY - excess));
          // Keep buffer at threshold to maintain smooth movement
          scrollBuffer.current = threshold;
        }
      } else {
        // Navbar is partially or fully collapsed, move immediately
        scrollBuffer.current = 0;
        navY.set(clampNavY(currentNavY - delta));
      }
    } else {
      // Scrolling up
      if (isFullyCollapsed) {
        // Navbar is fully collapsed, accumulate scroll delta in buffer
        scrollBuffer.current += Math.abs(delta);

        if (scrollBuffer.current > threshold) {
          // Threshold exceeded, start expanding
          const excess = scrollBuffer.current - threshold;
          navY.set(clampNavY(currentNavY + excess));
          // Keep buffer at threshold to maintain smooth movement
          scrollBuffer.current = threshold;
        }
      } else {
        // Navbar is partially or fully expanded, move immediately
        scrollBuffer.current = 0;
        navY.set(clampNavY(currentNavY - delta));
      }
    }
  });

  return { navY, pageScrollY };
}

/**
 * Calculates layout animations for the navigation bar header, adjusting padding
 * based on the navigation Y position and WCO state.
 *
 * @param navY - The current Y position of the navigation bar.
 * @param heightVariation - The difference between expanded and collapsed heights.
 * @param titleBarRect - The bounding rectangle of the title bar (WCO).
 * @param usesWCO - Whether WCO is active.
 * @returns Object containing motion values for header padding.
 */
export function useNavigationLayout(
  navY: MotionValue<number>,
  heightVariation: number,
  titleBarRect: DOMRect | null,
  usesWCO: boolean
) {
  const headerPaddingLeft = useTransform(
    navY,
    [0, -heightVariation],
    [16, usesWCO && titleBarRect ? titleBarRect.x + 16 : 16],
    {
      ease: cubicBezier(1, 0, 1, 0),
    }
  );

  const headerPaddingRight = useTransform(
    navY,
    [0, -heightVariation],
    [
      16,
      usesWCO && titleBarRect
        ? window.innerWidth - (titleBarRect.x + titleBarRect.width) + 16
        : 16,
    ],
    {
      ease: cubicBezier(1, 0, 1, 0),
    }
  );

  return { headerPaddingLeft, headerPaddingRight };
}
