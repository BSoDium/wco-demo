import {
  cubicBezier,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { HeightFactory } from "./NavigationBar";

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

export function useNavigationScroll(heightVariation: number) {
  const { scrollY: pageScrollY } = useScroll({ axis: "y" });
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

  return { navY, pageScrollY };
}

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
