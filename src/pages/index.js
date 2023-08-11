import Head from "next/head";
import React from 'react';
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
  ogDescription: 'AI powered tool for bias detection',
}
const LOGO_URL = './public/'
const OPEN_GRAPH_IMAGE_URL = './opengraph-logo.png'
const TWITTER_IMAGE_URL = './favicon.png'


export default function Home({
  homePageProps
}) {

  const {
    article,
    handleArticleChange,
    handleGetReport,
  } = homePageProps;

  return (
    <Box component="main" sx={STYLES.container} >
      {HtmlHead}
      <>
        <AtricleInput
          article={article}
          onArticleChange={handleArticleChange}
          onGetReport={handleGetReport} />
        <Disclamer />
        <Share />
      </>
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
    <meta property="og:type" content="website" />
    <meta property="og:title" content={TEXTS.honestyMeter} />
    <meta property="og:description" content={TEXTS.ogDescription} />
    <meta property="og:url" content={BASE_URL} />
    <meta property="og:image" content={OPEN_GRAPH_IMAGE_URL} />
    <meta property="twitter:image" content={TWITTER_IMAGE_URL} />
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




