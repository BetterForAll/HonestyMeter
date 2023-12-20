import { Box } from '@mui/material';
import React, { memo } from 'react'
import theme from '@/theme';
import ReportWrapper from '@/components/Report/ReportWrapper';
import ReportLoading from '@/components/Report/ReportLoading';
import usePageLoading from '@/hooks/usePageLoading';
import Head from 'next/head';
import reportPropType from '@/components/Report/reportPropTypes';
import { getReportShareTitle, getSavedReportUrl } from '@/components/Report/reportUtils';
import { API_URL } from '@/constants/constants';
import { getBaseUrlFromUrlString } from '@/utils/utils';

const LOGO_URL = 'https://honestymeter.com/favicon.ico';
const OPEN_GRAPH_IMAGE_URL = 'https://honestymeter.com/opengraph-logo.png';
const TEXTS = {
    objectivityReport: (articleTitle, source) => `'${articleTitle}' by ${source} - Bias Report by HonestyMeter - free AI powered bias detection framework`,
    biasReport: 'Bias Report',
    objectivityScore: 'Objectivity score',
}

function SavedReport({ homePageProps, report = {}, host }) {
    const { shareLevel, closeReport } = homePageProps
    const isLoading = usePageLoading();
    const { explanation = '', articleTitle = '', articleLink = '', _id: reportId, score } = report;
    const title = getReportShareTitle(articleTitle, score);
    const url = getSavedReportUrl(host, reportId);
    const source = getBaseUrlFromUrlString(articleLink);


    const HtmlHead = (
        <Head>
            <title>{TEXTS.objectivityReport(articleTitle, source)}</title>
            <meta name="description" content={explanation} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={explanation} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={OPEN_GRAPH_IMAGE_URL} />
            <meta property="og:type" content="article" />
            <meta property="twitter:image" content={OPEN_GRAPH_IMAGE_URL} />
            <link rel="shortcut icon" href={LOGO_URL} />
            <link rel="canonical" href={url} />
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

SavedReport.propTypes = {
    report: reportPropType
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
    const url = `http://${host}/${API_URL.SAVED_REPORT}?id=${reportId}`;

    try {
        const res = await fetch(url);
        const { data: reportJson } = await res.json() || {};
        const report = reportJson?.reports || {};

        return { props: { report, host } }
    } catch (error) {
        console.log({ error })
    }
}

export default memo(SavedReport)
