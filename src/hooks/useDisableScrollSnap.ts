import { useEffect } from "react";

/**
 * Disables scroll snapping for iOS/iPadOS Safari by toggling a class on <html>.
 * Safari on iPadOS 13+ can report as Macintosh, so we also rely on touchpoints.
 */
export default function useDisableScrollSnap() {
  useEffect(() => {
    if (typeof navigator === "undefined" || typeof document === "undefined") {
      return;
    }

    const ua = navigator.userAgent || navigator.vendor || "";
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua));

    // Safari-only (exclude other WebKit-based browsers on iOS)
    const isSafari =
      /Safari/i.test(ua) &&
      !/Chrome|CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo/i.test(ua);

    if (isIOSDevice && isSafari) {
      document.documentElement.classList.add("no-scroll-snap");

      return () => {
        document.documentElement.classList.remove("no-scroll-snap");
      };
    }

    return undefined;
  }, []);
}