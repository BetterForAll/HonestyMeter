import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import theme from '@/theme';
import Tooltip from '@mui/material/Tooltip';
import BadgeIcon from './BadgeIcon';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Image from 'next/image';
import useIsMobileClient from '@/hooks/useIsMobileClient';

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
    isMenu = false,
    isTooltipShownOnDesktop = false,
    tooltipPlacement = 'bottom',
}) {
    const { color, secondaryColor, texts, icon } = SETTINGS[biasLevel];
    const { title, subtitle, comment, tooltip } = texts;
    const isMobile = useIsMobileClient();
    const hideTooltip = !isTooltipShownOnDesktop || isMobile;
    const toolTipContentProps = getToolTipContentProps(showFullTooltip, tooltip, isMobile, tooltipPlacement);
    const tooltipTitle = isMobile ? null : < TooltipContent {...toolTipContentProps} isMobile={isMobile} tooltipPlacement={tooltipPlacement} />;
    const [isTooltipOpen, setTooltipOpen] = useState(showTooltipOnLoad);
    const isTimeout = Boolean(fadeTimeout);

    const openTooltip = () => {
        if (hideTooltip) return;

        setTooltipOpen(true);
    }

    const closeTooltip = () => {
        setTooltipOpen(false);
    }

    useEffect(() => {
        const timerClose = setTimeout(() => {
            setTooltipOpen(false);
        }, 5000);

        return () => {
            clearTimeout(timerClose);
        }
    }, []);

    const badgeContent = (
        <Tooltip
            title={tooltipTitle}
            placement={tooltipPlacement}
            open={isTooltipOpen}
            onMouseEnter={openTooltip} onMouseLeave={closeTooltip}>
            <Box sx={STYLES.container(size, color)}>

                {
                    isMenu ?
                        <BadgeIcon width={width} height={height} color={color} secondaryColor={secondaryColor} showBadgeName={showBadgeName} />
                        :
                        <Image src={icon} alt="Balance Icon" style={STYLES.icon} width={140} height={140} />
                }


                {
                    isMenu &&
                    <>
                        {
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
                        }
                    </>
                }
            </Box>
        </Tooltip >
    )

    return (
        isTimeout ?
            <Fade in={true} timeout={fadeTimeout} sx={STYLES.container(size, color)}>
                {badgeContent}
            </Fade >
            :
            badgeContent
    )
}

const TooltipContent = ({ title, subtitle, subtitle2, subtitle3, arrow, isMobile, tooltipPlacement }) => {
    if (isMobile) {
        return null;
    }

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1) }}>
                {
                    tooltipPlacement === 'bottom' &&
                    <Typography >
                        {arrow}
                    </Typography>
                }
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
                    {
                        tooltipPlacement === 'top' &&
                        <Typography >
                            {arrow}
                        </Typography>
                    }
                </>
            }
        </Box >
    )
}

const TEXTS = {
    common: {
        subtitle: 'Verified by HonestyMeter',
        comment: 'experimental',
        tooltip: {
            title: 'Share Honesty Badge',
            subtitle: '- gain trust',
            subtitle2: '- support truth',
            subtitle3: '- grow engagement',
            arrowUp: <ArrowUpwardIcon />,
            arrowDown: <ArrowDownwardIcon />,
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
        },
    }
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

const STYLES = {
    container: (size, color) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${size})`,
        color,
        cursor: 'pointer',
        textDecoration: 'none',
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

function getToolTipContentProps(showFullTooltip, tooltip, isMobile, tooltipPlacement) {
    const arrow = tooltipPlacement === 'bottom' ? tooltip.arrowUp : tooltip.arrowDown;

    if (isMobile) {
        return null;
    }

    return showFullTooltip ? { ...tooltip, arrow } : { title: tooltip.title, arrow };
}
