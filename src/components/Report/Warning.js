import theme from '@/theme'
import { Box, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const TEXTS = {
    title: 'Caution',
    body: `Due to inherent human biases, it may seem that reports on articles aligning with our views are crafted by opponents. 
    Conversely, reports about articles that contradict our beliefs might seem to be authored by allies.
    However, such perceptions are likely to be incorrect. 
    These impressions can be caused by the fact that in both scenarios, articles are subjected to critical evaluation. 
    This report is the product of an AI model that is significantly less biased than human analyses
    and has been explicitly instructed to strictly maintain 100% neutrality.
    `,
    feedbackPart1: `
    Nevertheless, the HonestyMeter is continuously improving through user feedback.
    If the report seems inaccurate, we encourage you to`,
    feedbackPart2: `
    to improve it.`,
    submitFeedback: 'submit feedback',
}

export default function Warning() {
    return (
        <Paper sx={STYLES.paper} >
            <Typography sx={STYLES.paragraph}>
                {TEXTS.title}! {TEXTS.body}
            </Typography>
            <Typography sx={STYLES.paragraph}>
                {TEXTS.feedbackPart1} <Link href="" style={{ textDecoration: 'none' }} >{TEXTS.submitFeedback}</Link> {TEXTS.feedbackPart2}
            </Typography>
        </Paper>
    )
}

const STYLES = {
    paper: {
        width: '100%',
        padding: theme.spacing(1, 3),
        color: theme.palette.primary.dark,
        fontSize: theme.typography.fontSize,
    },
    paragraph: {
        padding: 1,
        fontSize: 'inherit'
    }
}
