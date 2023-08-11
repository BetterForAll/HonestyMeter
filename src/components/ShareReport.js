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
import { string, node } from 'prop-types';
import { EVENT } from '@/constants/constants';
import { convertStringToPascalCase, getReportShareTitle } from '@/utils/utils';

//TODO - fix facebook photo size (use og:image meta tag)

const SHARE_PLATFORM_NAMES = {
    linkedIn: 'LinkedIn',
    twitter: 'Twitter',
    facebook: 'Facebook',
}

const TEXTS = {
    title: 'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
    summary: 'HonestyMeter - Check media content for objectivity and bias.',
    ctaLine1: 'Spread the Truth.',
    ctaLine2: '💡 Share Report! 💡',
    biasReport: 'Bias Report',
}

const DEFAULT_HASH_TAGS = ['HonestyMeter', 'MediaBias', 'FakeNews'];

export default function ShareReport({
    CTA = DefaultCta,
    articleTitle,
    score,
    shareUrl,
    sideNames,
    explanation }) {
    const sideNamesHashTags = sideNames.map(sideName => convertStringToPascalCase(sideName));
    const title = getReportShareTitle(articleTitle, score);
    const hashTags = [...sideNamesHashTags, ...DEFAULT_HASH_TAGS];

    return (
        <Box sx={STYLES.shareCtaContainer}>
            <CTA />
            <Box sx={STYLES.socialIconsContainer}>
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    hashtags={hashTags}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.twitter)}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton
                    url={shareUrl}
                    title={title}
                    summary={explanation}
                    source={TEXTS.title}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.linkedIn)}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    hashtag={DEFAULT_HASH_TAGS[0]}
                    beforeOnClick={fireAnalyticsEvent(SHARE_PLATFORM_NAMES.facebook)}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </Box>
        </Box>
    )
}

ShareReport.propTypes = {
    CTA: node,
    articleTitle: string,
    articleUrl: string,
}

const fireAnalyticsEvent = (platform) => () => {
    const eventName = EVENT.shareReport(platform)
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
            <Typography component='h3' sx={DEFAULT_CTA_STYLES.line1}>
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
    },
    line1: {
        marginBottom: theme.spacing(1)
    }
}
