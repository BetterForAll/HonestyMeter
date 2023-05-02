import React from 'react'
import { Box } from '@mui/material'
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from 'react-share'
import theme from '@/theme';

const HONESTY_METER_URL = 'https://honestymeter.com';
const TEXTS = {
    title: 'HonestyMeter - A Free tool for Evaluating the Objectivity and Bias of Media Content. Discover the truth now!',
    cta: '💡  Be a part of the change – SHARE HonestyMeter with your network!  💡'
}

export default function Share() {
    return (
        <Box sx={STYLES.shareCtaContainer}>
            <h3 style={STYLES.cta}>
                {TEXTS.cta}
            </h3>
            <Box sx={STYLES.socialIconsContainer}>
                <LinkedinShareButton url={HONESTY_METER_URL}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <TwitterShareButton
                    url={HONESTY_METER_URL}
                    title={TEXTS.title}
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <FacebookShareButton
                    url={HONESTY_METER_URL}
                    quote={TEXTS.title}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </Box>
        </Box>
    )
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
