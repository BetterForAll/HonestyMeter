import React from 'react'
import { getBaseUrl, getBaseUrlFromUrlString } from '../utils/utils'
import { Box, Button, Card, List, ListItem, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import theme from '@/theme';
import usePageLoading from '@/hooks/usePageLoading';
import ReportLoading from '@/components/Report/ReportLoading';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';



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

const STEPS = {
    forward: 1,
    back: -1,
}

export default function Reports({ allReports, isLastPage, date }) {
    const router = useRouter();
    const pageFromQuery = parseInt(router.query.page) || 1;
    const isFirstPage = pageFromQuery === 1;
    const isPaginationEnabled = !(isFirstPage && isLastPage)
    const isLoading = usePageLoading();

    const onCardClick = (reportUrl) => () => {
        router.push(reportUrl);
    }



    if (allReports.length === 0) {
        return <Typography variant="body1" sx={STYLES.noReportsText}>No reports yet</Typography>
    }

    const onChangePage = (step) => () => {
        const nextPage = parseInt(pageFromQuery) + step;
        router.query.page = nextPage;
        router.push(router);
    }

    const onStartClick = () => {
        router.push('/reports');
    }

    return (
        isLoading ? <ReportLoading />
            :
            <Box sx={STYLES.container}>
                <Typography variant="body1" sx={STYLES.date}>{date}</Typography>
                <Typography variant="h2" sx={STYLES.title}>{TEXTS.title}</Typography>
                <Typography variant="body1" sx={STYLES.subtitle}>{TEXTS.subtitle}</Typography>
                <CreateReportButton />
                <List sx={STYLES.list}>
                    {
                        allReports.map((report) => {
                            const source = getBaseUrlFromUrlString(report.articleLink);
                            const reportUrl = `${baseUrl}report/${report._id}`
                            const randomImageUrl = `https://picsum.photos/266/150?random=${report._id}`
                            const articleDate = report.articleDate || '12/04/2023'; //TODO: remov

                            return (
                                <ListItem key={report._id} sx={STYLES.listItem} onClick={onCardClick(reportUrl)}>
                                    <Card sx={STYLES.card}>
                                        <Typography sx={STYLES.textLine}>
                                            <b>
                                                {report.articleTitle}
                                            </b>
                                        </Typography>
                                        <Typography sx={STYLES.textLine} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>{source}</span>
                                            <span style={{ fontSize: '12px' }}>{articleDate}</span>
                                        </Typography>
                                        <Box
                                            sx={STYLES.image(randomImageUrl)}
                                        />
                                        <Typography sx={[STYLES.objectivityScore]}> {TEXTS.objectivityScore}: <b>{report.score}</b> </Typography>
                                        <Button variant='outlined' sx={STYLES.viewReportButton}>{TEXTS.viewReport}</Button>
                                    </Card>
                                </ListItem>
                            )
                        })
                    }
                </List>
                {
                    isPaginationEnabled &&
                    <Box sx={STYLES.pagination}>
                        <Button disabled={isFirstPage} onClick={onStartClick}>
                            <SkipPreviousIcon fontSize='large' sx={{ transform: 'scale(0.75)' }} />
                        </Button>
                        <Button disabled={isFirstPage} onClick={onChangePage(STEPS.back)}><ArrowLeftIcon fontSize='large' /></Button>
                        <Button disabled={isLastPage} onClick={onChangePage(STEPS.forward)}><ArrowRightIcon fontSize='large' /></Button>
                    </Box>
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
    date: {
        color: theme.palette.text.secondary,
        margin: theme.spacing(2, 0, 1, 0),
        fontSize: theme.typography.fontSize * 0.875,
    },
    title: {
        fontSize: theme.typography.fontSize * 2,
        // marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    subtitle: {
        fontSize: theme.typography.fontSize * 0.875,
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
        maxWidth: '320px',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: theme.spacing(2),
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            boxShadow: '0px 5px 5px -1px rgba(0,0,0,0.2), 0px 5px 5px 0px rgba(0,0,0,0.14), 0px 5px 5px 0px rgba(0,0,0,0.12)',
            transform: 'translate(0, -2px)',
        }
    },
    image: (randomImageUrl) => ({
        width: '100%',
        height: '150px',
        backgroundColor: theme.palette.grey[300],
        backgroundImage: `url(${randomImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '4px',
        marginBottom: theme.spacing(1),
        animation: 'skeleton 1s ease-in-out infinite alternate',
        '@keyframes skeleton': {
            '0%': {
                backgroundColor: theme.palette.grey[300],
            },
            '100%': {
                backgroundColor: theme.palette.grey[100],
            }
        },
    }),
    textLine: {
        marginBottom: theme.spacing(1),
        color: theme.palette.text.secondary,
        cursor: 'text'
    },
    objectivityScore: {
        color: theme.palette.text.secondary,
        margin: 'auto',
        marginBottom: theme.spacing(1),
    },
    viewReportButton: {
        width: '100%',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}

export async function getServerSideProps(context) {
    const { req } = context;
    const host = req?.headers?.host
    const { page = 1 } = context.query;
    const url = `http://${host}/${PATH}?page=${page}`;

    try {
        const res = await fetch(url);
        const { data } = await res.json();
        const { allReports, isLastPage } = data;

        const date = new Date().toLocaleString();

        return { props: { allReports, isLastPage, date } }
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
