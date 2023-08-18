/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import theme from '@/theme';
import { Box, Button, Card, List, ListItem, Skeleton, Typography } from '@mui/material';
import usePageLoading from '@/hooks/usePageLoading';
import ReportLoading from '@/components/Report/ReportLoading';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Tooltip from '@mui/material/Tooltip';
import { getBaseUrl, getBaseUrlFromUrlString, scrollToTop, scrollToBottom, cutTextIfExeedsMaxCharsCount, convertUTCDateToUserTimeZone } from '../utils/utils'
import Share from '@/components/Share';
import AtricleInput from '@/components/ArticleInput';
import Disclamer from '@/components/Disclamer';
import { BASE_URL } from '@/constants/constants';
import useIsTextOverFlow from '@/hooks/useIsTextOverflow';

const baseUrl = getBaseUrl();
const SAVED_REPORTS_PATH = 'api/saved_reports'
const URL = `${baseUrl}${SAVED_REPORTS_PATH}`;
const LOGO_URL = './public/favicon.png'
const OPEN_GRAPH_IMAGE_URL = './opengraph-logo.png'
const TWITTER_IMAGE_URL = './favicon.png'
const SHARING_CONTEXT = 'app'
const TEXTS = {
  title: 'News Integrity Feed',
  subtitle: 'Articles from leading news sources, analysed for bias by HonestyMeter',
  newReport: 'Create new bias report',
  cancelNewReport: 'Cancel new report',
  articleTitle: 'Article Title',
  source: 'Source',
  objectivityScore: 'OBJECTIVITY SCORE',
  viewReport: 'View Bias Report',
  imageAlt: 'Random illustration image',
  honestyMeter: 'Honesty Meter',
  error: 'Something went wrong. Please try again later.',
  desciptiion: 'Honesty Meter is a tool that helps you discover the truth behind the news.',
  ogDescription: 'AI powered tool for bias detection',
  shareTitle: 'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
  shareDescription: 'HonestyMeter - Check media content for objectivity and bias.',
  shareHashTags: ['HonestyMeter', 'MediaBias', 'FakeNews'],
}

const STEPS = {
  forward: 1,
  back: -1,
}
const MAX_TITLE_LENGTH = 62;

