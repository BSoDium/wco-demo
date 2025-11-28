import { useEffect, useState } from "react";

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

