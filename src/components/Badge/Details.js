import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Paper, Divider, Button } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from 'next/link';
import theme from '@/theme';
import Image from 'next/image';

const TEXTS = {
    sharingOptions: {
        html: `
        <a href="https://www.honestymeter.com/badge" target="_blank">
            <img src="https://www.honestymeter.com/badge.svg" width="140" height="140" alt="Honesty Badge" title="Click to view the badge" style="cursor:pointer;">
        </a>
        `,
        shareAsText: 'Supporting honest content. View the Honesty Badge: HonestyBadge.com',
        hashtags: '#HonestyBadge #HonestyMeter',
        directUrl: 'HonestyBadge.com',
        script: '<script src="https://honestymeter.com/badge_script.js" defer></script>'
    }
}

function FloatingBadge() {
    const handleClose = () => {
        // Handle the close button logic
    };

    return (
        <Box sx={{
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: '#ffffff99',
            //border: 'solid 1px #19857b6b',
            padding: '8px 8px 0',
            borderRadius: 4,
            marginBottom: theme.spacing(2),
        }}>
            <Link href="" sx={{ textDecoration: 'none', color: 'black' }}>
                <Image src="/badge.svg" width={140} height={140} alt="Honesty Badge" />
            </Link>
            <Button sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                cursor: 'pointer',
                backgroundColor: '#19857B',
                color: 'white',
                width: 20,
                height: 20,
                border: 'none',
                padding: theme.spacing(0.25, 0),
                minWidth: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                    backgroundColor: '#106b5b',
                },
            }} onClick={handleClose}>
                <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
                    X
                </Typography>
            </Button>
        </Box>
    );
}

export default function Details() {
    // State to manage the display of the copied indicator
    const [copied, setCopied] = useState(false);
    const [option, setOption] = useState(null);

    const getTitle = (clickedOption) => {
        if (clickedOption === option) {
            return copied ? "Copied!" : "Copy"
        }

        return "Copy"
    }

    // Function to copy text to clipboard
    const copyToClipboard = (text, option) => {
        navigator.clipboard.writeText(text);
        setOption(option);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    };

    return (
        <Box sx={STYLES.container}>
            <Paper elevation={3} sx={{ padding: theme.spacing(3), width: '100%', }}>
                <ListItem sx={STYLES.listItem}>
                    <Typography sx={{ ...STYLES.paragraph }}>
                        Note: If you are an author or publisher who prefers to display a badge indicating the level of bias detected in content,
                        you can choose from one of the following badges instead:&nbsp;
                        <Link href="/badge/fair" sx={STYLES.link}>
                            Fair Content Badge,
                        </Link>
                        &nbsp;
                        <Link href="/badge/medium" sx={STYLES.link}>
                            Medium Bias Badge,
                        </Link>
                        &nbsp;
                        <Link href="/badge/high" sx={STYLES.link}>
                            High Bias Badge,
                        </Link>
                    </Typography>
                </ListItem>
                <Typography component='h1' sx={{ ...STYLES.sectionTitle, fontSize: theme.typography.fontSize * 1.5, marginBottom: 1, textAlign: 'center' }}>
                    Sharing Options
                </Typography>
                <List sx={{ width: '100%' }}>
                    <ListItem sx={STYLES.listItem}>
                        <Typography sx={STYLES.sectionTitle}>
                            Share as text:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ ...STYLES.paragraph, color: theme.palette.primary.main, }}>
                                &quot;{TEXTS.sharingOptions.shareAsText}&quot;
                            </Typography>
                            <Tooltip title={getTitle(2)}>
                                <IconButton onClick={() => copyToClipboard(TEXTS.sharingOptions.shareAsText, 2)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={STYLES.paragraph}>
                                hashtags: <Typography component='span' sx={{ color: theme.palette.primary.main }}>{TEXTS.sharingOptions.hashtags}</Typography>
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
                                Share this direct link to the Honesty Badge page:
                                &nbsp;<Link href="" style={{ color: theme.palette.primary.main }}>{TEXTS.sharingOptions.directUrl}</Link>
                            </Typography>
                            <Tooltip title={getTitle(4)}>
                                <IconButton onClick={() => copyToClipboard(TEXTS.sharingOptions.directUrl, 4)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </ListItem>
                    <ListItem sx={STYLES.listItem}>
                        <Typography sx={{ ...STYLES.sectionTitle, marginBottom: 2 }}>
                            Display Honesty Badge on your website
                        </Typography>
                        <FloatingBadge />
                        <Typography sx={STYLES.paragraph}>
                            Add this line to the head section of your website:
                        </Typography>
                        <Box sx={{
                            position: 'relative',
                            backgroundColor: 'gray',
                            color: 'white', padding: theme.spacing(2),
                            borderRadius: theme.spacing(1),
                            wordBreak: 'break-all',
                            marginBottom: theme.spacing(2),
                            padding: theme.spacing(4),
                            width: '100%',
                        }}>
                            <Tooltip title={getTitle(0)} >
                                <IconButton
                                    onClick={() => copyToClipboard(TEXTS.sharingOptions.script, 0)}
                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                    size="small"
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
                                {TEXTS.sharingOptions.script}
                            </Typography>
                        </Box>
                        <Typography sx={STYLES.paragraph}>
                            The close button removes the badge till the next session.
                        </Typography>
                        <Typography sx={STYLES.paragraph}>
                            For custom badge options please&nbsp;
                            <Link href="mailto:info@honestymeter.com" style={STYLES.link}>
                                contact us
                            </Link>.
                        </Typography>
                    </ListItem>
                    <ListItem sx={STYLES.listItem}>
                        <Typography sx={{ ...STYLES.sectionTitle, marginBottom: 1 }}>
                            Display in specific places on your website
                        </Typography>
                        <Image src="/badge.svg" height={140} width={140} alt="Honesty Badge - Supporting Honest Content" style={{ marginBottom: '1rem' }} />
                        <Typography sx={STYLES.paragraph}>
                            Add this html code to the places you want to display the badge:
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
                                    onClick={() => copyToClipboard(TEXTS.sharingOptions.html, 1)}
                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                    size="small"
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
                                {TEXTS.sharingOptions.html}
                            </Typography>
                        </Box>
                    </ListItem>

                    <ListItem sx={STYLES.listItem}>
                        <Typography sx={STYLES.sectionTitle}>
                            API Integration
                        </Typography>
                        <Typography sx={STYLES.paragraph}>
                            If you are interested in creating an API integration please&nbsp;
                            <Link href="mailto:info@honestymeter.com" style={STYLES.link}>
                                contact us
                            </Link>
                        </Typography>
                    </ListItem>
                </List>
            </Paper>
        </Box>
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
