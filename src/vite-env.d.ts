/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/react" />

// TODO: Remove this once Window Controls Overlay is more widely supported
interface WindowControlsOverlay extends EventTarget {
  visible: boolean;
  getTitlebarAreaRect(): DOMRect;
}

interface Navigator {
  windowControlsOverlay?: WindowControlsOverlay;
}
