import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function usePageLoading(): boolean {
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(!router.isReady);
  }, [router]);

  return isLoading;
}

export default usePageLoading;
