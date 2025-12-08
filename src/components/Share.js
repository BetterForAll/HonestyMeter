"use client";

import React from 'react'
import va from '@vercel/analytics';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from 'react-share';
import { string, number, node, arrayOf, oneOf, bool } from 'prop-types';
import { EVENT } from '@/constants/constants';

const SHARE_PLATFORM_NAMES = {
    linkedIn: 'LinkedIn',
    twitter: 'Twitter',
    facebook: 'Facebook',
}

const CONTEXT_OPTIONS = {
    app: { name: 'app', title: 'HonestyMeter' },
    report: { name: 'report', title: 'Report' },
}

const TEXTS = {
    title: 'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
    ctaLineOne: 'Spread the Truth',
    getCtaLineTwo: (context) => `Share ${CONTEXT_OPTIONS[context].title}!`,
}

const DEFAULT_HASH_TAGS = ['HonestyMeter', 'MediaBias', 'FakeNews'];

export default function Share({
    title,
    url,
    description,
    hashTags,
    context = CONTEXT_OPTIONS.app.name,
    showCtaLine1 = true,
    showCtaLine2 = true
}) {
    const handleClick = (e) => {
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
                    quote={title}
                    hashtag={DEFAULT_HASH_TAGS[0]}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.facebook)}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </div>
        </div>
    )
}

Share.propTypes = {
    CTA: node,
    articleTitle: string,
    shareUrl: string,
    score: number,
    sideNames: arrayOf(string),
    explanation: string,
    hashTags: arrayOf(string),
    context: oneOf([CONTEXT_OPTIONS.app.name, CONTEXT_OPTIONS.report.name]),
    showCtaLine1: bool,
    showCtaLine2: bool,
}

const fireAnalyticsEvent = (platform) => () => {
    const eventName = EVENT.shareReport(platform)
    va.track(eventName)
}

function CTA({ context, showCtaLine1, showCtaLine2 }) {
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
