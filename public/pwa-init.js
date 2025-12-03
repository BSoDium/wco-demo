// Capture beforeinstallprompt immediately
// This script must be loaded synchronously in the head to ensure we don't miss the event
window.deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
});
