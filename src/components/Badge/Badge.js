import React from 'react';
import { Box, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import theme from '@/theme';
import badgeFair from '../../assets/svg/BadgeFair.svg';
import badgeMedium from '../../assets/svg/BadgeMedium.svg';
import badgeHigh from '../../assets/svg/BadgeHigh.svg';
import Image from 'next/image';


const TEXTS = {
    biasLevel: {
        0: {
            title: 'FAIR CONTENT',
            subtitle: 'Verified by HonestyMeter',
            comment: 'experimental'
        },
        1: {
            title: 'MEDIUM BIAS',
            subtitle: 'Cheked by HonestyMeter',
            comment: 'experimental'
        },
        2: {
            title: 'HIGH BIAS',
            subtitle: 'Cheked by HonestyMeter',
            comment: 'experimental'
        },
    }
}

const SETTINGS = {
    0: {
        texts: TEXTS.biasLevel[0],
        color: theme.palette.success.main,
        icon: badgeFair,
    },
    1: {
        texts: TEXTS.biasLevel[1],
        color: theme.palette.warning.main,
        icon: badgeMedium,
    },
    2: {
        texts: TEXTS.biasLevel[2],
        color: theme.palette.error.main,
        icon: badgeHigh,
    }
}

export default function Badge({ size = 1, biasLevel = 0 }) {
    const { texts, color, icon } = SETTINGS[biasLevel];

    return (
        <Fade in={true} timeout={1000} sx={STYLES.container(size, color)}>
            <Box sx={STYLES.container(size, color)}>
                <Image src={icon} alt="Balance Icon" style={STYLES.icon} />
                <Typography sx={STYLES.title}>
                    {texts.title}
                </Typography>
                <Typography sx={STYLES.subtitle}>
                    {texts.subtitle}
                </Typography>
                <Typography sx={STYLES.comment}>
                    *{texts.comment}
                </Typography>
            </Box>
        </Fade>
    )
}

const STYLES = {
    container: (size, color) => ({
        height: '131px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${size})`,
        margin: theme.spacing(1, 0),
        color,
    }),
    icon: {
        width: '60px',
        height: '60px',
        marginBottom: theme.spacing(0.5)
    },
    title: {
        fontSize: theme.typography.fontSize * 0.875,
        fontWeight: theme.typography.fontWeightBold
    },
    subtitle: {
        fontSize: theme.typography.fontSize * 0.75
    },
    comment: {
        fontSize: theme.typography.fontSize * 0.75,
        fontStyle: 'italic'
    }
}