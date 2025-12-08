import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUp, ArrowDown } from 'lucide-react';
import useIsMobileClient from '@/hooks/useIsMobileClient';
import BadgeIcon from './BadgeIcon';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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

    const [isTooltipOpen, setTooltipOpen] = useState(showTooltipOnLoad);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timerClose = setTimeout(() => {
            setTooltipOpen(false);
        }, 5000);

        return () => clearTimeout(timerClose);
    }, []);

    const handleMouseEnter = () => {
        if (!hideTooltip) setTooltipOpen(true);
    };

    const handleMouseLeave = () => {
        setTooltipOpen(false);
    };

    const badgeContent = (
        <div 
            className={cn(
                "flex flex-col justify-center items-center cursor-pointer no-underline transition-opacity duration-1000",
                isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ 
                transform: `scale(${size})`,
                color: typeof color === 'string' ? color : undefined
            }}
        >
            {isMenu ? (
                <BadgeIcon width={width} height={height} color={color} secondaryColor={secondaryColor} showBadgeName={showBadgeName} />
            ) : (
                <Image src={icon} alt="Balance Icon" className="" width={140} height={140} />
            )}

            {isMenu && (
                <>
                    {showTitle && <span className="text-sm font-bold">{title}</span>}
                    {showSubtitle && <span className="text-xs">{subtitle}</span>}
                    {showComment && <span className="text-xs italic">*{comment}</span>}
                </>
            )}
        </div>
    );
    
    // If tooltip is disabled
    if (hideTooltip) return badgeContent;

    return (
        <TooltipProvider>
            <Tooltip open={isTooltipOpen} onOpenChange={setTooltipOpen}>
                <TooltipTrigger asChild onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {badgeContent}
                </TooltipTrigger>
                <TooltipContent side={tooltipPlacement} className="text-center p-2">
                    <TooltipContentBody 
                        tooltip={tooltip}
                        showFullTooltip={showFullTooltip}
                        tooltipPlacement={tooltipPlacement}
                    />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

const TooltipContentBody = ({ tooltip, showFullTooltip, tooltipPlacement }) => {
    const ArrowIcon = tooltipPlacement === 'bottom' ? ArrowUp : ArrowDown;
    const arrow = <ArrowIcon className="w-4 h-4 mx-auto" />;

    if (!showFullTooltip) {
        return (
            <div className="flex flex-col gap-1">
                {tooltipPlacement === 'bottom' && arrow}
                <span>{tooltip.title}</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            {tooltipPlacement === 'bottom' && arrow}
            <span>{tooltip.title}</span>
            <span>{tooltip.subtitle}</span>
            <span>{tooltip.subtitle2}</span>
            <span>{tooltip.subtitle3}</span>
            {tooltipPlacement === 'top' && arrow}
        </div>
    );
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
        },
    },
    biasLevel: {
        0: { title: 'FAIR CONTENT' },
        1: { title: 'MEDIUM BIAS' },
        2: { title: 'HIGH BIAS' },
    }
}

const SETTINGS = {
    0: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[0] },
        color: '#2e7d32', // success.main
        secondaryColor: '#CFF09E',
        icon: '/badge_fair.svg'
    },
    1: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[1] },
        color: '#ed6c02', // warning.main
        secondaryColor: '#fdd585',
        icon: '/badge_medium.svg',
    },
    2: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[2] },
        color: '#d32f2f', // error.main
        secondaryColor: '#ffe5ea',
        icon: '/badge_high.svg',
    },
    3: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[2] },
        color: '#1976d2', // primary.main
        secondaryColor: '#8f9bd76b',
        icon: '/badge.svg'
    },
    4: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[2] },
        color: '#9c27b0', // secondary.main
        secondaryColor: '#c0d9d7',
    },
    5: {
        texts: { ...TEXTS.common, ...TEXTS.biasLevel[2] },
        color: '#888',
        secondaryColor: 'white',
    },
}
