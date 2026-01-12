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

// Extend global interfaces to include PWA-related APIs
// TODO: Remove these declarations if/when they become part of TypeScript's lib.dom.d.ts
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
  const isClient = typeof window !== "undefined";
  const mediaQuery = isClient ? window.matchMedia("(display-mode: standalone)") : null;
  
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(
      () => (isClient && window.deferredPrompt as BeforeInstallPromptEvent) ?? null
    );

  const [isInstalled, setIsInstalled] = useState(
    mediaQuery?.matches ?? false
  );

  const [isStandalone, setIsStandalone] = useState(
    mediaQuery?.matches ?? false
  );

  useEffect(() => {
    if (!isClient) return;
    
    const checkInstallation = async () => {
      if (!navigator.getInstalledRelatedApps) {
        return;
      }

      try {
        const relatedApps = await navigator.getInstalledRelatedApps();
        setIsInstalled(relatedApps.length > 0 || isStandalone);
      } catch (error) {
        console.warn("Failed to check installed apps:", error);
      }
    };

    checkInstallation();
  }, [isStandalone, isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);

      if (e.matches) {
        setIsInstalled(true);
      }
    };

    mediaQuery.addEventListener("change", handleDisplayModeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleDisplayModeChange);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstalled(false);
    };

    const handleAppInstalled = async () => {
      setDeferredPrompt(null);
      setIsInstalled(true);

      if (navigator.getInstalledRelatedApps) {
        try {
          const relatedApps = await navigator.getInstalledRelatedApps();
          setIsInstalled(relatedApps.length > 0);
        } catch {
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
  }, [isClient]);

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
    isInstallable: !!deferredPrompt && !isInstalled,
    install,
    isInstalled,
    isStandalone,
  };
}
