import theme from '@/theme'
import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

const TEXTS = {
    title: 'Caution',
    body: `Due to inherent human biases, it may seem that reports on articles aligning with our views are crafted by opponents.
    Conversely, those contradicting our beliefs might seem to be authored by allies. However, such perceptions are likely to be incorrect.
    In both scenarios, articles are subjected to critical evaluation for bias. 
    This report is the product of an AI model that is significantly less biased than human analyses and has been explicitly directed to strictly maintain 100% neutrality.
    `,
    feedback: `
    Nevertheless, the HonestyMeter is currently in an experimental stage and is continuously improving through user feedback.
    Therefore, if a report seems inaccurate, your observations could be valid. We encourage you to submit feedback, helping us enhance the accuracy and quality of our reports.
    `
}

export default function Warning() {
    return (
        <Paper sx={{ width: '100%', padding: theme.spacing(1, 3) }}>
            <Typography sx={{ color: theme.palette.warning.main, padding: 1, pointerEvents: 'none' }}>
                {TEXTS.title}: {TEXTS.body}
            </Typography>
            <Typography sx={{ color: theme.palette.warning.main, padding: 1, pointerEvents: 'none' }}>
                {TEXTS.feedback}
            </Typography>
        </Paper>
    )
}
