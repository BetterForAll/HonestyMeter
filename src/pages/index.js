/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import va from '@vercel/analytics';
import theme from '@/theme';
import {
  Box,
  Typography,
} from '@mui/material';
import { scrollToTop, scrollToBottom, capitalizeFirstLetterOfEachWord } from '../utils/utils';
import Share from '@/components/Share';
import AtricleInput from '@/components/ArticleInput';
import Disclamer from '@/components/Disclamer';
import { API_URL, BASE_URL, EMPTY_STRING, EVENT, STEPS, WOLRD_NEWS_API_URL } from '@/constants/constants';
import ReportList from '@/components/ReportList/ReportList';
import usePageLoadingFull from '@/hooks/usePageLoadingFull';
import Pagination from '@/components/Layout/Pagination';
import Search from '@/components/Layout/Search';
import useIsMobileClient from '@/hooks/useIsMobileClient';
import CreateReportButton from '@/components/Layout/CreateReportButton';
import BackButton from '@/components/Layout/BackButton';

const LOGO_URL = './favicon.png';
const OPEN_GRAPH_IMAGE_URL = './opengraph-logo.png';
const TWITTER_IMAGE_URL = './favicon.png';
const SHARING_CONTEXT = 'app';
const SEARCH_FIELD_ID = 'search-field-home';
const MINIMUM_CARDS_COUNT_TO_SHOW_BOTTOM_CTA = 8;
const TEXTS = {
  title: 'News Integrity Feed',
  subtitle: 'Top news analysed for bias by HonestyMeter',
  poweredBy: 'news api powered by newsdata.io',
  newReport: 'Create new bias report',
  cancelNewReport: 'Cancel new report',
  articleTitle: 'Article Title',
  source: 'Source',
  objectivityScore: 'Objectivity Score',
  viewReport: 'View Bias Report',
  imageAlt: 'Random illustration image',
  honestyMeter: 'Honesty Meter',
  error: 'Something went wrong. Please try again later.',
  desciptiion:
    'Honesty Meter is a tool that helps you discover the truth behind the news.',
  ogDescription: 'AI powered tool for bias detection',
  shareTitle:
    'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
  shareDescription:
    'HonestyMeter - Check media content for objectivity and bias.',
  shareHashTags: ['HonestyMeter', 'MediaBias', 'FakeNews'],
  noReportsFound: 'No reports found for',
  objectivityLevel: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  },
  articleTextExtracted: 'text extrasction by url powered by',
  worldNewsApi: 'world news api',
  people: 'People',
};

