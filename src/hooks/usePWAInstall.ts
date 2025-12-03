import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface RelatedApplication {
  platform: string;
  url?: string;
  id?: string;
}

// HACK: Extend global interfaces to include PWA-related APIs
declare global {
  interface WindowControlsOverlay extends EventTarget {
    visible: boolean;
    getTitlebarAreaRect(): DOMRect;
  }

  interface Navigator {
    getInstalledRelatedApps?: () => Promise<RelatedApplication[]>;
    windowControlsOverlay?: WindowControlsOverlay;
  }
  interface Window {
    deferredPrompt: BeforeInstallPromptEvent | null;
  }
}

/**
 * Hook to manage Progressive Web App (PWA) installation state and prompt.
 * @returns Object containing installation status, prompt function, and mode info.
 */
export function usePWAInstall() {
  // Initialize with early-captured prompt if available (event may fire before React mounts)
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(
      () => (window.deferredPrompt as BeforeInstallPromptEvent) ?? null
    );

  // Track whether the app is installed (detected via getInstalledRelatedApps API)
  const [isInstalled, setIsInstalled] = useState(() => {
    // Start with standalone check as initial value
    if (typeof window !== "undefined") {
      return window.matchMedia("(display-mode: standalone)").matches;
    }
    return false;
  });

  // Track whether the app is running in standalone mode (no browser chrome)
  const [isStandalone, setIsStandalone] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(display-mode: standalone)").matches;
    }
    return false;
  });

  // Check installation status using getInstalledRelatedApps API
  useEffect(() => {
    const checkInstallation = async () => {
      if (!navigator.getInstalledRelatedApps) {
        return;
      }

      try {
        const relatedApps = await navigator.getInstalledRelatedApps();
        setIsInstalled(relatedApps.length > 0);
      } catch (error) {
        console.warn("Failed to check installed apps:", error);
      }
    };

    checkInstallation();
  }, []);

  // Listen for display-mode changes (e.g., when opening in standalone vs browser)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
      // If we enter standalone mode, app is definitely installed
      if (e.matches) {
        setIsInstalled(true);
      }
    };

    mediaQuery.addEventListener("change", handleDisplayModeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleDisplayModeChange);
  }, []);

  // Listen for PWA install prompt event (also captures late-firing events)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstalled(false);
    };

    const handleAppInstalled = async () => {
      setDeferredPrompt(null);
      setIsInstalled(true);

      // Re-check with getInstalledRelatedApps for confirmation
      if (navigator.getInstalledRelatedApps) {
        try {
          const relatedApps = await navigator.getInstalledRelatedApps();
          setIsInstalled(relatedApps.length > 0);
        } catch {
          // Keep isInstalled as true since appinstalled event fired
        }
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  return {
    /** Whether the install prompt is available (app can be installed) */
    isInstallable: !!deferredPrompt && !isInstalled,
    /** Trigger the install prompt */
    install,
    /**
     * Whether the app is installed.
     * Detected via getInstalledRelatedApps API when available,
     * falls back to standalone mode detection.
     */
    isInstalled,
    /** Whether the app is currently running in standalone mode (no browser chrome) - use this for layout calculations */
    isStandalone,
  };
}
