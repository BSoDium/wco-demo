import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  // Track whether the app is running in standalone mode (no browser chrome)
  const [isStandalone, setIsStandalone] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(display-mode: standalone)").matches;
    }
    return false;
  });

  // Track whether the app has been installed (persisted in localStorage)
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window !== "undefined") {
      // If running in standalone mode, it's definitely installed
      if (window.matchMedia("(display-mode: standalone)").matches) {
        return true;
      }
      return localStorage.getItem("isAppInstalled") === "true";
    }
    return false;
  });

  // Listen for display-mode changes (e.g., when opening in standalone vs browser)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };

    mediaQuery.addEventListener("change", handleDisplayModeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleDisplayModeChange);
  }, []);

  // Listen for PWA install prompt and installation events
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-info-bar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // If the prompt fires, it means the app is not installed
      setIsInstalled(false);
      localStorage.removeItem("isAppInstalled");
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      localStorage.setItem("isAppInstalled", "true");
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
    /** Whether the app can be installed (prompt is available and not already installed) */
    isInstallable: !!deferredPrompt && !isInstalled,
    /** Trigger the install prompt */
    install,
    /** Whether the app has been installed (persisted, used for UI like hiding install buttons) */
    isInstalled,
    /** Whether the app is currently running in standalone mode (no browser chrome) - use this for layout calculations */
    isStandalone,
  };
}
