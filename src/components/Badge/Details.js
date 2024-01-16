import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Paper, Divider, Button } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import theme from '@/theme';
import Image from 'next/image';
import Badge from './Badge';
import { EMPTY_STRING } from '@/constants/constants';

const TEXTS = {
    sharingOptions: {
        getHtml: (biasLevel, biasLevelText) => {
            const isGeneralBadge = biasLevel === 3;
            const isMediumOrGeneral = biasLevel === 1 || isGeneralBadge;
            const imageSrcSuffix = isMediumOrGeneral ? EMPTY_STRING : `_${biasLevelText}`;
            const linkSuffix = isGeneralBadge ? EMPTY_STRING : `/${biasLevelText}`;

            return `
        <a href="https://www.honestymeter.com/badge${linkSuffix}" target="_blank">
            <img src="https://www.honestymeter.com/badge${imageSrcSuffix}.svg" width="140" height="140" alt="Honesty Badge" title="Click to view the badge" style="cursor:pointer;">
        </a>
        `
        },
        shareAsText: 'Honesty Badge by HonestyMeter. View the badge at',
        hashtags: '#HonestyBadge #HonestyMeter',
        getDirectUrl: (biasLevel, biasLevelText) => {
            const suffix = biasLevel === 3 ? EMPTY_STRING : `/${biasLevelText}`;
            return `HonestyBadge.com${suffix}`
        },
        script: '<script src="https://honestymeter.com/badge_script.js" defer></script>'
    },
    biasLevel: {
        0: 'fair',
        1: 'medium',
        2: 'high',
        3: EMPTY_STRING
    },
    copied: 'Copied!',
    copy: 'Copy',
}

export default function DetailsBias({ biasLevel = 1 }) {
    const [isCopied, setCopied] = useState(false);
    const [option, setOption] = useState(0);
    const biasLevelText = TEXTS.biasLevel[biasLevel];
    const html = TEXTS.sharingOptions.getHtml(biasLevel, biasLevelText)
    const badgeUrl = TEXTS.sharingOptions.getDirectUrl(biasLevel, biasLevelText)
    const isGeneralBadge = biasLevel === 3;
    const isMediumOrHighBias = biasLevel === 1 || biasLevel === 2;
    const isFairContentBadge = biasLevel === 0;

    const getTitle = (clickedOption) => {
        const isClickedOption = clickedOption === option;
        const isOptionCopied = isClickedOption && isCopied;

        return isOptionCopied ? TEXTS.copied : TEXTS.copy
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
                {
                    !isFairContentBadge &&
                    <>
                        <ListItem sx={STYLES.listItem}>
                            {
                                isGeneralBadge &&
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
                            }
                            {
                                isMediumOrHighBias &&
                                <Typography sx={{ ...STYLES.paragraph }}>
                                    Note: If you prefer to share a general badge that shows your support for fair content, without specifying the level of bias, please
                                    &nbsp;
                                    <Link href="/badge" sx={STYLES.link}>
                                        click here
                                    </Link>
                                </Typography>
                            }
                        </ListItem>
                        <Divider />
                    </>
                }
                <List sx={{ width: '100%' }}>
                    <ListItem sx={STYLES.listItem}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={STYLES.paragraph}>
                                Share as text: &nbsp;
                                <Typography sx={{ ...STYLES.paragraph, color: theme.palette.primary.main }} component='span'>
                                    {TEXTS.sharingOptions.shareAsText} &nbsp; {badgeUrl}
                                </Typography>
                            </Typography>
                            <Tooltip title={getTitle(2)}>
                                <IconButton onClick={() => copyToClipboard(`${TEXTS.sharingOptions.shareAsText} ${badgeUrl}`, 2)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </ListItem>
                    <Divider />
                    <ListItem sx={STYLES.listItem}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={STYLES.paragraph}>
                                hashtags:
                                &nbsp;
                                <Typography sx={{ ...STYLES.paragraph, color: theme.palette.primary.main }} component='span'>
                                    {TEXTS.sharingOptions.hashtags}
                                </Typography>
                            </Typography>
                            <Tooltip title={getTitle(3)}>
                                <IconButton onClick={() => copyToClipboard(TEXTS.sharingOptions.hashtags, 3)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </ListItem>
                    <Divider />
                    <ListItem sx={STYLES.listItem}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={STYLES.paragraph}>
                                Share this direct link: &nbsp;
                                <Typography sx={{ ...STYLES.paragraph, color: theme.palette.primary.main }} component='span'>
                                    {badgeUrl}
                                </Typography>
                            </Typography>
                            <Tooltip title={getTitle(4)}>
                                <IconButton onClick={() => copyToClipboard(TEXTS.sharingOptions.getDirectUrl(biasLevel, biasLevelText), 4)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </ListItem>
                    <Divider />
                    {
                        isGeneralBadge &&
                        <>
                            <ListItem sx={STYLES.listItem}>
                                <Typography sx={{ ...STYLES.sectionTitle, marginBottom: 2 }}>
                                    Display Honesty Badge on your website
                                </Typography>
                                <FloatingBadge />
                                <Typography sx={STYLES.paragraph}>
                                    Add this line to the head section of your website:
                                </Typography>
                                <Box sx={STYLES.code}>
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
                            <Divider />
                        </>
                    }
                    <ListItem sx={STYLES.listItem}>
                        <Typography sx={{ ...STYLES.sectionTitle, marginBottom: 1 }}>
                            Embed in Specific Website Parts
                        </Typography>
                        <Badge biasLevel={biasLevel} />

                        <Typography sx={{ ...STYLES.paragraph, textAlign: 'center' }}>
                            {`To embedd in specific places on your website, copy the following HTML`}
                        </Typography>
                        <Box sx={{ ...STYLES.code, padding: 2 }}>
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
                    <Divider />
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

function FloatingBadge() {
    return (
        <Box sx={{
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: '#ffffff99',
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
            }}>
               <CloseIcon/>
            </Button>
        </Box>
    );
}

const STYLES = {
    container: {
        width: '100%',
        maxHeight: '85vh',
        margin: 'auto',
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
        marginRight: theme.spacing(2),
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
    code: {
        position: 'relative',
        backgroundColor: 'gray',
        color: 'white',
        borderRadius: theme.spacing(1),
        wordBreak: 'break-all',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(4),
        width: '100%',
    },
};
