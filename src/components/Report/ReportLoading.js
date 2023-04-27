import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import LinearBuffer from '../LinearBuffer'
import theme from '@/theme'

const TEXTS = {
    messageLine1: 'Hold Tight, The Truth Is Loading...And It\'s Worth It!',
    messageLine2: 'It may take 30-180 seconds to generate the report.',
}

export default function ReportLoading() {
    return (
        <Box sx={STYLES.container}>
            <CircularProgress />
            <LinearBuffer />
            <Typography variant="body2" color="text.secondary" sx={STYLES.loadingMessageLine}>
                {TEXTS.messageLine1}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={STYLES.loadingMessageLine}>
                {TEXTS.messageLine2}
            </Typography>

        </Box>
    )
}

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '250px',
    },
    loadingMessageLine: {
        margin: theme.spacing(0, 0, 2, 2),
        fontSize: theme.typography.fontSize * 0.875,
    },
}
