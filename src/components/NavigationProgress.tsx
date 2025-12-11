"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  speed: 400,
  trickleSpeed: 200,
});

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When route changes, stop the progress bar
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}

// Hook to manually control NProgress from Link clicks
export function useNavigationProgress() {
  const start = () => NProgress.start();
  const done = () => NProgress.done();
  
  return { start, done };
}
