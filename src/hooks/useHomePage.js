import { useState } from 'react';
import { fetchReport, mockFetchReport } from '../services/reportService' //mockFetchReport is for testing
import { EMPTY_STRING } from "@/constants/constants";

const IS_TESTING_MODE = true;
const ARTICLE_DEFAULT_VALUE = ''
const TEXTS = {
    honestyMeter: 'Honesty Meter',
    error: 'Something went wrong. Please try again later.',
    desciptiion: 'Honesty Meter is a tool that helps you discover the truth behind the news.',
}
export default function useHomePage() {
    const [isLoading, setLoading] = useState(false);
    const [article, setArtilce] = useState(ARTICLE_DEFAULT_VALUE);
    const [report, setReport] = useState(null);
    const isArticleInputShown = !isLoading && !report;
    const isReportShown = !isLoading && report;

    const closeReport = () => {
        setReport(null);
        setArtilce(EMPTY_STRING);
    }

    const handleArticleChange = (e) => {
        setArtilce(e.target.value)
    }

    const getMockReport = async () => {
        const reportRes = await mockFetchReport();
        setReport(reportRes);
    }

    const getRealReport = async () => {
        const reportRes = await fetchReport(article);
        const parsedReport = JSON.parse(reportRes);
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
                await getRealReport();
            }
        } catch (error) {
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
