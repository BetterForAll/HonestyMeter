import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import theme from '@/theme';
import badgeFair from '../../assets/svg/BadgeFair.svg';
import badgeMedium from '../../assets/svg/BadgeMedium.svg';
import badgeHigh from '../../assets/svg/BadgeHigh.svg';
import Tooltip from '@mui/material/Tooltip';
import BadgeIcon from './BadgeIcon';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EastIcon from '@mui/icons-material/East';
import Image from 'next/image';

const TEXTS = {
    common: {
        subtitle: 'Verified by HonestyMeter',
        comment: 'experimental',
        tooltip: {
            title: 'Share Honesty Badge',
            subtitle: '- gain trust',
            subtitle2: '- support truth',
            subtitle3: '- grow engagement',
            arrow: <ArrowUpwardIcon />, //arrow up icon: 
        },
    },
    biasLevel: {
        0: {
            title: 'FAIR CONTENT',
        },
        1: {
            title: 'MEDIUM BIAS',
        },
        2: {
            title: 'HIGH BIAS',
            // subtitle: 'Cheked by HonestyMeter',
        },
    }
}

const TooltipContent = ({ title, subtitle, subtitle2, subtitle3, arrow }) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            {/* <BadgeIcon width="100px" height="100px" color='black' /> */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1) }}>
                <Typography >
                    {arrow}
                </Typography>
                <Typography >
                    {title}
                </Typography>
            </Box>
            {
                subtitle &&
                <>
                    <Typography >
                        {subtitle}
                    </Typography>
                    <Typography>
                        {subtitle2}
                    </Typography>
                    <Typography >
                        {subtitle3}
                    </Typography>
                </>
            }
        </Box >
    )
}

const SETTINGS = {
    0: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[0] },
        color: theme.palette.success.main,
        secondaryColor: '#CFF09E',
        icon: '/badge_fair.svg'
    },
    1: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[1] },
        color: theme.palette.warning.main,
        secondaryColor: '#fdd585',
        icon: '/badge_medium.svg',
    },
    2: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[2] },
        color: theme.palette.error.main,
        secondaryColor: '#ffe5ea',
        icon: '/badge_high.svg',
    },
    3: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[2] },
        color: theme.palette.primary.main,
        secondaryColor: '#8f9bd76b',
        icon: '/badge.svg'
    },
    4: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[2] },
        color: theme.palette.secondary.main,
        secondaryColor: '#c0d9d7',
    },
    5: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[2] },
        color: '#888',
        secondaryColor: 'white',
    },
}

export default function Badge({
    size = 1,
    biasLevel = 0,
    showTitle,
    showSubtitle,
    showComment,
    showBadgeName,
    height = "100px",
    width = "100px",
    fadeTimeout = 1000,
    showTooltipOnLoad = false,
    showFullTooltip = false,
}) {
    const { color, secondaryColor, texts, icon } = SETTINGS[biasLevel];
    const { title, subtitle, comment, tooltip } = texts;
    const shownTooltip = showFullTooltip ? tooltip : { title: tooltip.title, arrow: tooltip.arrow };
    const [isTooltipOpen, setTooltipOpen] = useState(showTooltipOnLoad);
    const isTimeout = Boolean(fadeTimeout);



    const openTooltip = () => {
        setTooltipOpen(true);
    }

    const closeTooltip = () => {
        setTooltipOpen(false);
    }

    useEffect(() => {
        // Timer to hide tooltip after 3 seconds
        // const timeOpen = setTimeout(() => {
        //     setTooltipOpen(true);
        // }, 3000);

        const timerClose = setTimeout(() => {
            setTooltipOpen(false);
        }, 5000);

        return () => {
            // clearTimeout(timeOpen);
            clearTimeout(timerClose);
        }
    }, []);

    const badgeContent = <Tooltip title={< TooltipContent {...shownTooltip} />} placement='bottom' open={isTooltipOpen} onMouseEnter={openTooltip} onMouseLeave={closeTooltip}>
        <Box sx={STYLES.container(size, color)}>
            <Image src={icon} alt="Balance Icon" style={STYLES.icon} width={140} height={140} /> {/* may be used in sharing page for authors and publishers */}
            {/* <BadgeIcon width={width} height={height} color={color} secondaryColor={secondaryColor} showBadgeName={showBadgeName} /> */}
            {/* {
                showTitle &&
                <Typography sx={STYLES.title}>
                    {title}
                </Typography>
            }
            {
                showSubtitle &&
                <Typography sx={STYLES.subtitle}>
                    {subtitle}
                </Typography>
            }
            {
                showComment &&
                <Typography sx={STYLES.comment}>
                    *{comment}
                </Typography>
                </Typography>
            } */}
        </Box>
    </Tooltip >

    return (
        isTimeout ?
            <Fade in={true} timeout={fadeTimeout} sx={STYLES.container(size, color)}>
                {badgeContent}
            </Fade >
            :
            badgeContent
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
        color,
        cursor: 'pointer',
        textDecoration: 'none',
        '& svg': {
            boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.0)',
            border: '0px solid #fff',
            borderRadius: '50%',
            margin: theme.spacing(0, 0, 0.5, 0),
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
                // boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                // transform: `scale(${size + 0.02})`,
                // transition: 'box-shadow 0.2s ease-in-out',
                // transition: 'transform 0.2s ease-in-out',
            }
        }
    }),
    iconContainer: {
        height: '110px',
    },
    icon: {

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