export default function Home({ homePageProps, reports, isLastPage, date }) {
  const router = useRouter();
  const pageFromQuery = parseInt(router.query.page) || 1;
  const searchFromQuery = router.query.person || '';
  const isFirstPage = pageFromQuery === 1;
  const isPaginationEnabled = !(isFirstPage && isLastPage);
  const isLoading = usePageLoadingFull();
  const {
    article,
    handleArticleChange,
    clearArticleInput,
    handleGetReport,
    isUrlProvidedAsInput,
  } = homePageProps;
  const [isArticleInputShown, setIsArticleInputShown] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const isMobile = useIsMobileClient();
  const isReportListEmpty = reports.length === 0;
  const shouldShowBottomCTA = reports.length > MINIMUM_CARDS_COUNT_TO_SHOW_BOTTOM_CTA || !isReportListEmpty && isMobile;

  const onCardClick = (reportUrl) => () => {
    va.track(EVENT.reportCardClicked, { reportUrl });

    router.push(reportUrl);
  };

  const toggleArticleInput = (isTop) => () => {
    const event = isArticleInputShown
      ? EVENT.cancelNewReportClicked
      : EVENT.generateNewReportClicked;

    va.track(event);

    clearArticleInput();
    setIsArticleInputShown(!isArticleInputShown);
    const scrollMethod = isTop ? scrollToTop : scrollToBottom;
    setTimeout(() => {
      scrollMethod();
    }, 0);
  };

  const handleSearchClick = () => {
    va.track(EVENT.searchClickedHomePage, { searchValue });

    const trimmedSearchValue = searchValue.trim();
    if (!trimmedSearchValue) return;


    const searchValueCapitalizedLetters = capitalizeFirstLetterOfEachWord(trimmedSearchValue);
    const url = `/?person=${searchValueCapitalizedLetters}`;
    router.push(url);

    setSearchValue(EMPTY_STRING);
  }

  const handleSearchFieldChange = (e) => setSearchValue(e.target.value);

  useEffect(() => {
    va.track(EVENT.pageLoaded, { page: pageFromQuery });
  }, [pageFromQuery]);

  return (
    <>
      {HtmlHead}
      {
        <Box sx={REPORTS_STYLES.container} key={reports}>
          <Typography variant='h2' sx={REPORTS_STYLES.title}>
            {TEXTS.title}
          </Typography>
          <Typography variant='body1' sx={REPORTS_STYLES.subtitle}>
            {TEXTS.subtitle}
          </Typography>
          <Search
            id={SEARCH_FIELD_ID}
            onClick={handleSearchClick}
            onChange={handleSearchFieldChange}
            value={searchValue} />
          <Typography variant='body1' sx={REPORTS_STYLES.poweredBy}>
            ({TEXTS.poweredBy})
          </Typography>
          <CreateReportButton
            onClick={toggleArticleInput(true)}
            isArticleInputShown={isArticleInputShown}
          />
          {isArticleInputShown && (
            <Box sx={REPORTS_STYLES.articleInputContainer}>
              {isUrlProvidedAsInput && (
                <Typography
                  sx={STYLES.articleTextExtracted}
                >
                  {TEXTS.articleTextExtracted}
                  &nbsp;
                  <a href={WOLRD_NEWS_API_URL} target='_blank' rel='noreferrer'>
                    {TEXTS.worldNewsApi}
                  </a>
                </Typography>
              )}

              <AtricleInput
                article={article}
                onArticleChange={handleArticleChange}
                onGetReport={handleGetReport}
                isUrlProvidedAsInput={isUrlProvidedAsInput}
              />
            </Box>
          )}
          {
            searchFromQuery && <BackButton goTo='/' />
          }
          {isReportListEmpty ? (
            <Box sx={REPORTS_STYLES.noReportsContainer}>
              <Typography variant='body1' sx={REPORTS_STYLES.noReportsText}>
                {`${TEXTS.noReportsFound} "${searchFromQuery}"`}
              </Typography>
            </Box>
          ) : (
            <ReportList
              reports={reports}
              onCardClick={onCardClick}
              isLoading={isLoading}
            />
          )}
          {isPaginationEnabled && (
            <Pagination {...{ isFirstPage, isLastPage }} />
          )}
          {
            shouldShowBottomCTA &&
            <CreateReportButton
              onClick={toggleArticleInput(false)}
              isArticleInputShown={isArticleInputShown}
            />
          }
          {
            searchFromQuery && shouldShowBottomCTA && <BackButton />
          }
          {isArticleInputShown && (
            <Box sx={REPORTS_STYLES.articleInputContainer}>
              <AtricleInput
                article={article}
                onArticleChange={handleArticleChange}
                onGetReport={handleGetReport}
              />
            </Box>
          )}
          <Share
            title={TEXTS.shareTitle}
            url={BASE_URL}
            description={TEXTS.shareDescription}
            hashTags={TEXTS.shareHashTags}
            context={SHARING_CONTEXT}
          />
        </Box>
      }
      {isFirstPage && <Disclamer />}
    </>
  );
}

const HtmlHead = (
  <Head>
    <title>{TEXTS.honestyMeter}</title>
    <meta name='description' content={TEXTS.desciptiion} />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta property='og:type' content='website' />
    <meta property='og:title' content={TEXTS.honestyMeter} />
    <meta property='og:description' content={TEXTS.ogDescription} />
    <meta property='og:url' content={BASE_URL} />
    <meta property='og:image' content={OPEN_GRAPH_IMAGE_URL} />
    <meta property='twitter:image' content={TWITTER_IMAGE_URL} />
    <link rel='shortcut icon' href={LOGO_URL} />
    <link rel='canonical' href={BASE_URL} />
  </Head>
);

export async function getServerSideProps(context) {
  const { req } = context;
  const host = req?.headers?.host;
  const { page = 1, person = '' } = context.query;
  const url = `http://${host}/${API_URL.SAVED_REPORT}?page=${page}&person=${person}`;

  try {
    const res = await fetch(url);
    const { data } = await res.json();
    const { reports, isLastPage } = data;

    const date = new Date().toLocaleString();

    return { props: { reports, isLastPage, date } };
  } catch (error) {
    console.log({ error });
  }
}

const REPORTS_STYLES = {
  container: {
    maxWidth: '1400px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
  },
  date: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(2, 0, 1, 0),
    fontSize: theme.typography.fontSize * 0.875,
  },
  title: {
    fontSize: theme.typography.fontSize * 2,
    margin: theme.spacing(2, 0, 1),
  },
  subtitle: {
    fontSize: theme.typography.fontSize * 0.875,
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 2, 0.5, 2),
    textAlign: 'center',
  },
  poweredBy: {
    fontSize: theme.typography.fontSize * 0.75,
    color: theme.palette.text.secondary,
    opacity: 0.8,
    textAlign: 'center',
    margin: theme.spacing(0, 2, 2, 2),
  },
  articleInputContainer: {
    width: '100%',
    margin: '0 auto auto',
    padding: theme.spacing(0, 2, 2, 2),
  },
  articleTextExtracted: {
    margin: 'auto',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(-2),
    fontSize: theme.typography.fontSize * 0.75,
    color: theme.palette.text.secondary,
    ' & a': {
      color: theme.palette.text.secondary,
    },
  },
  noReportsContainer: {
    margin: theme.spacing(2, 0),
  }
};
