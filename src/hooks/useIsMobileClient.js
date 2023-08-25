import { useState, useEffect } from 'react';

const DEFAULT_BREAK_POINT = 768;

const useIsMobileClient = (breakpoint = DEFAULT_BREAK_POINT) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkMobile = () => {
                setIsMobile(window.innerWidth <= breakpoint);
            };

            checkMobile();
            window.addEventListener('resize', checkMobile);

            return () => {
                window.removeEventListener('resize', checkMobile);
            };
        }
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobileClient;
