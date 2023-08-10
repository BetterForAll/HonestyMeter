import { Box } from '@mui/material';
import React, { memo } from 'react'
import theme from '@/theme';
import ReportWrapper from '@/components/Report/ReportWrapper';
import ReportLoading from '@/components/Report/ReportLoading';
import usePageLoading from '@/hooks/usePageLoading';
import Head from 'next/head';
import { BASE_URL } from '@/constants/constants';

//Draft page, just to test the API

const PATH = 'api/saved_report';



function SavedReport({ homePageProps, report }) {
    const { shareLevel, closeReport } = homePageProps
    const isLoading = usePageLoading();

    const LOGO_URL = './public/favicon.ico';

    const HtmlHead = (
        <Head>
            <title>This is a title</title>
            <meta name="description" content='this is the content' />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content="Honesty Meter" />
            <meta property="og:description" content="AI powered tool for bias detection" />
            <meta property="og:url" content="http://honestymeter.com" />
            <meta property="og:image" content="./opengraph-logo.png" />
            <meta property="og:type" content="article" />
            <link rel="shortcut icon" href={LOGO_URL} />
            <link rel="canonical" href={BASE_URL} />
        </Head>
    )

    return (
        <>
            {HtmlHead}
            <Box sx={STYLES.container}>
                {
                    isLoading ? <ReportLoading />
                        :
                        <ReportWrapper
                            report={report}
                            showArticleInput={closeReport}
                            shareLevel={shareLevel} />
                }
            </Box>
        </>
    )
}



const STYLES = {
    container: {
        width: '100%',
        margin: '0 auto auto',
        padding: theme.spacing(2),
    },
}

export async function getServerSideProps(context) {
    const { req } = context;
    const reportId = context.params.reportId
    const host = req?.headers?.host
    const url = `http://${host}/${PATH}?id=${reportId}`;

    try {
        const res = await fetch(url);
        const { data: reportJson } = await res.json();
        const report = JSON.parse(reportJson);

        return { props: { report } }
    } catch (error) {
        console.log({ error })
    }
}

export default memo(SavedReport)
