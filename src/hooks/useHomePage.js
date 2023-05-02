import va from '@vercel/analytics';
import { useState } from 'react';
import { fetchReport, mockFetchReport } from '../services/reportService' //mockFetchReport is for testing
import { EMPTY_STRING } from "@/constants/constants";
import { scrollToTop } from '@/utils/utils';

const IS_TESTING_MODE = false;
const ARTICLE_DEFAULT_VALUE = ''
const TEXTS = {
    honestyMeter: 'Honesty Meter',
    error: 'Something went wrong. Please try again later.',
    desciptiion: 'Honesty Meter is a tool that helps you discover the truth behind the news.',
}
const EVENT = {
    reportRequested: 'Report requested',
    reportReceived: 'Report received',
    reportParsed: 'Report parsed',
    reportError: 'Report error',
}

export default function useHomePage() {
    const [isLoading, setLoading] = useState(false);
    const [article, setArtilce] = useState(ARTICLE_DEFAULT_VALUE);
    const [report, setReport] = useState(null);
    const isArticleInputShown = !isLoading && !report;
    const isReportShown = Boolean(!isLoading && report);

    const closeReport = () => {
        setReport(null);
        setArtilce(EMPTY_STRING);
        scrollToTop()
    }

    const handleArticleChange = (e) => {
        setArtilce(e.target.value);
    }

    const getMockReport = async () => {
        const reportRes = await mockFetchReport();
        setReport(reportRes);
    }

    const getRealReport = async () => { //TODO: refactor and clean up this function
        const reportRes = await fetchReport(article);
        const reportResTrimmed = reportRes.trim();
        va.track(EVENT.reportReceived, { report: reportResTrimmed });

        const isResponseInJsonFormat = reportResTrimmed.startsWith('{') //TODO: improve this check (take into account possibility of multiple '\n' at the end)

        if (!isResponseInJsonFormat) {
            va.track(EVENT.reportError, { error: reportResTrimmed });
            alert(reportResTrimmed); //TODO: replace with error component

            return;
        }

        const parsedReport = JSON.parse(reportResTrimmed);

        const isInputError = Boolean(parsedReport?.errors?.length);

        if (isInputError) {
            const errorListString = parsedReport.errors.join(',\n');
            va.track(EVENT.reportError, { error: errorListString });
            alert(errorListString); //TODO: replace with error component

            return;
        }

        va.track(EVENT.reportParsed, { report: reportResTrimmed });

        setReport(parsedReport);
    }

    const handleGetReport = async () => {
        setLoading(true);

        if (!article) {
            alert(TEXTS.enterArticleAlert);
            setLoading(false);
            return;
        }

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

    return {
        isArticleInputShown,
        isLoading,
        isReportShown,
        article,
        report,
        closeReport,
        handleArticleChange,
        handleGetReport
    }
}
