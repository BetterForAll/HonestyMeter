/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { getBaseUrl, getBaseUrlFromUrlString } from '../utils/utils'
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import theme from '@/theme';
import Image from 'next/image';

// Draft page, just to test the API

const baseUrl = getBaseUrl();
const PATH = 'api/saved_reports'
const URL = `${baseUrl}${PATH}`;

const TEXTS = {
    title: 'Latest Bias Reports',
    subtitle: 'Articles from leading news sources, analysed for bias by HonestyMeter',
    newReportButton: 'CREATE NEW BIAS REPORT',
    articleTitle: 'Article Title',
    source: 'Source',
    objectivityScore: 'OBJECTIVITY SCORE',
    viewReport: 'View Bias Report',
    imageAlt: 'Random illustration image',
}

export default function Reports({ allReports }) {
    const router = useRouter();

    const onCardClick = (reportUrl) => () => {
        router.push(reportUrl);
    }


    return (
        <Box sx={STYLES.container}>
            <Typography variant="h2" sx={STYLES.title}>{TEXTS.title}</Typography>
            <Typography variant="body1" sx={STYLES.subtitle}>{TEXTS.subtitle}</Typography>
            <CreateReportButton />

            {
                <List sx={STYLES.list}>
                    {
                        allReports.map((report) => {
                            const source = getBaseUrlFromUrlString(report.articleLink);
                            const reportUrl = `${baseUrl}report/${report._id}`
                            const randomImageUrl = `https://picsum.photos/266/150?random=${report._id}`

                            return (
                                report.articleLink && //TODO: remove
                                <ListItem key={report._id} sx={STYLES.listItem} onClick={onCardClick(reportUrl)}>
                                    {/* <img
                                        src={randomImageUrl}
                                        alt={TEXTS.imageAlt}
                                        width={150}
                                        height={150}
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    /> */}
                                    <Typography sx={STYLES.textLine}>
                                        {/* <b>{TEXTS.articleTitle}:</b> */}
                                        <b>
                                            {report.articleTitle}
                                        </b>
                                    </Typography>
                                    <Typography sx={STYLES.textLine}>
                                        {/* <b>{TEXTS.source}:&nbsp; </b> */}
                                        {source}
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '150px',

                                            backgroundImage: `url(${randomImageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            borderRadius: '4px',
                                            marginBottom: theme.spacing(1),
                                        }} />
                                    <Typography sx={[STYLES.objectivityScore]}> {TEXTS.objectivityScore}: <b>{report.score}</b> </Typography>
                                    <Button variant='outlined' sx={STYLES.viewReportButton}>{TEXTS.viewReport}</Button>
                                </ListItem>
                            )
                        })
                    }
                </List>
            }
            <CreateReportButton />
        </Box>

    )
}

function CreateReportButton() {
    const router = useRouter();

    const onNewReportClick = () => {
        router.push('/');
    }

    return (
        <Button variant="outlined" onClick={onNewReportClick} sx={STYLES.newReportButton}>
            {TEXTS.newReportButton}
        </Button>
    )
}

const STYLES = {
    container: {
        maxWidth: '1400px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: theme.typography.fontSize * 2,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    subtitle: {
        color: theme.palette.text.secondary,
        margin: theme.spacing(0, 2, 2, 2),
        textAlign: 'center',
    },
    newReportButton: {
        margin: 'auto',
        marginBottom: theme.spacing(3),
        textAlign: 'center',
        minWidth: '44%',
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxWidth: '300px',
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '10px',
        // cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        }
    },
    textLine: {
        marginBottom: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    objectivityScore: {
        color: theme.palette.text.secondary,
        margin: 'auto',
        marginBottom: theme.spacing(1),
    },
    viewReportButton: {
        width: '100%',
    }
}

export async function getServerSideProps(context) {
    const { req } = context;
    const host = req?.headers?.host
    const url = `http://${host}/${PATH}`;

    try {
        const res = await fetch(url);

        const { data: allReports } = await res.json();

        return { props: { allReports } }
    } catch (error) {
        console.log({ error })
    }
}

const createReport = async () => {
    console.log({ URL })

    let res = await fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            title: 'New ' + Math.floor(Math.random() * 1000000),
            content: 'New content',
        }),
    });
    res = await res.json();
};
