/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import va from '@vercel/analytics';
import theme from '@/theme';
import { Box, Typography } from '@mui/material';
import { scrollToTop, scrollToBottom, capitalizeFirstLetterOfEachWord, getQueryStringByAsPath } from '../../../utils/utils';
import Share from '@/components/Share';
import AtricleInput from '@/components/ArticleInput';
import Disclamer from '@/components/Disclamer';
import { API_URL, BASE_URL, EMPTY_STRING, EVENT, WOLRD_NEWS_API_URL } from '@/constants/constants';
import ReportList from '@/components/ReportList/ReportList';
import usePageLoadingFull from '@/hooks/usePageLoadingFull';
import Pagination from '@/components/Layout/Pagination';
import { array, bool, string, object } from 'prop-types';
import CreateReportButton from '@/components/Layout/CreateReportButton';
import BackButton from '@/components/Layout/BackButton';
import { useRouter } from 'next/router';

const LOGO_URL = './favicon.png';
const OPEN_GRAPH_IMAGE_URL = './opengraph-logo.png';
const TWITTER_IMAGE_URL = './favicon.png';
const SHARING_CONTEXT = 'app';
const TEXTS = {
  title: 'News Integrity Feed',
  subtitle: (name) => `News Integrity Feed for ${name}`,
  poweredBy: 'news api powered by newsdata.io',
  newReport: 'Create new bias report',
  cancelNewReport: 'Cancel new report',
  honestyMeter: 'Honesty Meter',
  error: 'Something went wrong. Please try again later.',
  desciptiion: (name) =>
    `Latest news about ${name} analysed for bias and objectivity by Honesty Meter - free AI power framework for bias detection.`,
  ogDescription: 'AI powered tool for bias detection',
  shareTitle:
    'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
  shareDescription:
    'HonestyMeter - Check media content for objectivity and bias.',
  shareHashTags: ['HonestyMeter', 'MediaBias', 'FakeNews'],
  noReportsYet: 'No reports yet',
  articleTextExtracted: 'text extraction by url powered by',
  worldNewsApi: 'world news api',
  backButton: 'Back To People Index',
};

