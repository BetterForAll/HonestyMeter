/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import useIsMobileClient from '@/hooks/useIsMobileClient';
import { useRouter } from 'next/router';
import Head from 'next/head';
import va from '@vercel/analytics';
import theme from '@/theme';
import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { scrollToTop, scrollToBottom, capitalizeFirstLetterOfEachWord, EMPTY_FUNCTION } from '../utils/utils';
import Share from '@/components/Share';
import AtricleInput from '@/components/ArticleInput';
import Disclamer from '@/components/Disclamer';
import { API_URL, BASE_URL, CATEGORIES, COUNTRIES, EMPTY_STRING, EVENT, STEPS, WOLRD_NEWS_API_URL } from '@/constants/constants';
import ReportList from '@/components/ReportList/ReportList';
import usePageLoadingFull from '@/hooks/usePageLoadingFull';
import Pagination from '@/components/Layout/Pagination';
import Search from '@/components/Layout/Search';

import CreateReportButton from '@/components/Layout/CreateReportButton';
import BackButton from '@/components/Layout/BackButton';
import AutoComplete from '@/components/Autocomplete/Autocomplete';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';


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
  noReportsFound: 'No reports found',
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
  const {
    searchTerm: searchFromQuery = EMPTY_STRING,
    category: categoryFromQuery = EMPTY_STRING,
    country: countryFromQuery = EMPTY_STRING
  } = router.query || {};
  const isQueryParams = Boolean(searchFromQuery || countryFromQuery || categoryFromQuery);
  const isFirstPage = pageFromQuery === 1;
  const isPaginationEnabled = reports.length > 2 && !isLastPage;
  const isLoading = usePageLoadingFull();
  const {
    article,
    handleArticleChange,
    clearArticleInput,
    handleGetReport,
    isUrlProvidedAsInput,
  } = homePageProps;
  const [isArticleInputShown, setIsArticleInputShown] = useState(false);
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [isSearchShown, setIsSearchShown] = useState(false);
  const [isFilterShown, setIsFilterShown] = useState(false);
  const [category, setCategory] = useState(EMPTY_STRING);
  const [country, setCountry] = useState(EMPTY_STRING);
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
    setIsSearchShown(false);
    setIsFilterShown(false);
    const scrollMethod = isTop ? scrollToTop : scrollToBottom;
    setTimeout(() => {
      scrollMethod();
    }, 0);
  };

  const handleSearchClick = () => {
    va.track(EVENT.searchClickedHomePage, { searchValue });



    const trimmedSearchValue = searchValue.trim();
    if (!trimmedSearchValue && !country && !category) return;

    setIsSearchShown(false);

    const searchValueCapitalizedLetters = capitalizeFirstLetterOfEachWord(trimmedSearchValue);
    const categoryParam = category ? `&category=${category}` : EMPTY_STRING;
    const countryParam = country ? `&country=${country}` : EMPTY_STRING;
    const searchTermParam = `searchTerm=${searchValueCapitalizedLetters}`;
    const url = `/?${searchTermParam}${categoryParam}${countryParam}`;

    console.log({
      categoryParam,
      countryParam,
      searchTermParam,
      url
    })


    router.push(url);

    setSearchValue(EMPTY_STRING);
  }

  const handleSearchFieldChange = (e) => {
    e.stopPropagation();
    setSearchValue(e.target.value);
  }

  const toggleSearch = () => {
    if (!isSearchShown) {
      setIsArticleInputShown(false);
      setIsFilterShown(false);
    }

    const shouldRedirectHome = searchFromQuery || countryFromQuery || categoryFromQuery;

    if (shouldRedirectHome) {
      router.push('/');
      setIsSearchShown(false);
      setCountry(EMPTY_STRING);
      setCategory(EMPTY_STRING);
      setSearchValue(EMPTY_STRING);

      return;
    }

    setIsSearchShown(!isSearchShown);
  }

  const toggleFilter = () => {
    if (!isFilterShown) {
      setIsArticleInputShown(false);
      setIsSearchShown(false);
    }

    setIsFilterShown(!isFilterShown);
  }

  const handleCountryChange = (_e, newValue = EMPTY_STRING) => {
    setCountry(newValue);
    // router.query.country = newValue;
  }

  const handleCategoryChange = (_e, newValue = EMPTY_STRING) => {
    setCategory(newValue);
    // router.query.category = newValue;
  }

  const getNotFoundText = () => {
    const contryPart = countryFromQuery ? `in "${countryFromQuery}"` : EMPTY_STRING;
    const categoryPart = categoryFromQuery ? `in "${categoryFromQuery}" category` : EMPTY_STRING;
    const searchPart = searchFromQuery ? `for "${searchFromQuery}"` : EMPTY_STRING;
    const isFilterOn = Boolean(countryFromQuery || categoryFromQuery);
    const advicePrefix = 'Try to search without'
    const advicePartOne = countryFromQuery ? 'Country' : '';
    const advicePartTwo = categoryFromQuery ? countryFromQuery ? 'or category' : 'category' : '';
    const adviceSufix = 'filters';
    const advice = `${advicePrefix} ${advicePartOne} ${advicePartTwo} ${adviceSufix}`;

    return `${TEXTS.noReportsFound} ${searchPart} ${contryPart} ${categoryPart}. \n ${isFilterOn ? advice : ''}`;
  }


  const handleChipDelete = (type) => () => {
    router.query.page = 1;
    if (type === 'country') {
      delete router.query.country
      setCountry(EMPTY_STRING);
      router.push(router);
    } else if (type === 'category') {
      delete router.query.category
      setCategory(EMPTY_STRING);
      router.push(router);
    } else {
      delete router.query.searchTerm
      setSearchValue(EMPTY_STRING);
      router.push(router);
    }
  }

  const cleanSearchField = (e) => {
    setSearchValue(EMPTY_STRING);
  }

  useEffect(() => {
    va.track(EVENT.pageLoaded, { page: pageFromQuery });
  }, [pageFromQuery]);

  return (
    <>
      {HtmlHead}
      {
        <Box sx={STYLES.container} key={reports}>
          <Typography variant='h2' sx={STYLES.title}>
            {TEXTS.title}
          </Typography>
          <Typography variant='body1' sx={STYLES.subtitle}>
            {TEXTS.subtitle}
          </Typography>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 2,
            marginTop: 1,
          }}>
            <CreateReportButton
              onClick={toggleArticleInput(true)}
              isArticleInputShown={isArticleInputShown}
            />
            <Box sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>

              {/* <Tooltip
                title={isFilterShown ? 'Remove filter' : 'Filter by Category and Country'}>
                <Button
                  onClick={toggleFilter}
                >
                  {isFilterShown ?
                    <FilterAltOffIcon />
                    :
                    <FilterAltIcon />
                  }
                </Button>
              </Tooltip> */}

              <Tooltip title={isSearchShown || searchFromQuery ? searchFromQuery ? 'Clean Search' : 'Cancel Search' : 'Search'}>
                <Button onClick={toggleSearch}>
                  {(isSearchShown || isQueryParams) ?
                    <SearchOffIcon sx={{
                      color: isQueryParams ? theme.palette.primary.main : theme.palette.text.secondary
                    }} />
                    :
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />

                  }
                </Button>
              </Tooltip>
            </Box>
          </Box>


          {
            (isFilterShown || isSearchShown) &&
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: theme.spacing(4),
              margin: theme.spacing(0, 0, 2, 0),
              flexDirection: { xs: 'column', sm: 'row' }
            }}>

              {isSearchShown &&
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4,
                  width: { xs: '100%', sm: 'auto' },
                }}>
                  <AutoComplete
                    label="Country"
                    list={COUNTRIES.map(c => c.country)}
                    onChange={handleCountryChange}
                    variant='text'
                  />
                  <AutoComplete
                    label="Category"
                    list={CATEGORIES}
                    onChange={handleCategoryChange}
                    variant='text'
                  />
                </Box>
              }
              {
                isSearchShown &&
                <>
                  <Search
                    id={SEARCH_FIELD_ID}
                    onClick={handleSearchClick}
                    onChange={handleSearchFieldChange}
                    onClear={cleanSearchField}
                    value={searchValue}
                    variant='text'
                  />
                  <Button
                    sx={{
                      height: '56px',
                      minWidth: { xs: '100%', sm: '56px !important' },
                    }}
                    variant={isMobile ? 'contained' : 'text'}
                    onClick={handleSearchClick}
                  >
                    <SearchIcon />
                  </Button>
                </>
              }
            </Box>
          }

          {isArticleInputShown && (
            <Box sx={STYLES.articleInputContainer}>
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
          {/* {
            isQueryParams && <BackButton goTo='/' />
          } */}

          <Typography variant='body1' sx={STYLES.poweredBy}>
            ({TEXTS.poweredBy})
          </Typography>
          {
            isQueryParams &&
            <List sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              {
                categoryFromQuery &&
                <Chip onDelete={handleChipDelete('category')} label={`Category: ${categoryFromQuery}`} />
              }
              {
                countryFromQuery &&
                <Chip onDelete={handleChipDelete('country')} label={`Country: ${countryFromQuery}`} />
              }
              {
                (searchFromQuery) &&
                <Chip onDelete={handleChipDelete('searchTerm')} label={`Search Term: ${searchFromQuery}`} />
              }
            </List>
          }
          {isReportListEmpty ? (
            <Box sx={STYLES.noReportsContainer}>
              <Typography variant='body1' sx={STYLES.noReportsText}>
                {getNotFoundText()}
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
            <Box sx={{ marginBottom: 2 }}>
              <CreateReportButton
                onClick={toggleArticleInput(false)}
                isArticleInputShown={isArticleInputShown}
              />
            </Box>
          }
          {
            isQueryParams && shouldShowBottomCTA && <BackButton />
          }
          {isArticleInputShown && (
            <Box sx={STYLES.articleInputContainer}>
              <AtricleInput
                article={article}
                onArticleChange={handleArticleChange}
                onGetReport={handleGetReport}
              />
            </Box>
          )}
          <Box sx={{ marginTop: theme.spacing(2) }}>
            <Share
              title={TEXTS.shareTitle}
              url={BASE_URL}
              description={TEXTS.shareDescription}
              hashTags={TEXTS.shareHashTags}
              context={SHARING_CONTEXT}
            />
          </Box>
        </Box >
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
  const { page = 1, searchTerm = '', country = '', category = '' } = context.query || {};
  const categoryParam = category ? `&category=${category}` : EMPTY_STRING;
  const countryParam = country ? `&country=${country}` : EMPTY_STRING;
  const searchTermParam = `&searchTerm=${searchTerm}`;
  const url = `http://${host}/${API_URL.SAVED_REPORT}?page=${page}${searchTermParam}${categoryParam}${countryParam}`;

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
    maxWidth: '1400px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
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
    margin: theme.spacing(0, 2, 0, 2),
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
    marginTop: theme.spacing(0),
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
