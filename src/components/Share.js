import React from 'react'
import va from '@vercel/analytics';
import { Box } from '@mui/material'
import theme from '@/theme';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from 'react-share'
import { BASE_URL, PAGE_ABSOLUTE_URL } from '@/constants/constants';
import { EVENT } from '@/constants/constants';

//TODO - fix facebook photo size

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
    cta: '💡 Spread the Truth – SHARE HonestyMeter! 💡',
    hashTags: '#HonestyMeter #MediaBias #FakeNews',
}

export default function Share() {
    return (
        <Box sx={STYLES.shareCtaContainer}>
            <h3 style={STYLES.cta}>
                {TEXTS.cta}
            </h3>
            <Box sx={STYLES.socialIconsContainer}>
                <LinkedinShareButton
                    url={SHARE_URL.linkedIn}
                    title={TEXTS.title}
                    summary={TEXTS.title}
                    source={BASE_URL}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.linkedIn)}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <TwitterShareButton
                    url={SHARE_URL.twitter}
                    title={`${TEXTS.title} ${TEXTS.hashTags}`}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.twitter)}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <FacebookShareButton
                    url={SHARE_URL.facebook}
                    quote={TEXTS.title}
                    hashtag={TEXTS.hashTags}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.facebook)}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </Box>
        </Box>
    )
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
    cta: {
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.fontSize * 1.25,
        color: theme.palette.text.secondary
    }
}
