import { useState, useEffect } from "react";

const getWindowControlsOverlay = () => {
  if ("windowControlsOverlay" in navigator && navigator.windowControlsOverlay) {
    return navigator.windowControlsOverlay;
  }
  return null;
};

/**
 * Custom hook to get the title bar area rectangle when using Window Controls Overlay (WCO).
 * It listens for geometry changes and updates the rectangle accordingly.
 *
 * @returns {DOMRect | null} The rectangle of the title bar area, or null if WCO is not supported.
 */
export const useTitleBarRect = () => {
  const [rect, setRect] = useState<DOMRect | null>(() => {
    return getWindowControlsOverlay()?.getTitlebarAreaRect() ?? null;
  });

  useEffect(() => {
    const wco = getWindowControlsOverlay();
    if (!wco) return;

    const updateRect = () => {
      setRect(wco.getTitlebarAreaRect());
    };

    wco.addEventListener("geometrychange", updateRect);

    return () => {
      wco.removeEventListener("geometrychange", updateRect);
    };
  }, []);

  return rect;
};
