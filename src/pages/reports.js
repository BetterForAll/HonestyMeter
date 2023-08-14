
import React from 'react'
import { getBaseUrl, getBaseUrlFromUrlString } from '../utils/utils'
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import theme from '@/theme';



// Draft page, just to test the API

const baseUrl = getBaseUrl();
const PATH = 'api/saved_reports'
const URL = `${baseUrl}${PATH}`;

export default function Reports({ allReports }) {
    const router = useRouter();


    const onCardClick = (reportUrl) => () => {
        router.push(reportUrl);
    }

    return (
        <Box sx={STYLES.container}>
            <Button variant="outlined" onClick={createReport}>CREATE NEW REPORT</Button>
            <h2>New Reports</h2>
            {
                <List sx={STYLES.list}>
                    {
                        allReports.map((report) => {
                            const source = getBaseUrlFromUrlString(report.articleLink);
                            const reportUrl = `${baseUrl}report/${report._id}`
                            return (
                                report.articleLink &&
                                <ListItem key={report._id} sx={STYLES.listItem}>
                                    <Typography><b>Article Title:</b> {report.articleTitle}</Typography>
                                    <Typography target="_blank"><b>Source:&nbsp; </b>{source}</Typography>
                                    <Typography><b>Objectivity Score:</b> {report.score}</Typography>
                                    <Button variant='outlined' onClick={onCardClick(reportUrl)}>View Report</Button>
                                </ListItem>
                            )
                        })
                    }
                </List>
            }
            <Button variant="outlined" onClick={createReport}>CREATE NEW REPORT</Button>
        </Box>

    )
}

const STYLES = {
    container: {
        '& > *': {
            marign: 0,
            padding: 0,
        }
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: theme.spacing(2),
        gap: theme.spacing(2),
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
