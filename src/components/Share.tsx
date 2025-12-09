"use client";

import React, { MouseEvent } from 'react'
import va from '@vercel/analytics';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from 'react-share';
import { EVENT } from '@/constants/constants';

const SHARE_PLATFORM_NAMES = {
    linkedIn: 'LinkedIn',
    twitter: 'Twitter',
    facebook: 'Facebook',
} as const;

const CONTEXT_OPTIONS = {
    app: { name: 'app', title: 'HonestyMeter' },
    report: { name: 'report', title: 'Report' },
} as const;

const TEXTS = {
    title: 'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
    ctaLineOne: 'Spread the Truth',
    getCtaLineTwo: (context: string) => {
      const option = Object.values(CONTEXT_OPTIONS).find(opt => opt.name === context);
      return `Share ${option ? option.title : 'HonestyMeter'}!`;
    },
}

const DEFAULT_HASH_TAGS = ['HonestyMeter', 'MediaBias', 'FakeNews'];

export interface ShareProps {
    title?: string;
    url?: string;
    description?: string;
    hashTags?: string[];
    context?: string;
    showCtaLine1?: boolean;
    showCtaLine2?: boolean;
}

export default function Share({
    title = '',
    url = '',
    description = '',
    hashTags = DEFAULT_HASH_TAGS,
    context = CONTEXT_OPTIONS.app.name,
    showCtaLine1 = true,
    showCtaLine2 = true
}: ShareProps) {
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    return (
        <div className="w-full flex flex-col justify-center items-center text-center">
            <CTA context={context} showCtaLine1={showCtaLine1} showCtaLine2={showCtaLine2} />
            <div className="flex justify-center items-center gap-4" onClick={handleClick}>
                <TwitterShareButton
                    url={url}
                    title={title}
                    hashtags={hashTags}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.twitter)}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton
                    url={url}
                    title={title}
                    summary={description}
                    source={TEXTS.title}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.linkedIn)}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <FacebookShareButton
                    url={url}
                    hashtag={DEFAULT_HASH_TAGS[0]}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.facebook)}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </div>
        </div>
    )
}

const fireAnalyticsEvent = (platform: string) => () => {
    const eventName = EVENT.shareReport(platform)
    va.track(eventName)
}

interface CTAProps {
    context: string;
    showCtaLine1: boolean;
    showCtaLine2: boolean;
}

function CTA({ context, showCtaLine1, showCtaLine2 }: CTAProps) {
    return (
        <div className="text-gray-500 text-lg mb-4">
            {showCtaLine1 && (
                <h3 className="mb-2 text-xl font-normal">
                    {TEXTS.ctaLineOne}
                </h3>
            )}
            {showCtaLine2 && (
                <h3 className="font-normal">
                    {TEXTS.getCtaLineTwo(context)}
                </h3>
            )}
        </div>
    )
}
