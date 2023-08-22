import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

//TODO: Improve page loading logic - optionally: migrate to "app" folder [new Next.js feature]

function usePageLoadingFull() {
  const [isLoading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      timeoutRef.current = setTimeout(() => setLoading(true), 200);
    };

    const handleComplete = () => setLoading(false);

    setLoading(!router.isReady);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [router]);

  return isLoading;
}

export default usePageLoadingFull;
