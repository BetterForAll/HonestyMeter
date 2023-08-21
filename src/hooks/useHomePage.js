import va from '@vercel/analytics';
import { useState, useEffect, useMemo } from 'react';
import {
    fetchReport,
    mockFetchReport // for testing
} from '../services/reportService'
import { EMPTY_STRING, EVENT } from "@/constants/constants";
import { checkIsUrl, scrollToTop } from '@/utils/utils';
import { useRouter } from 'next/router';

const IS_TESTING_MODE = true;
const ARTICLE_DEFAULT_VALUE = ''
const TEXTS = {
    honestyMeter: 'Honesty Meter',
    error: 'Something went wrong. Please try again later.',
    parseError: 'Error parsing report. Try to copy the article and paste it in the input field.',
    enterArticle: 'Enter article',
    desciptiion: 'Honesty Meter is a tool that helps you discover the truth behind the news.',
}

const REPORT_STATIC_PATH = '/report/?report='
const SAVED_REPORT_STATIC_PATH = '/report/'

export default function useHomePage() {
    const router = useRouter();
    const query = useMemo(() => router?.query, [router?.query]) || {};
    const { report: reportFromQuery, shareLevel = 0 } = query || {};
    const [isLoading, setLoading] = useState(false);
    const [article, setArtilce] = useState(ARTICLE_DEFAULT_VALUE);
    const parsedReportFromQuery = useMemo(() => {
        if (!reportFromQuery) {
            return null;
        }

        try {
            return JSON.parse(reportFromQuery);
        } catch (e) {
            router.query = {};
            router.push('/');
            alert(TEXTS.error, e); //TODO: replace with error component

            return null;
        }
    }, [reportFromQuery, router])
    const [report, setReport] = useState(null);
    const [reportJson, setReportJson] = useState(EMPTY_STRING);
    const isArticleInputShown = !isLoading && !report && !reportFromQuery;
    const isReportShown = Boolean(!isLoading && (report || parsedReportFromQuery));
    const { score, articleTitle, articleLink } = report || {};
    const isUrlProvidedAsInput = checkIsUrl(article);

    const goToHomePage = () => {
        router.push('/');
    }

    const closeReport = () => {
        va.track(EVENT.closeReportClicked, { score, articleTitle, articleLink });

        goToHomePage();
        clearArticleInput();
        scrollToTop();
    }

    const clearArticleInput = () => {
        setArtilce(EMPTY_STRING);
    }

    const handleArticleChange = (e) => {
        setArtilce(e.target.value);
    }

    const getMockReport = async () => {
        router.push('/report');
        const responseText = await mockFetchReport();
        const reportJsonRes = JSON.stringify(responseText);
        setReportJson(reportJsonRes);
        const reportPath = `${REPORT_STATIC_PATH}${reportJsonRes}`;
        router.push(reportPath);
    }

    const getRealReport = async () => { //TODO: refactor and clean up this function
        router.push(SAVED_REPORT_STATIC_PATH);
        const { reportId } = await fetchReport(article) || {};

        va.track(EVENT.reportReceived, { reportId });

        router.push(`${SAVED_REPORT_STATIC_PATH}${reportId}`);
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
                va.track(EVENT.reportRequested, { isUrlProvidedAsInput });

                await getRealReport();
            }
        } catch (error) {
            va.track(EVENT.reportError, { error });

            console.error(error);
            goToHomePage()
            alert(TEXTS.error) //TODO: replace with error component
        }

        setLoading(false);
    };


    useEffect(() => {
        if (!parsedReportFromQuery) {
            return;
        }

        setReport(parsedReportFromQuery);
        setReportJson(reportFromQuery);

        const isShared = shareLevel > 0;

        if (isShared) {
            va.track(EVENT.sharedReportViewed, { shareLevel: parseInt(shareLevel) });
        }

    }, [parsedReportFromQuery, reportFromQuery, shareLevel]);

    return {
        isArticleInputShown,
        isLoading,
        isReportShown,
        article,
        isUrlProvidedAsInput,
        report,
        reportJson,
        shareLevel,
        clearArticleInput,
        closeReport,
        handleArticleChange,
        handleGetReport
    }
}
