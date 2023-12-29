import React from 'react';
import { Box, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import theme from '@/theme';
import badgeFair from '../../assets/svg/BadgeFair.svg';
import badgeMedium from '../../assets/svg/BadgeMedium.svg';
import badgeHigh from '../../assets/svg/BadgeHigh.svg';
import Tooltip from '@mui/material/Tooltip';
import BadgeIcon from './BadgeIcon';


const TEXTS = {
    biasLevel: {
        0: {
            title: 'FAIR CONTENT',
            subtitle: 'HonestyMeter',
            comment: 'experimental',
            tooltip: 'Share Honesty Badge'
        },
        1: {
            title: 'MEDIUM BIAS',
            subtitle: 'HonestyMeter',
            comment: 'experimental',
            tooltip: 'Share Honesty Badge'
        },
        2: {
            title: 'HIGH BIAS',
            subtitle: 'HonestyMeter',
            // subtitle: 'Cheked by HonestyMeter',
            comment: 'experimental',
            tooltip: 'Share Honesty Badge'
        },
    }
}

const SETTINGS = {
    0: {
        texts: TEXTS.biasLevel[0],
        color: theme.palette.success.main,
        secondaryColor: '#CFF09E',
        icon: badgeFair,
    },
    1: {
        texts: TEXTS.biasLevel[1],
        color: theme.palette.warning.main,
        secondaryColor: '#fdd585',
        icon: badgeMedium,
    },
    2: {
        texts: TEXTS.biasLevel[2],
        color: theme.palette.error.main,
        secondaryColor: '#ffe5ea',
        icon: badgeHigh,
    }
}

export default function Badge({ size = 1, biasLevel = 0, showTitle, showSubtitle, showComment, showBadgeName }) {
    const { texts, color, secondaryColor, icon } = SETTINGS[biasLevel];

    return (
        <Fade in={true} timeout={1000} sx={STYLES.container(size, color)}>
            <Tooltip title={texts.tooltip} placement="top">
                <Box sx={STYLES.container(size, color)}>
                    {/* <Image src={icon} alt="Balance Icon" style={STYLES.icon} /> */}
                    <BadgeIcon width="100px" height="100px" color={color} secondaryColor={secondaryColor} showBadgeName={showBadgeName} />
                    {
                        showTitle &&
                        <Typography sx={STYLES.title}>
                            {texts.title}
                        </Typography>
                    }
                    {
                        showSubtitle &&
                        <Typography sx={STYLES.subtitle}>
                            {texts.subtitle}
                        </Typography>
                    }
                    {
                        showComment &&
                        <Typography sx={STYLES.comment}>
                            *{texts.comment}
                        </Typography>
                    }
                </Box>
            </Tooltip>
        </Fade>
    )
}

const STYLES = {
    container: (size, color) => ({
        // height: '131px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${size})`,
        margin: theme.spacing(0, 0, 1),
        padding: theme.spacing(0.5, 0, 0),
        color,
        cursor: 'pointer',
        '& svg': {
            // boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)',
            // border: '2px solid #fff'
            // borderRadius: '50%',
        },
        // padding: theme.spacing(0, 0.5),
        // borderRadius: '10px',

        '&:hover': {
            // transform: `scale(${size + 0.1})`,
            // transition: 'transform 0.3s ease-in-out',
            // border: '2px solid #fff',
            // boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
            // transition: 'box-shadow 0.2s ease-in-out',
            color,

            '& svg': {
                // boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                // transform: `scale(${size + 0.1})`,
                // transition: 'box-shadow 0.2s ease-in-out',
                // transition: 'transform 0.2s ease-in-out',
            }
        }
    }),
    iconContainer: {
        height: '110px',
    },
    icon: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
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