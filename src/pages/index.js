import Head from "next/head";
import React from 'react';
import ReportWrapper from '@/components/Report/ReportWrapper';
import ReportLoading from "@/components/Report/ReportLoading";
import AtricleInput from "@/components/ArticleInput";
import { Box } from "@mui/material";
import theme from '@/theme'
import Disclamer from "@/components/Disclamer";
import { bool, string, func, shape } from 'prop-types';
import reportPropType from "@/components/Report/reportPropTypes";
import Share from "@/components/Share";
import { BASE_URL } from "@/constants/constants";

const TEXTS = {
  honestyMeter: 'Honesty Meter',
  error: 'Something went wrong. Please try again later.',
  desciptiion: 'Honesty Meter is a tool that helps you discover the truth behind the news.',
}
const LOGO_URL = './public/favicon.ico'

export default function Home({
  homePageProps
}) {

  const {
    isArticleInputShown,
    isLoading,
    isReportShown,
    article,
    report,
    closeReport,
    handleArticleChange,
    handleGetReport,
  } = homePageProps;

  return (
    <Box component="main" sx={STYLES.container} >
      {HtmlHead}
      {
        isArticleInputShown &&
        <>
          <AtricleInput
            article={article}
            onArticleChange={handleArticleChange}
            onGetReport={handleGetReport} />
          <Disclamer />
          <Share />
        </>
      }
      {
        isLoading &&
        <ReportLoading />
      }
      {
        isReportShown &&
        <ReportWrapper report={report} showArticleInput={closeReport} />
      }
    </Box>
  );
}

Home.propTypes = {
  homePageProps: shape({
    isArticleInputShown: bool,
    isLoading: bool,
    isReportShown: bool,
    article: string,
    report: reportPropType,
    closeReport: func,
    handleArticleChange: func,
    handleGetReport: func,
  })
}

const HtmlHead = (
  <Head>
    <title>{TEXTS.honestyMeter}</title>
    <meta name="description" content={TEXTS.desciptiion} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href={LOGO_URL} />
    <link rel="canonical" href={BASE_URL} />
  </Head>
)

const STYLES = {
  container: {
    width: '100%',
    margin: '0 auto auto',
    padding: theme.spacing(2),
  },
}