export default function Home({ homePageProps, allReports, isLastPage, date }) {
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
  } = homePageProps;
  const [isArticleInputShown, setIsArticleInputShown] = useState(false);

  const onCardClick = (reportUrl) => () => {
    router.push(reportUrl);
  }

  const onChangePage = (step) => () => {
    const nextPage = parseInt(pageFromQuery) + step;
    router.query.page = nextPage;
    router.push(router);
  }

  const onStartClick = () => {
    router.push('/');
  }

  const toggleArticleInput = (isTop) => () => {
    if (isArticleInputShown) {
      clearArticleInput();
    }

    setIsArticleInputShown(!isArticleInputShown);
    const scrollMethod = isTop ? scrollToTop : scrollToBottom;
    setTimeout(() => {
      scrollMethod();
    }, 0)
  }

  if (allReports.length === 0) {
    return <Typography variant="body1" sx={REPORTS_STYLES.noReportsText}>No reports yet</Typography>
  }

  return (
    <>
      {HtmlHead}
      {
        <Box sx={REPORTS_STYLES.container}>
          {/* <Typography variant="body1" sx={REPORTS_STYLES.date}>{date}</Typography> */}
          <Typography variant="h2" sx={REPORTS_STYLES.title}>{TEXTS.title}</Typography>
          <Typography variant="body1" sx={REPORTS_STYLES.subtitle}>{TEXTS.subtitle}</Typography>
          <CreateReportButton onClick={toggleArticleInput(true)} isArticleInputShown={isArticleInputShown} />
          {
            isArticleInputShown &&
            <Box sx={NEW_REPORT_STYLES.container} >
              <AtricleInput
                article={article}
                onArticleChange={handleArticleChange}
                onGetReport={handleGetReport} />
            </Box>
          }
          <List sx={REPORTS_STYLES.list}>
            {
              allReports.map((report) => {
                const source = getBaseUrlFromUrlString(report.articleLink);
                const reportUrl = `${baseUrl}report/${report._id}`
                const randomImageUrl = `https://picsum.photos/288/150?random=${report._id}`
                const { articleTitle, articleDate } = report || {};
                const articleDateInUserTimeZone = articleDate ? convertUTCDateToUserTimeZone(articleDate) : ''
                const isTitleTooLong = articleTitle.length > MAX_TITLE_LENGTH;
                const articleShortTitle = isTitleTooLong ? cutTextIfExeedsMaxCharsCount(articleTitle, MAX_TITLE_LENGTH) : ''
                const shownArticleTitle = isTitleTooLong ? articleShortTitle : articleTitle;
                const toolTipTitle = isTitleTooLong ? articleTitle : '';

                return (
                  <ListItem sx={REPORTS_STYLES.listItem} onClick={onCardClick(reportUrl)} key={report._id}>
                    {
                      isLoading ?
                        <Card sx={REPORTS_STYLES.card}>
                          <Tooltip title={toolTipTitle} placement="top" >
                            <Skeleton sx={{ ...REPORTS_STYLES.textLine, ...REPORTS_STYLES.articleTitle }}>
                              <b>
                                {shownArticleTitle}
                              </b>
                            </Skeleton>
                          </Tooltip>
                          <Typography sx={REPORTS_STYLES.textLine} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Skeleton component="span" sx={{ ...REPORTS_STYLES.source, width: 80 }}></Skeleton>
                            <Skeleton component="span" sx={{ ...REPORTS_STYLES.articleDate, width: 56 }}></Skeleton>
                          </Typography>
                          <Box sx={REPORTS_STYLES.image()} >
                            <img
                              src={randomImageUrl}
                              alt={TEXTS.imageAlt}
                              loading='lazy'
                            />
                          </Box>
                          <Typography sx={{ ...REPORTS_STYLES.objectivityScore, display: 'flex' }}> {TEXTS.objectivityScore}: <Skeleton variant="text" sx={{ width: 18, marginLeft: theme.spacing(0.5) }}></Skeleton> </Typography>
                          <Button variant='outlined' disabled sx={REPORTS_STYLES.viewReportButton}>{TEXTS.viewReport}</Button>
                        </Card>
                        :
                        <Card sx={REPORTS_STYLES.card}>
                          <Tooltip title={toolTipTitle} placement="top" >
                            <Typography sx={{ ...REPORTS_STYLES.textLine, ...REPORTS_STYLES.articleTitle }}>
                              <b>
                                {shownArticleTitle}
                              </b>
                            </Typography>
                          </Tooltip>
                          <Typography sx={REPORTS_STYLES.textLine} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box component="span" style={REPORTS_STYLES.source}>{source}</Box>
                            <Box component="span" style={REPORTS_STYLES.articleDate}>{articleDateInUserTimeZone}</Box>
                          </Typography>
                          <Box sx={REPORTS_STYLES.image()} >
                            <img
                              src={randomImageUrl}
                              alt={TEXTS.imageAlt}
                              loading='lazy'
                            />
                          </Box>
                          <Typography sx={[REPORTS_STYLES.objectivityScore]} > {TEXTS.objectivityScore}: <span style={REPORTS_STYLES.scoreDigit(report.score)}>{report.score}</span> </Typography>
                          <Button variant='outlined' sx={REPORTS_STYLES.viewReportButton}>{TEXTS.viewReport}</Button>
                        </Card>
                    }
                  </ListItem>
                )
              })
            }
          </List>
          {
            isPaginationEnabled &&
            <Box sx={REPORTS_STYLES.pagination}>
              <Button disabled={isFirstPage} onClick={onStartClick}>
                <SkipPreviousIcon fontSize='large' sx={REPORTS_STYLES.skipIcon} />
              </Button>
              <Button disabled={isFirstPage} onClick={onChangePage(STEPS.back)}><ArrowLeftIcon fontSize='large' /></Button>
              <Button disabled={isLastPage} onClick={onChangePage(STEPS.forward)}><ArrowRightIcon fontSize='large' /></Button>
            </Box>
          }
          <CreateReportButton onClick={toggleArticleInput(false)} isArticleInputShown={isArticleInputShown} />
          {
            isArticleInputShown &&
            <Box sx={NEW_REPORT_STYLES.container} >
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
        pageFromQuery === 1 &&
        < Disclamer />
      }
    </>
  )
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

const NEW_REPORT_STYLES = {
  container: {
    width: '100%',
    margin: '0 auto auto',
    padding: theme.spacing(0, 2, 2, 2),
  },
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
    margin: theme.spacing(0, 2, 2, 2),
    textAlign: 'center',
  },
  newReportButton: {
    margin: 'auto',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    minWidth: '266px',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  listItem: {
    width: '320px',
    padding: 0,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    width: '100%',
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      boxShadow: '0px 5px 5px -1px rgba(0,0,0,0.2), 0px 5px 5px 0px rgba(0,0,0,0.14), 0px 5px 5px 0px rgba(0,0,0,0.12)',
      transform: 'translate(0, -2px)',
    }
  },
  image: () => ({
    height: '150px',
    width: '288px',
    backgroundColor: theme.palette.grey[300],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '4px',
    marginBottom: theme.spacing(1),
    animation: 'skeleton 1s ease-in-out infinite alternate',
    '@keyframes skeleton': {
      '0%': {
        backgroundColor: theme.palette.grey[200],
      },
      '100%': {
        backgroundColor: theme.palette.grey[100],
      }
    },
  }),
  textLine: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  articleTitle: {
    height: '48px',
  },
  source: {
    fontSize: theme.typography.fontSize * 1
  },
  articleDate: {
    fontSize: theme.typography.fontSize * 0.75
  },
  objectivityScore: {
    color: theme.palette.text.secondary,
    margin: 'auto',
    marginBottom: theme.spacing(1),
  },
  scoreDigit: (score) => {
    let color;
    const scoreNumber = parseInt(score)

    if (score < 70) {
      color = theme.palette.error.main
    } else if (score < 80) {
      color = theme.palette.warning.main
    } else {
      color = theme.palette.success.main
    }

    return {
      color
    }
  },
  viewReportButton: {
    width: '100%',
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

export async function getServerSideProps(context) {
  const { req } = context;
  const host = req?.headers?.host
  const { page = 1 } = context.query;
  const url = `http://${host}/${SAVED_REPORTS_PATH}?page=${page}`;

  try {
    const res = await fetch(url);
    const { data } = await res.json();
    const { allReports, isLastPage } = data;

    const date = new Date().toLocaleString();

    return { props: { allReports, isLastPage, date } }
  } catch (error) {
    console.log({ error })
  }
}

const createReport = async () => {
  let res = await fetch(URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      title: 'New ' + Math.floor(Math.random() * 1000000),
      content: 'New content',
    }),
  });
  res = await res.json();
};
