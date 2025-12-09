import React, { useEffect, useState, useRef } from 'react';
import { getRandom } from '@/utils/utils';

const INTERVAL_DELAY = 500;

export default function LinearBuffer() {
    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(10);
    const progressRef = useRef<() => void>(() => { });

    const moveProgressBar = () => {
        if (progress > 100) {
            setProgress(0);
            setBuffer(10);
        } else {
            const diff = getRandom(10);
            const diff2 = getRandom(10);
            setProgress(progress + diff);
            setBuffer(progress + diff + diff2);
        }
    };

    useEffect(() => {
        progressRef.current = moveProgressBar;
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, INTERVAL_DELAY);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="w-full p-4">
            <div className="relative h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                {/* Buffer */}
                <div 
                    className="absolute h-full bg-indigo-200 transition-all duration-300"
                    style={{ width: `${Math.min(buffer, 100)}%` }}
                />
                {/* Progress */}
                <div 
                    className="absolute h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>
        </div>
    );
}