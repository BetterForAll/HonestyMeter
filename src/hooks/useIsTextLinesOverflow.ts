import { useState, useEffect, useRef, RefObject } from "react";
import { isServer, isTextLinesOverFlow } from "@/utils/utils";

export default function useIsTextLinesOverFlow(elRef: RefObject<HTMLElement | null>) {
  const [isTextOverFlow, setIsTextOverflow] = useState(false);
  const isServerSide = isServer();
  const resizeObserverRef = useRef<ResizeObserver | null>(
    isServerSide
      ? null
      : new ResizeObserver((observerEntries: ResizeObserverEntry[]) => {
          const isOverflow = isTextLinesOverFlow(observerEntries[0].target as HTMLElement);
          setIsTextOverflow(isOverflow);
        })
  );

  useEffect(() => {
    const resizeObserverRefCurrent = resizeObserverRef?.current;
    const elRefCurrent = elRef?.current;

    if (elRefCurrent) {
      resizeObserverRefCurrent?.observe(elRefCurrent);
    }

    return () => {
      if (elRefCurrent) {
        resizeObserverRefCurrent?.unobserve(elRefCurrent);
      }
    };
  }, [elRef, resizeObserverRef, isServerSide]);

  return isTextOverFlow;
}
