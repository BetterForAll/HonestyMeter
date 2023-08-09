import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function usePageLoading() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        router.isReady && setIsLoading(false);
    }, [router.isReady]);

    return isLoading;
}

export default usePageLoading;