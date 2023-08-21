/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import va from '@vercel/analytics';
import theme from '@/theme';
import { Box, Button, Typography } from '@mui/material';
import usePageLoading from '@/hooks/usePageLoading';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { scrollToTop, scrollToBottom } from '../utils/utils'
import Share from '@/components/Share';
import AtricleInput from '@/components/ArticleInput';
import Disclamer from '@/components/Disclamer';
import { API_URL, BASE_URL, EVENT } from '@/constants/constants';
import ReportList from '@/components/ReportList/ReportList';

const LOGO_URL = './favicon.png'
const OPEN_GRAPH_IMAGE_URL = './opengraph-logo.png'
const TWITTER_IMAGE_URL = './favicon.png'
const SHARING_CONTEXT = 'app'
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
  desciptiion: 'Honesty Meter is a tool that helps you discover the truth behind the news.',
  ogDescription: 'AI powered tool for bias detection',
  shareTitle: 'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
  shareDescription: 'HonestyMeter - Check media content for objectivity and bias.',
  shareHashTags: ['HonestyMeter', 'MediaBias', 'FakeNews'],
  noReportsYet: 'No reports yet',
  objectivityLevel: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  },
  articleTextExtracted: 'text extrasction by url powered by',
  worldNewsApi: 'world news api',
}

const STEPS = {
  forward: 1,
  back: -1,
}

const WOLRD_NEWS_API_URL = 'https://worldnewsapi.com';

export default function Home({ homePageProps, reports, isLastPage, date }) {
  const router = useRouter();
  const pageFromQuery = parseInt(router.query.page) || 1;
  const isFirstPage = pageFromQuery === 1;
  const isPaginationEnabled = !(isFirstPage && isLastPage)
  const isLoading = usePageLoading();
  const {
    article,
    handleArticleChange,
    clearArticleInput,
    handleGetReport,
    isUrlProvidedAsInput
  } = homePageProps;
  const [isArticleInputShown, setIsArticleInputShown] = useState(false);

  const onCardClick = (reportUrl) => () => {
    va.track(EVENT.reportCardClicked, { reportUrl });

    router.push(reportUrl);
  }

  const onChangePage = (step) => () => {
    const event = step === STEPS.forward ? EVENT.nextPageClicked : EVENT.previousPageClicked;
    va.track(event, { page: pageFromQuery });

    const nextPage = parseInt(pageFromQuery) + step;
    router.query.page = nextPage;
    router.push(router);
  }

  const onStartClick = () => {
    va.track(EVENT.skipToFirstPageClicked, { page: pageFromQuery });

    router.push('/');
  }

  const toggleArticleInput = (isTop) => () => {
    const event = isArticleInputShown ?
      EVENT.cancelNewReportClicked :
      EVENT.generateNewReportClicked;

    va.track(event);

    if (isArticleInputShown) {
      clearArticleInput();
    }

    setIsArticleInputShown(!isArticleInputShown);
    const scrollMethod = isTop ? scrollToTop : scrollToBottom;
    setTimeout(() => {
      scrollMethod();
    }, 0)
  }

  useEffect(() => {
    va.track(EVENT.pageLoaded, { page: pageFromQuery });
  }, [pageFromQuery])

  if (reports.length === 0) {
    return <Typography variant="body1" sx={REPORTS_STYLES.noReportsText}>{TEXTS.noReportsYet}</Typography>
  }


  return (
    <>
      {HtmlHead}
      {
        <Box sx={REPORTS_STYLES.container}>
          {/* <Typography variant="body1" sx={REPORTS_STYLES.date}>{date}</Typography> */}
          <Typography variant="h2" sx={REPORTS_STYLES.title}>{TEXTS.title}</Typography>
          <Typography variant="body1" sx={REPORTS_STYLES.subtitle}>{TEXTS.subtitle}</Typography>
          <Typography variant="body1" sx={REPORTS_STYLES.poweredBy}>({TEXTS.poweredBy})</Typography>
          <CreateReportButton onClick={toggleArticleInput(true)} isArticleInputShown={isArticleInputShown} />
          {
            isArticleInputShown &&
            <Box sx={REPORTS_STYLES.articleInputContainer} >
              {
                isUrlProvidedAsInput &&
                <Typography sx={{
                  margin: 'auto',
                  textAlign: 'center',
                  marginBottom: theme.spacing(2),
                  marginTop: theme.spacing(-2),
                  fontSize: theme.typography.fontSize * 0.75,
                  color: theme.palette.text.secondary,
                  ' & a': {
                    color: theme.palette.text.secondary
                  },
                }}>
                  {TEXTS.articleTextExtracted}
                  &nbsp;
                  < a href={WOLRD_NEWS_API_URL} target="_blank" rel="noreferrer">
                    {TEXTS.worldNewsApi}
                  </a>
                </Typography>
              }

              <AtricleInput
                article={article}
                onArticleChange={handleArticleChange}
                onGetReport={handleGetReport}
                isUrlProvidedAsInput={isUrlProvidedAsInput}

              />
            </Box>
          }
          <ReportList reports={reports} onCardClick={onCardClick} isLoading={isLoading} />
          {
            isPaginationEnabled &&
            <Pagination {...{ isFirstPage, onStartClick, onChangePage, isLastPage }} />
          }
          <CreateReportButton onClick={toggleArticleInput(false)} isArticleInputShown={isArticleInputShown} />
          {
            isArticleInputShown &&
            <Box sx={REPORTS_STYLES.articleInputContainer} >
              <AtricleInput
                article={article}
                onArticleChange={handleArticleChange}
                onGetReport={handleGetReport} />
            </Box>
          }
          <Share
            title={TEXTS.shareTitle}
            url={BASE_URL}
            description={TEXTS.shareDescription}
            hashTags={TEXTS.shareHashTags}
            context={SHARING_CONTEXT}
          />
        </Box >
      }
      {
        isFirstPage &&
        < Disclamer />
      }
    </>
  )
}

function Pagination({ isFirstPage, onStartClick, onChangePage, isLastPage }) {
  return <Box sx={REPORTS_STYLES.pagination}>
    <Button disabled={isFirstPage} onClick={onStartClick}>
      <SkipPreviousIcon fontSize='large' sx={REPORTS_STYLES.skipIcon} />
    </Button>
    <Button disabled={isFirstPage} onClick={onChangePage(STEPS.back)}><ArrowLeftIcon fontSize='large' /></Button>
    <Button disabled={isLastPage} onClick={onChangePage(STEPS.forward)}><ArrowRightIcon fontSize='large' /></Button>
  </Box>;
}

function CreateReportButton({ onClick, isArticleInputShown }) {
  const text = isArticleInputShown ? TEXTS.cancelNewReport : TEXTS.newReport;

  return (
    <Button variant="outlined" onClick={onClick} sx={REPORTS_STYLES.newReportButton}>
      {text}
    </Button>
  )
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

export async function getServerSideProps(context) {
  const { req } = context;
  const host = req?.headers?.host
  const { page = 1 } = context.query;
  const url = `http://${host}/${API_URL.SAVED_REPORT}?page=${page}`;

  try {
    const res = await fetch(url);
    const { data } = await res.json();
    const { reports, isLastPage } = data;

    const date = new Date().toLocaleString();

    return { props: { reports, isLastPage, date } }
  } catch (error) {
    console.log({ error })
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
  newReportButton: {
    margin: 'auto',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    minWidth: '266px',
  },
  articleInputContainer: {
    width: '100%',
    margin: '0 auto auto',
    padding: theme.spacing(0, 2, 2, 2),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  skipIcon: {
    transform: 'scale(0.75)'
  }
}