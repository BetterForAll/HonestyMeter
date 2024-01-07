import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Paper, Divider } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from 'next/link';
import theme from '@/theme';
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/utils/utils';
import Badge from './Badge copy';

const TEXTS = {
    sharingOptions: {
        getHtml: (biasLevel) => {
            const suffix = biasLevel === 1 ? '' : `_${biasLevel}`;

            return `
        <a href="https://www.honestymeter.com/badge/${biasLevel}" target="_blank">
            <img src="/badge${suffix}.svg" width="140" height="140" alt="Honesty Badge" title="Click to view the badge" style="cursor:pointer;">
        </a>
        `
        },
        shareAsText: 'Honesty Badge by HonestyMeter. View the badge at',
        hashtags: '#HonestyBadge #HonestyMeter',
        getDirectUrl: (biasLevel) => {
            const suffix = biasLevel === 1 ? '' : `/${biasLevel}`;
            return `HonestyBadge.com${suffix}`
        },
    },
    biasLevel: {
        1: 'medium',
        2: 'high',
    }
}

export default function DetailsBias({ biasLevel = 1 }) {
    // State to manage the display of the copied indicator
    const [copied, setCopied] = useState(false);
    const [option, setOption] = useState(0);
    const biasLevelText = TEXTS.biasLevel[biasLevel];
    const html = TEXTS.sharingOptions.getHtml(biasLevelText)
    const badgeUrl = TEXTS.sharingOptions.getDirectUrl(biasLevelText)

    const getTitle = (clickedOption) => {
        if (clickedOption === option) {
            return copied ? "Copied!" : "Copy"
        }

        return "Copy"
    }

    const copyToClipboard = (text, option) => {
        navigator.clipboard.writeText(text);
        setOption(option);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    return (
        <Box sx={STYLES.container}>
            <Paper elevation={3} sx={{ padding: theme.spacing(3), width: '100%', }}>
                <ListItem sx={STYLES.listItem}>
                    <Typography sx={{ ...STYLES.paragraph }}>
                        Note: If you prefer to share a general badge that shows your support for fair content, without specifying the level of bias, please
                        &nbsp;
                        <Link href="/badge" sx={STYLES.link}>
                            click here
                        </Link>
                    </Typography>
                </ListItem>
                <Typography component='h1' sx={{ ...STYLES.sectionTitle, fontSize: theme.typography.fontSize * 1.125, marginBottom: 1, textAlign: 'center' }}>
                    {`${capitalizeFirstLetter(biasLevelText)} Bias Honesty Badge`}
                </Typography>
                <Typography component='h1' sx={{ ...STYLES.sectionTitle, fontSize: theme.typography.fontSize * 1, marginBottom: 1, textAlign: 'center' }}>
                    Sharing Options
                </Typography>
                <List sx={{ width: '100%' }}>

                    <ListItem sx={STYLES.listItem}>
                        <Typography sx={{ ...STYLES.sectionTitle, marginBottom: 1 }}>
                            Embed on Your Website
                        </Typography>
                        <Badge biasLevel={biasLevel} />

                        <Typography sx={{ ...STYLES.paragraph, textAlign: 'center' }}>
                            {`If you are an author or publisher of content that was assigned a ${biasLevelText} level of bias,
                            you can display the Honesty Badge on your website using the following HTML code:`}
                        </Typography>
                        <Box sx={{
                            position: 'relative',
                            backgroundColor: 'gray',
                            color: 'white', padding: theme.spacing(2),
                            borderRadius: theme.spacing(1),
                            wordBreak: 'break-all',
                            marginBottom: theme.spacing(2),
                        }}>
                            <Tooltip title={getTitle(1)} >
                                <IconButton
                                    onClick={() => copyToClipboard(html, 1)}
                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                    size="small"
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
                                {html}
                            </Typography>
                        </Box>
                    </ListItem>

                    <ListItem sx={STYLES.listItem}>
                        <Typography sx={STYLES.sectionTitle}>
                            Share as text
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={STYLES.paragraph}>
                                {TEXTS.sharingOptions.shareAsText}&nbsp;{badgeUrl}
                            </Typography>
                            <Tooltip title={getTitle(2)}>
                                <IconButton onClick={() => copyToClipboard(TEXTS.sharingOptions.shareAsText, 2)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={STYLES.paragraph}>
                                hashtags: {TEXTS.sharingOptions.hashtags}
                            </Typography>
                            <Tooltip title={getTitle(3)}>
                                <IconButton onClick={() => copyToClipboard(TEXTS.sharingOptions.hashtags, 3)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </ListItem>

                    <ListItem sx={STYLES.listItem}>
                        <Typography sx={STYLES.sectionTitle}>
                            Direct URL
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={STYLES.paragraph}>
                                Share this direct link to the Honesty Badge page: &nbsp;
                                {badgeUrl}
                            </Typography>
                            <Tooltip title={getTitle(4)}>
                                <IconButton onClick={() => copyToClipboard(TEXTS.sharingOptions.getDirectUrl, 4)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </ListItem>
                    <ListItem sx={STYLES.listItem}>
                        <Typography sx={STYLES.sectionTitle}>
                            Create API Integration
                        </Typography>
                        <Typography sx={STYLES.paragraph}>
                            If you are interested in creating an API integration, please&nbsp;
                            <Link href="mailto:info@honestymeter.com" sx={STYLES.link}>
                                contact us
                            </Link>
                        </Typography>
                    </ListItem>
                </List>
            </Paper>
        </Box >
    )
}

const STYLES = {
    container: {
        width: '100%',
        maxHeight: '85vh',
        margin: 'auto',
        // padding: { xs: theme.spacing(2), sm: theme.spacing(4) },
        color: theme.palette.text.primary,
        overflowX: 'auto',
        backgroundColor: theme.palette.background.paper,

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
        marginRight: theme.spacing(2), // Added for alignment with the button
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
};
