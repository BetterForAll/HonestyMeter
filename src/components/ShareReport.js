import React from 'react'
import va from '@vercel/analytics';
import { Box, Typography } from '@mui/material'
import theme from '@/theme';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from 'react-share';
import { node } from 'prop-types';
import { BASE_URL, PAGE_ABSOLUTE_URL } from '@/constants/constants';
import { EVENT } from '@/constants/constants';

//TODO - fix facebook photo size (use og:image meta tag)

const SHARE_PLATFORM_NAMES = {
    linkedIn: 'LinkedIn',
    twitter: 'Twitter',
    facebook: 'Facebook',
}
const SHARE_URL = {
    linkedIn: PAGE_ABSOLUTE_URL.ABOUT,
    twitter: BASE_URL,
    facebook: BASE_URL,
}
const TEXTS = {
    title: 'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
    summary: 'HonestyMeter - Check media content for objectivity and bias.',
    ctaLine1: 'Spread the Truth.',
    ctaLine2: '💡 Share Report! 💡',
    hashTags: '#HonestyMeter #MediaBias #FakeNews',
}

export default function ShareReport({ Cta = DefaultCta }) {
    return (
        <Box sx={STYLES.shareCtaContainer}>
            <Cta />
            <Box sx={STYLES.socialIconsContainer}>
                <TwitterShareButton
                    url={"https://honesty-meter-domq4dzil-game-changer.vercel.app/report/64d3c748d8e8a6961c8f306a"}
                    title={`North Korea is worried about energy crysis ${TEXTS.hashTags}`}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.twitter)}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton
                    url={"https://honesty-meter-domq4dzil-game-changer.vercel.app/report/64d3c748d8e8a6961c8f306a"}
                    title={TEXTS.title}
                    summary={TEXTS.summary}
                    source={"Honesty Meter"}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.linkedIn)}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <FacebookShareButton
                    url={"https://honesty-meter-domq4dzil-game-changer.vercel.app/report/64d3c748d8e8a6961c8f306a"}
                    quote={"North Korea is worried about energy crysis"}
                    hashtag={TEXTS.hashTags}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.facebook)}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </Box>
        </Box>
    )
}

ShareReport.propTypes = {
    cta: node,
}

const fireAnalyticsEvent = (platform) => () => {
    const eventName = EVENT.shareApp(platform)
    va.track(eventName)
}

const STYLES = {
    shareCtaContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    socialIconsContainer: {
        display: 'flex',
        gap: theme.spacing(2)
    },
}

function DefaultCta() {
    return (
        <Box style={DEFAULT_CTA_STYLES.cta}>
            <Typography component='h3'>
                {TEXTS.ctaLine1}
            </Typography>
            <Typography component='h3'>
                {TEXTS.ctaLine2}
            </Typography>
        </Box>
    )
}

const DEFAULT_CTA_STYLES = {
    cta: {
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.fontSize * 1.25,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2)
    }
}
