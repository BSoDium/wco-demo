![WCO Demo Preview](public/android-chrome-192x192.png)
# Window Controls Overlay (WCO) Demo

A comprehensive, SEO-optimized experiment showcasing the **Window Controls Overlay API** in a modern Progressive Web App (PWA).



## Introduction

The [**Window Controls Overlay (WCO) API**](https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API) is a powerful feature for Desktop PWAs that allows developers to reclaim the title bar area of the application window. By default, installed PWAs have a standard title bar that takes up vertical space. WCO allows your application content to cover the entire window surface—including the title bar—leaving only the critical window controls (close, maximize, minimize) as an overlay.

Despite its potential to create native-like experiences (similar to VS Code, Spotify, or Discord), there are **surprisingly few open-source demos** or comprehensive guides on how to implement it effectively in a React application.

**This project aims to fill that gap.** It serves as a case study and a reference implementation for building a polished, production-ready title bar experience that adapts seamlessly to the WCO environment.

## Inspiration

The design and interaction model of this demo are heavily inspired by the **Vercel Dashboard toolbar**. We aimed to replicate that premium, fluid feel:

-   **Collapsing Header:** The navigation bar smoothly collapses and expands based on scroll direction.
-   **Scroll Thresholds:** To prevent jittery movement, we implemented a "hysteresis" or threshold system. The navbar doesn't snap immediately; it waits for a deliberate scroll action.
-   **Blur & Translucency:** Using modern CSS filters to create a glass-morphism effect that feels native on macOS and Windows.

## Techniques & implementation

This project demonstrates several advanced frontend techniques:

### 1. Window Controls Overlay Integration
The core of the project is the integration with the WCO API.
-   **Manifest Configuration:** We configure `display_override: ["window-controls-overlay"]` in the Web App Manifest (via `vite-plugin-pwa`).
-   **Geometry Tracking:** The custom hook `useTitleBarRect` listens for the `geometrychange` event. This ensures that if the user resizes the window or changes the system text scaling, our UI knows exactly where the native window controls are located and avoids overlapping them.

```typescript
// Simplified logic from src/hooks/useTitleBarRect.ts
const wco = navigator.windowControlsOverlay;
wco.addEventListener("geometrychange", () => {
  setRect(wco.getTitlebarAreaRect());
});
```

### 2. Scroll-Linked Animations (Framer Motion)
We use **Framer Motion** (`motion/react`) to handle the complex physics of the navigation bar.
-   **Performance:** Animations are driven by `useMotionValue` and `useTransform` to run outside the React render cycle where possible.
-   **Smart Collapsing:** The `useNavigationScroll` hook implements a buffer system. Scrolling down doesn't hide the navbar immediately; it requires a specific pixel threshold (e.g., 100px) to trigger the collapse, preventing accidental hiding during small adjustments.

### 3. Adaptive Layout Strategy
The `NavigationBar` component is "environment-aware":
-   **Browser Tab:** It renders a standard header.
-   **Installed PWA:** It themes the title bar dynamically and adjusts padding to blend with it.
-   **Installed PWA with Window Controls Overlay:** It extends and collapses into the title bar area, adding necessary padding to avoid overlap with native controls.

## Running the demo locally

### Prerequisites
-   Node.js (v18 or later recommended)
-   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/BSoDium/wco-demo.git
    cd wco-demo
    ```

2.  Install dependencies:
    ```bash
    yarn
    ```

3.  Start the development server:
    ```bash
    yarn dev
    ```

4.  **Test the PWA:**
    -   Open the app in Chrome or Edge.
    -   Click the "Install" icon in the address bar.
    -   Launch the installed app to see the Window Controls Overlay in action.

## Tech Stack

-   **Framework:** [React 19](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **PWA Support:** [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
-   **Styling:** [MUI Joy UI](https://mui.com/joy-ui/getting-started/) & [Emotion](https://emotion.sh/)
-   **Animations:** [Motion](https://motion.dev/) (formerly Framer Motion)
-   **Icons:** [Iconify](https://iconify.design/) (Lucide & HugeIcons)

## License

MIT License. Feel free to use this code as a foundation for your own PWA projects!