import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Divider, Fade, Modal } from '@mui/material';
import Details from '@/components/Badge/Details'
import theme from '@/theme';
import Badge from '@/components/Badge/Badge';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Link from 'next/link';
import Image from 'next/image';
import DetailsFairContent from './DetailsFairContent';

function BadgePageComponent() {
    const [isSharingDetailsShown, setSharingDetailsShown] = useState(false);

    const toggleSharingDetails = () => {
        setSharingDetailsShown(!isSharingDetailsShown);
    }

    return (
        <Box sx={STYLES.container}>
            <Paper elevation={3} sx={{ padding: theme.spacing(3), marginBottom: theme.spacing(2) }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: theme.spacing(2) }} onClick={toggleSharingDetails}>
                    <Badge biasLevel={0} showFullTooltip />
                    {/* <Image src="/badge_fair.svg" height={160} width={160} alt="Honesty Badge - Supporting Honest Content" /> */}
                </Box>
                {/* <Typography variant="h4" sx={STYLES.title}>HONESTY BADGE</Typography> */}
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
                    {/* By HonestyMeter
                    <br></br> */}
                    Free, AI-Powered Bias Analysis
                </Typography>
                <Box sx={{
                    ...STYLES.sectionTitle,
                    color: theme.palette.success.main,
                    textAlign: 'center', display: 'flex',
                    width: '100%', flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <Typography component='span' sx={{ fontWeight: theme.typography.fontWeightBold }}>
                        Awarded to relatively highly balanced content
                    </Typography>
                </Box>
                {/* <Typography sx={{ ...STYLES.paragraph, marginBottom: 0, color: theme.palette.secondary.main }}>
                    This content has been awarded our Honesty Badge for its adherence to our standards of objectivity.
                </Typography> */}
            </Paper>
            <Typography sx={{ ...STYLES.paragraph, textAlign: 'center', marginBottom: theme.spacing(1), color: theme.palette.text.secondary }}>
                To verify the badge, you can generate a bias report on our&nbsp;
                <Link href="/" style={STYLES.link}>
                    homepage
                </Link>&nbsp;
                if you haven&apos;t already done so.
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

                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'inherit', marginBottom: theme.spacing(2) }}>
                    <Button
                        variant="contained"
                        sx={STYLES.shareButton}
                        onClick={toggleSharingDetails}>
                        Share Honesty Badge
                    </Button>
                </Box>
                <Modal open={isSharingDetailsShown} onClose={toggleSharingDetails} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}>
                    <Fade in={isSharingDetailsShown} timeout={{ enter: 300, exit: 400 }} >
                        <Box sx={{ position: 'relative', width: '95%', maxWidth: '800px', maxHeight: '95vh' }}>
                            <CloseRoundedIcon sx={STYLES.closeIcon} onClick={toggleSharingDetails} />
                            <DetailsFairContent />
                        </Box>
                    </Fade>
                </Modal>
            </Box>
            {/* <Typography sx={{ ...STYLES.paragraph, marginBottom: theme.spacing(3) }}>
                If you share our vision of transparent, unbiased media, display our badge
                with any content you post on platforms or social networks that you use or manage.
                It enhances trust and engagement with your content.
                Every share promotes awareness of media transparency and makes the world a little fairer.
            </Typography> */}
            <Divider sx={{ marginBottom: theme.spacing(3) }} />
            <Typography sx={STYLES.sectionTitle}>
                Disclaimer: Honesty Meter in Experimental Stage
            </Typography>
            <Typography sx={STYLES.paragraph}>
                Honesty Meter, the technology behind the Honesty Badge, is in an experimental stage.
                We recommend critically evaluating the content and bias reports generated.
                While we are continuously working on improving the system, even in its current state,
                the bias reports often provide valuable insights that are hard for humans to detect.
            </Typography>
            {/* <Typography sx={STYLES.sectionTitle}>
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
            </Typography> */}
        </Box >
    );
}

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
    },
    closeIcon: {
        cursor: 'pointer',
        fontSize: theme.spacing(3),
        color: theme.palette.text.secondary,
        position: 'absolute',
        top: theme.spacing(1.5),
        right: theme.spacing(1.5),
    },
};

export default BadgePageComponent;
