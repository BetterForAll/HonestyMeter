import va from '@vercel/analytics';
import { useState, useEffect, useMemo } from 'react';
import {
    fetchReport,
    mockFetchReport // for testing
} from '../services/reportService'
import { EMPTY_STRING } from "@/constants/constants";
import { scrollToTop } from '@/utils/utils';
import { useRouter } from 'next/router';

const IS_TESTING_MODE = false;
const ARTICLE_DEFAULT_VALUE = ''
const TEXTS = {
    honestyMeter: 'Honesty Meter',
    error: 'Something went wrong. Please try again later.',
    enterArticle: 'Enter article',
    desciptiion: 'Honesty Meter is a tool that helps you discover the truth behind the news.',
}
const EVENT = {
    reportRequested: 'Report requested',
    reportReceived: 'Report received',
    reportParsed: 'Report parsed',
    reportError: 'Report error',
}

const REPORT_STATIC_PATH = '/report/?report='

export default function useHomePage() {
    const router = useRouter();
    const query = router?.query || {};
    const { report: reportFromQuery } = query || {};
    const parsedReportFromQuery = useMemo(() => reportFromQuery ? JSON.parse(reportFromQuery) : null, [reportFromQuery])
    const [isLoading, setLoading] = useState(false);
    const [article, setArtilce] = useState(ARTICLE_DEFAULT_VALUE);
    const [report, setReport] = useState(null);
    const [reportJson, setReportJson] = useState(EMPTY_STRING);
    const isArticleInputShown = !isLoading && !report && !reportFromQuery;
    const isReportShown = Boolean(!isLoading && (report || parsedReportFromQuery));


    const closeReport = () => {
        router.push('/');

        setArtilce(EMPTY_STRING);
        scrollToTop()
    }

    const handleArticleChange = (e) => {
        setArtilce(e.target.value);
    }

    const getMockReport = async () => {
        router.push('/report');
        const reportRes = await mockFetchReport();
        const reportJsonRes = JSON.stringify(reportRes);
        setReportJson(reportJsonRes);
        const reportPath = `${REPORT_STATIC_PATH}${reportJsonRes}`;
        router.push(reportPath);
    }

    const getRealReport = async () => { //TODO: refactor and clean up this function
        router.push('/report');
        const reportRes = await fetchReport(article);
        const reportResTrimmed = reportRes.trim();
        va.track(EVENT.reportReceived, { report: reportResTrimmed });

        const isResponseInJsonFormat = reportResTrimmed.startsWith('{') //TODO: improve this check (take into account possibility of multiple '\n' at the end)
        //TODO: replace BE logic with openai function call API - then this check will be redundant

        if (!isResponseInJsonFormat) {
            va.track(EVENT.reportError, { error: reportResTrimmed });
            alert(reportResTrimmed); //TODO: replace with error component

            return;
        }

        setReportJson(reportResTrimmed);

        const parsedReport = JSON.parse(reportResTrimmed);
        const isInputError = Boolean(parsedReport?.errors?.length);

        if (isInputError) {
            const errorListString = parsedReport.errors.join(',\n');
            va.track(EVENT.reportError, { error: errorListString });
            alert(errorListString); //TODO: replace with error component

            return;
        }

        va.track(EVENT.reportParsed, { report: reportResTrimmed });

        router.push(`/report/?report=${reportResTrimmed}`);
    }

    const handleGetReport = async () => {
        setReport(null);

        if (!article) {
            alert(TEXTS.enterArticle); //TODO: replace with error component
            return;
        }

        setLoading(true);

        try {
            if (IS_TESTING_MODE) {
                await getMockReport();
            } else {
                va.track(EVENT.reportRequested, { article });

                await getRealReport();
            }
        } catch (error) {
            va.track(EVENT.reportError, { error });

            console.error(error);
            alert(TEXTS.error) //TODO: replace with error component
        }

        setLoading(false);
    };


    useEffect(() => {
        if (!parsedReportFromQuery) {
            return;
        }

        setReport(parsedReportFromQuery);
    }, [parsedReportFromQuery]);

    return {
        isArticleInputShown,
        isLoading,
        isReportShown,
        article,
        report,
        reportJson,
        closeReport,
        handleArticleChange,
        handleGetReport
    }
}
