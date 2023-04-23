import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import theme from '@/theme';
import { getRandom } from '@/utils/utils';

const INTERVAL_DELAY = 500;

export default function LinearBuffer() {
    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(10);
    const progressRef = useRef();

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
        <Box sx={STYLES.container}>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
        </Box>
    );
}

const STYLES = {
    container: {
        width: '100%',
        padding: theme.spacing(4),
    }
}