export default function PersonPage({ homePageProps, reports, page, name, nameUrl, isFirstPage, isLastPage }) {
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
  const isReportListEmpty = reports.length === 0;
  const shouldShowBottomControls = reports.length > 8;
  const nameCapitalized = capitalizeFirstLetterOfEachWord(name);
  const router = useRouter();
  const { asPath } = router || {};
  const htmlHead = getHtmlHead({ nameCapitalized, nameUrl, asPath });

  const onCardClick = (reportUrl) => () => {
    va.track(EVENT.reportCardClicked, { reportUrl });
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

  useEffect(() => {
    va.track(EVENT.personPageLoaded(nameCapitalized), { page });
  }, [nameCapitalized, page]);

  return (
    <>
      {htmlHead}
      {
        <Box sx={STYLES.container}>
          <Typography variant='h1' sx={STYLES.title}>
            {nameCapitalized}
          </Typography>
          <Typography variant='h2' sx={STYLES.subtitle}>
            {TEXTS.subtitle(nameCapitalized)}
          </Typography>
          {!isReportListEmpty && (
            <Typography variant='body1' sx={STYLES.poweredBy}>
              ({TEXTS.poweredBy})
            </Typography>
          )}
          {
            <BackButton text={TEXTS.backButton} goTo='/people' />
          }
          <Box sx={{ marginBottom: 2 }}>
            <CreateReportButton
              onClick={toggleArticleInput(true)}
              isArticleInputShown={isArticleInputShown}
            />
          </Box>

          {isArticleInputShown && (
            <Box sx={STYLES.articleInputContainer}>
              {isUrlProvidedAsInput && (
                <Typography
                  sx={{
                    margin: 'auto',
                    textAlign: 'center',
                    marginBottom: theme.spacing(2),
                    marginTop: theme.spacing(-2),
                    fontSize: theme.typography.fontSize * 0.75,
                    color: theme.palette.text.secondary,
                    ' & a': {
                      color: theme.palette.text.secondary,
                    },
                  }}
                >
                  {TEXTS.articleTextExtracted}
                  &nbsp;
                  <a href={WOLRD_NEWS_API_URL} target='_blank' rel='1400pxreferrer'>
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
          {isReportListEmpty ? (
            <Box sx={STYLES.noReportsContainer}>
              <Typography variant='body1' sx={STYLES.noReportsText}>
                {TEXTS.noReportsYet}
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
            <Box sx={STYLES.paginationContainer}>
              <Pagination {...{ page, isFirstPage, isLastPage }} isScrollUpIconShown />
            </Box>
          )}

          {shouldShowBottomControls && (
            <CreateReportButton
              onClick={toggleArticleInput(false)}
              isArticleInputShown={isArticleInputShown}
            />
          )}
          {isArticleInputShown && (
            <Box sx={STYLES.articleInputContainer}>
              {isUrlProvidedAsInput && (
                <Typography
                  sx={{
                    margin: 'auto',
                    textAlign: 'center',
                    marginBottom: theme.spacing(2),
                    marginTop: theme.spacing(-2),
                    fontSize: theme.typography.fontSize * 0.75,
                    color: theme.palette.text.secondary,
                    ' & a': {
                      color: theme.palette.text.secondary,
                    },
                  }}
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
            shouldShowBottomControls && (
              <BackButton text={TEXTS.backButton} goTo='/people' />
            )
          }

        </Box >
      }
      <Share
        title={TEXTS.shareTitle}
        url={BASE_URL}
        description={TEXTS.shareDescription}
        hashTags={TEXTS.shareHashTags}
        context={SHARING_CONTEXT}
      />
      {isFirstPage && <Disclamer />}
    </>
  );
}

PersonPage.propTypes = {
  reports: array,
  isLastPage: bool,
  date: string,
  homePageProps: object,
  name: string,
  nameUrl: string,
};

function getHtmlHead({ nameCapitalized, nameUrl, asPath }) {
  const queryString = getQueryStringByAsPath(asPath);
  const canonicalUrl = `${BASE_URL}/people/${nameUrl}${queryString}`;

  return (
    <Head>
      <title>{`${nameCapitalized} - ${TEXTS.honestyMeter}`}</title>
      <meta name='description' content={TEXTS.desciptiion(nameCapitalized)} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={nameCapitalized} />
      <meta property='og:description' content={TEXTS.subtitle(nameCapitalized)} />
      <meta property='og:url' content={BASE_URL} />
      <meta property='og:image' content={OPEN_GRAPH_IMAGE_URL} />
      <meta property='twitter:image' content={TWITTER_IMAGE_URL} />
      <link rel='shortcut icon' href={LOGO_URL} />
      <link rel='canonical' href={canonicalUrl} />
    </Head>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const host = req?.headers?.host;
  const { page = 1, name = '' } = context.query;
  const isFirstPage = page == 1;
  const formattedName = name.replace(/-/g, ' ');
  const url = `http://${host}/${API_URL.SAVED_REPORT}?page=${page}&searchTerm=${formattedName}`;

  try {
    const res = await fetch(url);
    const { data } = await res.json();
    const { reports, isLastPage } = data;

    const date = new Date().toLocaleString();

    return { props: { reports, page, name: formattedName, nameUrl: name, isFirstPage, isLastPage, date } };
  } catch (error) {
    console.log({ error });
  }
}

const STYLES = {
  container: {
    width: '100%',
    maxWidth: { xs: '100%', sm: '1400px' },
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
    fontWeight: theme.typography.fontWeightRegular,
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
    alignSelf: 'center',
  },
  newReportButton: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    minWidth: '266px',
  },
  articleInputContainer: {
    width: '100%',
    margin: '0 auto auto',
    padding: theme.spacing(0, 2, 2, 2),
  },
  noReportsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  backButton: {
    margin: theme.spacing(1, 0, 3),
    display: 'flex',
    alignItems: 'center',
  },
  paginationContainer: {
    marginBottom: 2
  }
};
