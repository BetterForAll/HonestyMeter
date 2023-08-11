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
import { string, number, node, arrayOf, oneOf } from 'prop-types';
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
    ctaLineOne: 'Spread the Truth.',
    getCtaLineTwo: (context) => `💡 Share ${CONTEXT_OPTIONS[context].title}! 💡`,
}

const DEFAULT_HASH_TAGS = ['HonestyMeter', 'MediaBias', 'FakeNews'];

export default function Share({
    title,
    url,
    description,
    hashTags,
    context = CONTEXT_OPTIONS.app.name,
}) {
    return (
        <Box sx={STYLES.shareCtaContainer}>
            <CTA context={context} />
            <Box sx={STYLES.socialIconsContainer}>
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
            </Box>
        </Box>
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
    context: oneOf(CONTEXT_OPTIONS.app.name, CONTEXT_OPTIONS.report.name)

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

function CTA({ context }) {
    return (
        <Box style={DEFAULT_CTA_STYLES.cta}>
            <Typography component='h3' sx={DEFAULT_CTA_STYLES.lineOne}>
                {TEXTS.ctaLineOne}
            </Typography>
            <Typography component='h3'>
                {TEXTS.getCtaLineTwo(context)}
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
    lineOne: {
        marginBottom: theme.spacing(1)
    }
}
