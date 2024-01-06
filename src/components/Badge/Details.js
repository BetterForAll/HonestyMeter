import React from 'react'
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import Link from 'next/link';
import theme from '@/theme';
import Image from 'next/image';

export default function Details() {

    const badgeHtml = `
    <a href="https://www.honestymeter.com/badge" target=" _blank">
    <img src="/badge.svg" width="140" height="140" alt="Honesty Badge" title="Click to view the badge" style="cursor:pointer;">
    </a>
    `



    return (
        <Box sx={STYLES.container}>
            <Box elevation={3} sx={{ padding: theme.spacing(3), marginBottom: theme.spacing(3), width: '100%' }}>
                <Typography component='h1' sx={{ ...STYLES.sectionTitle, fontSize: theme.typography.fontSize * 1.5, marginBottom: 3 }}>
                    Sharing Options
                </Typography>

                <Typography sx={{ ...STYLES.sectionTitle, marginBottom: 1 }}>
                    1. Embed on Your Website
                </Typography>
                <Image src="/badge.svg" height={140} width={140} alt="Honesty Badge - Supporting Honest Content" title="Click to view the badge" style={{ cursor: 'pointer' }} />
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Image src="/badge_fair2.svg" height={140} width={140} alt="Honesty Badge - Fair Content" title="Click to view the badge" style={{ cursor: 'pointer' }} />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Image src="/badge_medium.svg" height={140} width={140} alt="Honesty Badge - Fair Content" title="Click to view the badge" style={{ cursor: 'pointer' }} />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Image src="/badge_high.svg" height={140} width={140} alt="Honesty Badge - Fair Content" title="Click to view the badge" style={{ cursor: 'pointer' }} /> */}
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
                    &nbsp; &nbsp; &lt;img src=&quot;https://www.honestymeter.com/badge.svg&quot; width=&quot;140&quot; height=&quot;140&quot;
                    alt=&quot;Honesty Badge&quot; title=&quot;Click to view the badge&quot; style=&quot;cursor:pointer;&quot;&gt;
                    <br />&lt;/a&gt;
                </Box>
                <Typography sx={STYLES.sectionTitle}>
                    2. Share as text:
                </Typography>
                <Typography sx={STYLES.paragraph}>
                    Supporting honest content. View the Honesty Badge: HonestyBadge.com
                </Typography>
                <Typography sx={STYLES.paragraph}>
                    hashtags: #HonestyBadge #HonestyMeter
                </Typography>
                <Typography sx={STYLES.sectionTitle}>
                    3. Direct URL
                </Typography>
                <Typography sx={STYLES.paragraph}>
                    Share this direct link to the Honesty Badge page:
                </Typography>
                <Typography sx={STYLES.paragraph}>
                    <Link href="https://www.honestymeter.com/badge" sx={STYLES.link}>HonestyBadge.com</Link>
                </Typography>


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
        maxWidth: '800px',
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
