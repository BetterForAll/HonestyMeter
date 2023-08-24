/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import va from '@vercel/analytics';
import theme from '@/theme';
import { Box, Button, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { scrollToTop, scrollToBottom } from '../../../utils/utils';
import Share from '@/components/Share';
import AtricleInput from '@/components/ArticleInput';
import Disclamer from '@/components/Disclamer';
import { API_URL, BASE_URL, EVENT, SPACE, WOLRD_NEWS_API_URL } from '@/constants/constants';
import ReportList from '@/components/ReportList/ReportList';
import usePageLoadingFull from '@/hooks/usePageLoadingFull';
import Pagination from '@/components/Layout/Pagination';
import { array, bool, string, object } from 'prop-types';

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
  desciptiion:
    'Honesty Meter is a tool that helps you discover the truth behind the news.',
  ogDescription: 'AI powered tool for bias detection',
  shareTitle:
    'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
  shareDescription:
    'HonestyMeter - Check media content for objectivity and bias.',
  shareHashTags: ['HonestyMeter', 'MediaBias', 'FakeNews'],
  noReportsYet: 'No reports yet',
  articleTextExtracted: 'text extrasction by url powered by',
  worldNewsApi: 'world news api',
};

const STEPS = {
  forward: 1,
  back: -1,
};


export default function Home({ homePageProps, reports, isLastPage, date }) {
  const router = useRouter();
  const pageFromQuery = parseInt(router.query.page) || 1;
  const isFirstPage = pageFromQuery === 1;
  const name = router.query.name || '';
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

  const onCardClick = (reportUrl) => () => {
    va.track(EVENT.reportCardClicked, { reportUrl });

    router.push(reportUrl);
  };

  const onChangePage = (step) => () => {
    const event =
      step === STEPS.forward
        ? EVENT.nextPageClicked
        : EVENT.previousPageClicked;
    va.track(event, { page: pageFromQuery });

    const nextPage = parseInt(pageFromQuery) + step;
    router.query.page = nextPage;
    router.push(router);
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
    va.track(EVENT.pageLoaded, { page: pageFromQuery });
  }, [pageFromQuery]);

  return (
    <>
      {HtmlHead}
      {
        <Box sx={STYLES.container} key={reports}>
          <Typography variant='h2' sx={STYLES.title}>
            {name}
          </Typography>
          <Typography variant='body1' sx={STYLES.subtitle}>
            {TEXTS.subtitle(name)}
          </Typography>
          {!isReportListEmpty && (
            <Typography variant='body1' sx={STYLES.poweredBy}>
              ({TEXTS.poweredBy})
            </Typography>
          )}
          {
            <Button
              variant='text'
              sx={{
                margin: theme.spacing(1, 0, 3),
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => {
                router.push('/people');
              }}
            >
              <ChevronLeftIcon />
              <Typography>Back To People Index</Typography>
            </Button>
          }
          <CreateReportButton
            onClick={toggleArticleInput(true)}
            isArticleInputShown={isArticleInputShown}
          />

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
            <Pagination {...{ isFirstPage, onChangePage, isLastPage }} />
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
              <Button
                variant='text'
                sx={{
                  margin: theme.spacing(1, 0, 3),
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => {
                  router.push('/people');
                }}
              >
                <ChevronLeftIcon />
                <Typography>Back To People Index</Typography>
              </Button>
            )}

        </Box>
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

Home.propTypes = {
  reports: array,
  isLastPage: bool,
  date: string,
  homePageProps: object,
};

function CreateReportButton({ onClick, isArticleInputShown }) {
  const text = isArticleInputShown ? TEXTS.cancelNewReport : TEXTS.newReport;

  return (
    <Button
      variant='outlined'
      onClick={onClick}
      sx={STYLES.newReportButton}
    >
      {text}
    </Button>
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
  const { page = 1, name = '' } = context.query;
  const url = `http://${host}/${API_URL.SAVED_REPORT}?page=${page}&person=${name}`;

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

const STYLES = {
  container: {
    width: '100%',
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
};
