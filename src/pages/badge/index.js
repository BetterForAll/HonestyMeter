import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import theme from '@/theme';
import Badge from '@/components/Badge/Badge';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Link from 'next/link';


const STYLES = {
    container: {
        maxWidth: '1000px',
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
        marginBottom: theme.spacing(2),
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

function HonestyBadgeComponent() {
    const [isSharingDetailsShown, setSharingDetailsShown] = useState(false);

    const toggleSharingDetails = () => {
        setSharingDetailsShown(!isSharingDetailsShown);
    }

    return (
        <Box sx={STYLES.container}>

            <Paper elevation={3} sx={{ padding: theme.spacing(3), marginBottom: theme.spacing(2) }}>
                {/* <Badge biasLevel={4} showBadgeName /> */}
                <Typography variant="h4" sx={STYLES.title}>HONESTY BADGE</Typography>
                <Typography variant="subtitle1" sx={{
                    ...STYLES.paragraph,
                    textAlign: 'center',
                    marginBottom: theme.spacing(2),
                    color: theme.palette.text.secondary,
                    fontSize: {
                        xs: theme.typography.fontSize * 0.75,
                        sm: theme.typography.fontSize * 0.875
                    }
                }} >
                    By HonestyMeter
                    <br></br>
                    Free, AI-Powered Framework for Bias Analysis
                </Typography>
                <Box sx={{
                    ...STYLES.sectionTitle,
                    color: theme.palette.secondary.main,
                    textAlign: 'center', display: 'flex',
                    width: '100%', flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <Typography component='span' sx={{ fontWeight: theme.typography.fontWeightBold }}>Commitment to</Typography>&nbsp;<Typography sx={{ fontWeight: theme.typography.fontWeightBold }}>Transparency and Fairness</Typography>
                </Box>
                <Typography sx={{ ...STYLES.paragraph, marginBottom: 0, color: theme.palette.secondary.main }}>
                    By displaying this badge, individuals and platforms signify their commitment to transparency,
                    fairness, and the encouragement of open discussion and critical evaluation of bias in their content,
                    whether the content is absolutely neutral or highly biased.
                </Typography>
            </Paper>
            <Typography sx={{ ...STYLES.paragraph, textAlign: 'center', marginBottom: theme.spacing(1) }}>
                To generate a bias report visit our &nbsp;
                <Link href="/" style={STYLES.link}>
                    homepage
                </Link>
            </Typography>
            <Box sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
                {/* <Typography sx={{ ...STYLES.sectionTitle, marginBottom: theme.spacing(0.5) }}>
                    Share Honesty Badge in Your Content
                </Typography> */}
                <Typography sx={{ ...STYLES.sectionTitle, marginBottom: theme.spacing(0.5), color: 'inherit' }}>
                    - Support the Truth
                </Typography>
                <Typography sx={{ ...STYLES.sectionTitle, }}>
                    - Increase Trust and Engagement
                </Typography>
                <ArrowDownwardIcon sx={{ color: 'inherit' }} />

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', color: 'inherit', marginBottom: theme.spacing(2) }}>
                    <Link href='/badge/details'>
                        <Button
                            variant="contained"
                            sx={STYLES.shareButton}
                            onClick={toggleSharingDetails}>
                            Share Honesty Badge in Your Content
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Typography sx={{ ...STYLES.paragraph, marginBottom: theme.spacing(3) }}>
                If you share our vision of transparent, unbiased media, display our badge
                with any content you post on platforms or social networks that you use or manage.
                It enhances trust and engagement with your content.
                Every share promotes awareness of media transparency and makes the world a little fairer.
            </Typography>
            <Divider sx={{ marginBottom: theme.spacing(3) }} />
            {/* <Typography sx={STYLES.sectionTitle}>
                Understanding Bias in Content
            </Typography>
            <Typography sx={STYLES.paragraph}>
                It&apos;s important to recognize that the presence of moderate bias in content does not necessarily imply intentional bias.
                Biased content often arises unintentionally, even with the best intentions. A certain degree of bias is frequently unavoidable,
                particularly in opinion pieces on contentious subjects.
            </Typography>

            <Typography sx={STYLES.sectionTitle}>
                Objective: Countering Media Manipulations
            </Typography>
            <Typography sx={STYLES.paragraph}>
                Our objective is to counteract severe media manipulations that can significantly distort facts and lead the audience to a false perception of reality.
                 These manipulations include misleading headlines, omission of key information, biased framing, among many others.
            </Typography>

            <Typography sx={STYLES.sectionTitle}>
                The Role of the Honesty Badge
            </Typography>
            <Typography sx={STYLES.paragraph}>
                The Honesty Badge doesn&apos;t mean that the content is free of bias.
                It indicates that the content creator or publisher is openly inviting the audience
                to evaluate and discuss the bias by clicking the badge and generating a full bias report about the content.
                Therefore, it&apos;s highly unlikely that those who intentionally publish content with severe misleading manipulations
                will share our Honesty Badge. While absolute guarantees are impossible, it is generally reasonable
                to consider authors or platforms that actively share this badge and invite open discussion as more trustworthy than those who do not.
            </Typography> */}
            <Typography sx={STYLES.sectionTitle}>
                Author&apos;s and Publisher&apos;s Transparency
            </Typography>
            <Typography sx={STYLES.paragraph}>
                If this badge was shared by the author or publishing platform, it strongly indicates the publisher&apos;s commitment to transparency,
                fairness, and openness to discussion and critical evaluation of the content. It&apos;s important to understand
                that the presence of bias in the content does not mean that the bias was applied intentionally to manipulate the audience.
                In many cases, biased content is created unknowingly with the best of intentions. Some level of bias is often inevitable,
                especially in opinion pieces on controversial topics. Our main objective is to counteract severe media manipulations that can
                significantly distort facts and lead the audience to a false perception of reality.
                These manipulations include misleading headlines, omission of key information, biased framing, among many others.
                It&apos;s highly unlikely that those who intentionally publish content with severe misleading manipulations will share our Honesty Badge.

            </Typography>
            <Typography sx={STYLES.sectionTitle}>
                Commitment to Openness by Authors and Publishers
            </Typography>
            <Typography sx={STYLES.paragraph}>
                We&apos;d like to emphasize that if this badge was shared by the author or publisher, it significantly increases the likelihood of their trustworthiness,
                regardless of the bias level. This willingness to openly invite the audience to evaluate the content&apos;s bias level
                demonstrates a commitment to honest communication and aligns with the vision of fair and transparent media.
                Therefore, it&apos;s pretty reasonable to assume that an author or publisher who openly shares a badge
                and invites the audience to engage in open discussion can be more likely trusted than those who don&apos;t.

            </Typography>

            {/* <Typography sx={STYLES.sectionTitle}>
                Building Trust through Open Discussion
            </Typography>
            <Typography sx={STYLES.paragraph}>
                While absolute guarantees are impossible, it is generally reasonable to consider authors or platforms that actively share this badge and invite open discussion as more trustworthy than those who do not.
            </Typography> */}
            <Typography sx={STYLES.sectionTitle}>
                Disclaimer: Honesty Meter in Experimental Stage
            </Typography>
            <Typography sx={STYLES.paragraph}>
                Honesty Meter, the technology behind the Honesty Badge, is in an experimental stage.
                We recommend critically evaluating the content and bias reports generated.
                While we are continuously working on improving the system, even in its current state,
                the bias reports often provide valuable insights that are hard for humans to detect.
            </Typography>
            <Typography sx={STYLES.sectionTitle}>
                Support the Truth, Increase Trust and Engagement - Share Honesty Badge in Your Content
            </Typography>
            <Typography sx={STYLES.paragraph}>
                Sharing the Honesty Badge offers several benefits: It serves as a powerful trust signal for your audience, showcasing your commitment to transparency.
                It highlights your significant and active contribution to transparent and truthful media.
                The badge helps your content stand out and encourages your audience to increase their engagement with your content and to share it more widely.
            </Typography>
            <Typography sx={STYLES.paragraph}>
                If you share our vision of transparent, unbiased media, display our badge
                with any content you post on platforms or social networks that you use or manage.
                Every share promotes awareness of media transparency and makes the world a little fairer.
            </Typography>
            <Box sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
                {/* <Typography sx={{ ...STYLES.sectionTitle, marginBottom: theme.spacing(0.5) }}>
                    Share Honesty Badge in Your Content
                </Typography> */}
                <Typography sx={{ ...STYLES.sectionTitle, marginBottom: theme.spacing(0.5), color: 'inherit' }}>
                    - Support the Truth
                </Typography>
                <Typography sx={{ ...STYLES.sectionTitle, }}>
                    - Increase Trust and Engagement
                </Typography>
                <ArrowDownwardIcon sx={{ color: 'inherit' }} />

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', color: 'inherit', marginBottom: theme.spacing(2) }}>
                    <Link href='/badge/details'>
                        <Button
                            variant="contained"
                            sx={STYLES.shareButton}
                            onClick={toggleSharingDetails}>
                            Share Honesty Badge in Your Content
                        </Button>
                    </Link>
                </Box>
                {/* <Typography sx={STYLES.paragraph}>
                    If you share our vision of transparent, unbiased media, demonstrate your support by sharing our badge with any content
                    you post on platforms or social networks that you use or manage. It increases trust and engagement with your content.
                </Typography> */}
            </Box>
        </Box >
    );
}

export default HonestyBadgeComponent;
