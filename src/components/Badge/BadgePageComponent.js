import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Divider, Fade, Modal } from '@mui/material';
import theme from '@/theme';
import Badge from '@/components/Badge/Badge';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Link from 'next/link';
import DetailsMediumBias from './DetailsMediumBias';

const TEXTS = {
    biasLevel: {
        0: 'low',
        1: 'medium',
        2: 'high',
        3: 'irrelevant'
    }
}

function BadgePageComponent({ biasLevel = 1 }) {
    const [isSharingDetailsShown, setSharingDetailsShown] = useState(false);
    const isLowBias = biasLevel === 0;
    const isMediumOrHighBias = biasLevel === 1 || biasLevel === 2;
    const isGeneralBadge = biasLevel === 3;

    const toggleSharingDetails = () => {
        setSharingDetailsShown(!isSharingDetailsShown);
    }

    const CTAWithProps = () => <CTA {...{ toggleSharingDetails, isSharingDetailsShown, biasLevel }} />;

    return (
        <Box sx={STYLES.container}>
            <Paper elevation={3} sx={STYLES.paper}>
                <Box sx={STYLES.badgeContianer} onClick={toggleSharingDetails}>
                    <Badge biasLevel={biasLevel} showFullTooltip showComment />
                </Box>
                <Typography variant="subtitle1" sx={[STYLES.paragraph, STYLES.description]} >
                    Free, AI-Powered Bias Analysis
                </Typography>
                <Box sx={[STYLES.sectionTitle, STYLES.badgeTextContainer]}>
                    {
                        isMediumOrHighBias &&
                        <>
                            <Typography component='span' sx={STYLES.highBiasLineOne} >
                                {`Assigned to content with ${TEXTS.biasLevel[biasLevel]} bias level.`}
                            </Typography>
                            <Typography sx={STYLES.highBiasLineTwo}>
                                Shared by publishers <br /> championing full transparency.
                            </Typography>
                        </>
                    }
                    {
                        isLowBias &&
                        <>
                            <Box sx={{ ...STYLES.sectionTitle, ...STYLES.title, color: theme.palette.success.main }}>
                                <Typography component='span' sx={{ fontWeight: theme.typography.fontWeightBold }}>
                                    Awarded to content for its adherence to our standards of objectivity.
                                </Typography>
                            </Box>
                        </>
                    }
                    {
                        isGeneralBadge &&
                        <Box>
                            <Box sx={{ ...STYLES.sectionTitle, ...STYLES.title, color: theme.palette.secondary.main }}>
                                <Typography component='span' sx={{ fontWeight: theme.typography.fontWeightBold }}>
                                    Endorsement of
                                </Typography>&nbsp;
                                <Typography sx={{ fontWeight: theme.typography.fontWeightBold }}>Transparency and Fairness</Typography>
                            </Box>
                            <Typography sx={[STYLES.paragraph, STYLES.generalBadgeDescription]}>
                                By displaying this badge, individuals and platforms express their endorsement of transparency,
                                fairness, and the encouragement of open discussion and critical evaluation of bias in their content,
                                whether the content is absolutely neutral or highly biased.
                            </Typography>

                        </Box>
                    }
                </Box>
            </Paper>
            <Typography sx={[STYLES.paragraph, STYLES.verify]}>
                To verify the badge, you can generate a bias report on our&nbsp;
                <Link href="/" style={STYLES.link}>
                    homepage
                </Link>&nbsp;
                if you haven&apos;t already done so.
            </Typography>
            <CTAWithProps />

            {
                isGeneralBadge &&
                <Typography sx={{ ...STYLES.paragraph, marginBottom: theme.spacing(3) }}>
                    If you share our vision of transparent, unbiased media, display our badge
                    with any content you post on platforms or social networks that you use or manage.
                    It enhances trust and engagement with your content.
                    Every share promotes awareness of media transparency and makes the world a little fairer.
                </Typography>
            }
            {
                isMediumOrHighBias &&
                <Typography sx={STYLES.sectionTitle}>
                    <span>
                        Marking every piece of content with its bias level is not suitable for most content platforms! &nbsp;
                    </span>
                    <Typography component='span' sx={STYLES.note}>
                        Under these circumstances, we highly recommend displaying the&nbsp;
                        <Link href="/badge" sx={STYLES.link}>
                            general Honesty Badge
                        </Link>
                        , which demonstrates support for fair content without specifying the level of bias.
                        Users who click on the badge will have the opportunity to generate a bias report on our homepage, should they choose to do so.
                        Thus, using a&nbsp;
                        <Link href="/badge" sx={STYLES.link}>
                            general Honesty Badge
                        </Link>
                        &nbsp;is highly valued. It reflects the publisher&apos;s commitment to fair content and
                        helps greatly in promoting transparency.
                        To share the general Honesty Badge, please&nbsp;
                        <Link href="/badge" sx={STYLES.link}>
                            click here
                        </Link>.
                        &nbsp;
                    </Typography>
                </Typography>}
            <Divider sx={{ marginBottom: theme.spacing(3) }} />
            {
                !isLowBias &&
                <>
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
                </>
            }
            <Typography sx={STYLES.sectionTitle}>
                Disclaimer: Honesty Meter in Experimental Stage
            </Typography>
            <Typography sx={STYLES.paragraph}>
                Honesty Meter, the technology behind the Honesty Badge, is in an experimental stage.
                We recommend critically evaluating the content and bias reports generated.
                While we are continuously working on improving the system, even in its current state,
                the bias reports often provide valuable insights that are hard for humans to detect.
            </Typography>
            {
                isGeneralBadge &&
                <>
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
                    <CTAWithProps />
                </>
            }
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
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    badgeContianer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2)
    },
    description: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
        color: theme.palette.text.secondary,
        fontSize: {
            xs: theme.typography.fontSize * 0.75,
            sm: theme.typography.fontSize * 0.875
        }
    },
    badgeTextContainer: {
        color: theme.palette.text.secondary,
        textAlign: 'center', display: 'flex',
        width: '100%', flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    highBiasLineOne: {
        fontSize: 'inherit',
        marginBottom: 2,
        fontSize: {
            xs: theme.typography.fontSize * 1,
            sm: theme.typography.fontSize * 1.125
        },
    },
    highBiasLineTwo: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: {
            xs: theme.typography.fontSize * 1.25,
            sm: theme.typography.fontSize * 1.5
        }
    },
    generalBadgeDescription: {
        marginBottom: 0, color: theme.palette.secondary.main,
        textAlign: 'left'
    },
    verify: {
        textAlign: 'center',
        marginBottom: theme.spacing(1),
        color: theme.palette.text.secondary
    },
    title: {
        color: theme.palette.success.main,
        textAlign: 'center', display: 'flex',
        width: '100%', flexWrap: 'wrap',
        justifyContent: 'center'
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
    note: {
        fontWeight: theme.typography.fontWeightRegular
    },
    shareButton: {
        margin: 'auto',
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
        right: theme.spacing(3),
    },
};

function CTA({ toggleSharingDetails, isSharingDetailsShown, biasLevel }) {
    return (<Box sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
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
            <Fade in={isSharingDetailsShown} timeout={{ enter: 300, exit: 400 }}>
                <Box sx={{ position: 'relative', width: '95%', maxWidth: '800px', maxHeight: '95vh' }}>
                    <CloseRoundedIcon sx={STYLES.closeIcon} onClick={toggleSharingDetails} />
                    <DetailsMediumBias biasLevel={biasLevel} />
                </Box>
            </Fade>
        </Modal>
    </Box>)
}

export default BadgePageComponent;


