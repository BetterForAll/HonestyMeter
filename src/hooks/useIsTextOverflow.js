import { useState, useEffect, useRef } from 'react';

export default function useIsTextOverFlow(elRef) {
    const [isTextOverFlow, setIsTextOverflow] = useState(false);
    const resizeObserverRef = useRef(
        new ResizeObserver((observerEntries) => {
            const isOverflow = checkIsTextOverflow(observerEntries[0].target);
            setIsTextOverflow(isOverflow);
        })
    );

    useEffect(() => {
        const resizeObserverRefCurrent = resizeObserverRef.current;
        const elRefCurrent = elRef.current;

        if (elRefCurrent) {
            resizeObserverRefCurrent.observe(elRefCurrent);
        }

        return () => {
            resizeObserverRefCurrent.unobserve(elRefCurrent);
        };
    }, [elRef, resizeObserverRef]);

    return isTextOverFlow;
}

const checkIsTextOverflow = (el) => el.clientWidth < el.scrollWidth;