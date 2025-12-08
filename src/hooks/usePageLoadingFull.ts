"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Migrated to App Router - uses pathname/searchParams instead of router.events

function usePageLoadingFull(): boolean {
  const [isLoading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Skip loading state on first render (page is already loaded)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // When pathname or searchParams change, briefly show loading
    setLoading(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Hide loading after a short delay (navigation in App Router is fast)
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, searchParams]);

  return isLoading;
}

export default usePageLoadingFull;
