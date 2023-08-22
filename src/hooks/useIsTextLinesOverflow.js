import { useState, useEffect, useRef } from "react";
import { isServer, isTextLinesOverFlow } from "@/utils/utils";

export default function useIsTextLinesOverFlow(elRef) {
  const [isTextOverFlow, setIsTextOverflow] = useState(false);
  const isServerSide = isServer();
  const resizeObserverRef = useRef(
    isServerSide
      ? null
      : new ResizeObserver((observerEntries) => {
          const isOverflow = isTextLinesOverFlow(observerEntries[0].target);
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
