import { useEffect, useState } from "react";

/**
 * React hook that observes and returns the current document title.
 *
 * This hook uses a MutationObserver to track changes to the <title> element in the document head.
 * It updates the returned `title` value whenever the document's title changes.
 *
 * @returns {{ title: string }} An object containing the current document title.
 *
 * @remarks
 * - If the <title> element is missing from the document, the hook will not observe changes.
 * - The hook only observes changes to the <title> element, not direct assignments to document.title
 *   unless they also update the <title> element.
 */
export function usePageTitle() {
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    const titleElement = document.querySelector("title");
    
    // If no title element exists, we can't observe it.
    // However, document.title might still work if created dynamically, 
    // but usually <title> exists in index.html
    if (!titleElement) return;

    const observer = new MutationObserver(() => {
      setTitle(document.title);
    });

    observer.observe(titleElement, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, []);

  return { title };
}

