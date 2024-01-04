import React from 'react'
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import Link from 'next/link';
import theme from '@/theme';
import Image from 'next/image';

export default function Details() {
    return (
        <Box sx={STYLES.container}>
            <Box elevation={3} sx={{ padding: theme.spacing(3), marginBottom: theme.spacing(3), width: '100%' }}>
                <Typography sx={STYLES.sectionTitle}>
                    1. Text for Sharing:
                </Typography>
                <Typography sx={STYLES.paragraph}>
                    Supporting honest content. View the Honesty Badge: HonestyBadge.com
                </Typography>
                <Typography sx={STYLES.paragraph}>
                    hashtags: #HonestyBadge #HonestyMeter
                </Typography>
                <Typography sx={STYLES.sectionTitle}>
                    2. Direct URL
                </Typography>
                <Typography sx={STYLES.paragraph}>
                    Share this direct link to the Honesty Badge page in your digital communications:
                </Typography>
                <Typography sx={STYLES.paragraph}>
                    <Link href="https://www.honestymeter.com/badge" sx={STYLES.link}>HonestyBadge.com</Link>
                </Typography>
                <Typography sx={STYLES.sectionTitle}>
                    3. Embed on Your Website
                </Typography>
                <Typography sx={STYLES.paragraph}>
                    Display the Honesty Badge on your website using this HTML code:
                </Typography>
                <Box sx={{
                    backgroundColor: 'gray',
                    color: 'white', padding: theme.spacing(2),
                    borderRadius: theme.spacing(1),
                    wordBreak: 'break-all',
                    marginBottom: theme.spacing(2),
                }}>
                    &lt;a href=&quot;https://www.honestymeter.com/badge&quot;
                    target=&quot;
                    _blank&quot;&gt;<br />
                    &nbsp; &nbsp; &lt;img src=&quot;https://www.honestymeter.com/badge.svg&quot;
                    alt=&quot;Honesty Badge&quot;&gt;
                    <br />&lt;/a&gt;
                </Box>
                <Image src="localhost:3000//public/badge.svg" alt="BADGE SVG" height={100} width={100} />
                <Typography sx={STYLES.sectionTitle}>
                    4. Create API Integration
                </Typography>
                <Typography sx={STYLES.paragraph}>
                    If you are interested in creating an API integration, please&nbsp;
                    <Link href="mailto:info@honestymeter.com" sx={STYLES.link}>
                        contact us
                    </Link>
                </Typography>
            </Box>
        </Box >
    )
}

const STYLES = {
    container: {
        width: '100%',
        maxWidth: '720px',
        margin: 'auto',
        padding: { xs: theme.spacing(2), sm: theme.spacing(4) },
        color: theme.palette.text.primary,
    },
    title: {
        marginBottom: theme.spacing(1),
        fontWeight: 'bold',
        fontSize: theme.typography.fontSize * 1.25,
        textAlign: 'center',
        color: theme.palette.secondary.main,
    },
    sectionTitle: {
        margin: theme.spacing(0, 0, 1),
        fontWeight: 'bold',
        fontSize: theme.typography.fontSize * 1.125,
    },
    paragraph: {
        fontSize: theme.typography.fontSize,
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(1),
    },
    shareButton: {
        margin: 'auto',
        // marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    hiddenContent: {
        display: 'none',
    },
    visibleContent: {
        display: 'block',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    }
};
