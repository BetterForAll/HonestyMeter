import React from 'react'
import { Typography, Paper } from '@mui/material';
import { PAYPAL_DONATE_URL } from '@/constants/constants';
import theme from '@/theme';
import Link from '@mui/material/Link'

export default function Support() {
    return (
        <Paper elevation={2} sx={STYLES.paper}>
            <Typography variant="h4" sx={STYLES.title}>{TEXTS.title}</Typography>
            <Typography variant="body2" sx={STYLES.paragraph}>
                {TEXTS.paragraph1}
            </Typography>
            <Typography variant="body2" sx={STYLES.paragraph}>
                {TEXTS.paragraph2}
            </Typography>
            <Typography variant="body2" sx={STYLES.cta}>
                {'💡 '}
                <Link href={PAYPAL_DONATE_URL} sx={STYLES.cta} >
                    {TEXTS.cta}
                </Link>
            </Typography>
        </Paper>
    )
}

const STYLES = {
    paper: {
        padding: theme.spacing(4),
        margin: `0 auto ${theme.spacing(4)} auto`,
        maxWidth: '1000px',
        color: theme.palette.text.primary,
    },
    title: {
        fontSize: theme.typography.fontSize * 1.5,
        marginBottom: theme.spacing(2),
    },
    paragraph: {
        fontSize: theme.typography.fontSize * 1.125,
        marginBottom: theme.spacing(2),
    },
    cta: {
        textDecoration: 'none',
        fontSize: theme.typography.fontSize * 1.125,
    },
}

const TEXTS = {
    title: 'Empower Truth with Your Support 🌟',
    paragraph1: `HonestyMeter is dedicated to promoting accuracy and objectivity in the vast world of online content.
                By supporting our mission, you become an essential part of the movement
                to foster transparency and credibility across the internet.`,
    paragraph2: `Your generous contribution enables us to continue developing
                our innovative tool, refining our algorithms, and ensuring that
                truth prevails in the digital age. Join our community of
                truth-seekers and make a lasting impact on the future of information sharing.
    `,
    cta: 'Click here to support HonestyMeter and help us build a more honest and informed world together'
}



