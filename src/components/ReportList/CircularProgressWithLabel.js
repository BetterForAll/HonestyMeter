import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { number, string } from 'prop-types';

export default function CircularProgressWithLabel({ value = 50, color = 'green' }) {
    return (
        <Box sx={STYLES.container}>
            <CircularProgress value={value} sx={STYLES.circularProgress(color)} variant="determinate" />
            <Box sx={STYLES.valueContainer}>
                <Typography variant="caption" component="div" sx={{ color }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    value: number,
    color: string,
}

const STYLES = {
    container: {
        position: 'relative',
        display: 'inline-flex'
    },
    circularProgress: (color) => ({
        color,
        transform: 'scale(0.8) rotate(-90deg) !important'
    }),
    valueContainer: {
        top: 2,
        left: 0,
        bottom: 0,
        right: 2,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

