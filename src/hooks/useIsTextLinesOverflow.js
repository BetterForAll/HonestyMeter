import { useState, useEffect, useRef } from 'react';
import { isTextLinesOverFlow } from '@/utils/utils';

export default function useIsTextLinesOverFlow(elRef) {
    const [isTextOverFlow, setIsTextOverflow] = useState(false);
    const resizeObserverRef = useRef(
        new ResizeObserver((observerEntries) => {
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
    }, [elRef, resizeObserverRef]);

    return isTextOverFlow;
}

