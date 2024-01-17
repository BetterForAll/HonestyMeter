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
  Fade,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import InfoIcon from '@mui/icons-material/Info';
import { scrollToTop, scrollToBottom, capitalizeFirstLetterOfEachWord, getQueryStringByAsPath, convertUTCDateToUserTimeZone } from '../utils/utils';
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
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { getLastRating } from './api/rating';
import { Rating } from '@/components/RatingList/Rating';
import { MethodologySourcesRating } from '@/components/Methodology/Methodology';
import Badge from '../components/Badge/Badge';

const LOGO_URL = 'https://honestymeter.com/favicon.png';
const OPEN_GRAPH_IMAGE_URL = 'https://honestymeter.com/opengraph-logo.png';
const TWITTER_IMAGE_URL = 'https://honestymeter.com/favicon.png';
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
  articleTextExtracted: 'text extraction by url powered by',
  worldNewsApi: 'world news api',
  people: 'People',
  searchAndFilter: 'Search and Filter',
  cancelSearch: 'Cancel Search',
  clearSearch: 'Clear Search',
  mostObjectiveSources: 'Most Objective Sources',
};

const COUNTIRES_LIST = COUNTRIES.map(c => c.country);

const FILTER_PARAMS = {
  searchTerm: 'searchTerm',
  country: 'country',
  category: 'category',
}

export default function Home({ homePageProps, reports, page, isFirstPage, isLastPage, date, rating }) { //TODO: add rating back to props
  const router = useRouter();
  const {
    [FILTER_PARAMS.searchTerm]: searchFromQuery = EMPTY_STRING,
    [FILTER_PARAMS.category]: categoryFromQuery = EMPTY_STRING,
    [FILTER_PARAMS.country]: countryFromQuery = EMPTY_STRING
  } = router.query || {};
  const isQueryParams = Boolean(searchFromQuery || countryFromQuery || categoryFromQuery);
  const isOnlyOnePage = isFirstPage && isLastPage;
  const isPaginationEnabled = !isOnlyOnePage;
  const isLoading = usePageLoadingFull();
  const {
    article,
    handleArticleChange,
    clearArticleInput,
    handleGetReport,
    isUrlProvidedAsInput,
  } = homePageProps;
  const [isTopArticleInputShown, setIsTopArticleInputShown] = useState(false);
  const [isBottomArticleInputShown, setIsBottomArticleInputShown] = useState(false);
  const [isSearchShown, setIsSearchShown] = useState(false);
  const [isFilterShown, setIsFilterShown] = useState(false);
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [category, setCategory] = useState(EMPTY_STRING);
  const [country, setCountry] = useState(EMPTY_STRING);
  const setFilterStateMethods = {
    [FILTER_PARAMS.category]: setCategory,
    [FILTER_PARAMS.country]: setCountry,
    [FILTER_PARAMS.searchTerm]: setSearchValue,
  };
  const isMobile = useIsMobileClient();
  const isReportListEmpty = reports.length === 0;
  const shouldShowBottomCTA = reports.length > MINIMUM_CARDS_COUNT_TO_SHOW_BOTTOM_CTA || !isReportListEmpty && isMobile;
  const searchIconTooltip = getSearchIconTooltipText(isSearchShown, isQueryParams);
  const { createdAt: ratingCreatedAt, mostObjectiveSources } = rating || {};
  const mostObjectiveSourcesFormatted = mostObjectiveSources.join(', ').toUpperCase();

  const onCardClick = (reportUrl) => () => {
    va.track(EVENT.reportCardClicked, { reportUrl });
  };

  const toggleArticleInput = (isTop) => () => {
    const event = isTopArticleInputShown
      ? EVENT.cancelNewReportClicked
      : EVENT.generateNewReportClicked;

    va.track(event);

    clearArticleInput();
    isTop ? setIsTopArticleInputShown(!isTopArticleInputShown) : setIsBottomArticleInputShown(!isBottomArticleInputShown);
    setIsSearchShown(false);
    setIsFilterShown(false);

    const scrollMethod = isTop ? scrollToTop : scrollToBottom;
    setTimeout(() => { // wait for the animation to finish. TODO: find a better way to do this, see MUI docs
      scrollMethod();
    }, 0);
  };

  const handleSearchClick = () => {
    va.track(EVENT.searchClickedHomePage, { searchValue });

    const trimmedSearchValue = searchValue.trim();
    const isSearchParamsEmpty = Boolean(!trimmedSearchValue && !country && !category)

    if (isSearchParamsEmpty) return;

    const searchValueCapitalizedLetters = capitalizeFirstLetterOfEachWord(trimmedSearchValue);

    router.query.searchTerm = searchValueCapitalizedLetters;
    router.push(router);
  }

  const handleSearchFieldChange = (e) => {
    setSearchValue(e.target.value);
  }

  const toggleSearch = () => {
    const isSearchShownAfterChange = !isSearchShown;

    if (isSearchShownAfterChange) {
      setIsTopArticleInputShown(false);
      setIsFilterShown(false);
    }

    if (isQueryParams) {
      router.push('/');
      setIsSearchShown(false);
      setCountry(EMPTY_STRING);
      setCategory(EMPTY_STRING);
      setSearchValue(EMPTY_STRING);

      return;
    }

    setIsSearchShown(isSearchShownAfterChange);
  }

  const toggleFilter = () => { //TODO: Decide if we want to use filter. Activate if we do
    if (!isFilterShown) {
      setIsTopArticleInputShown(false);
      setIsSearchShown(false);
    }

    setIsFilterShown(!isFilterShown);
  }

  const hanldeFilterChange = (type) => (_e, newValue = EMPTY_STRING) => {
    setFilterStateMethods[type](newValue);

    if (newValue) {
      router.query[type] = newValue;
    } else {
      delete router.query[type];
    }

    delete router.query.page;
    router.push(router);
  }

  useEffect(() => {
    va.track(EVENT.pageLoaded, { page });
  }, [page]);

  return (
    <>
      {getHtmlHead(router.asPath)}
      {
        <Box sx={STYLES.container} key={reports}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: theme.spacing(3) }}>
            <Typography variant='h2' sx={STYLES.title}>
              {TEXTS.title}
            </Typography>
          </Box>
          {
            isFirstPage &&
            <Rating {...{
              createdAt: ratingCreatedAt,
              items: mostObjectiveSourcesFormatted,
              title: TEXTS.mostObjectiveSources,
              titleColor: theme.palette.primary.main,
              Methodology: MethodologySourcesRating
            }} />}

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 2,
            marginTop: 1,
            width: '100%',
          }}>
            <CreateReportButton
              onClick={toggleArticleInput(true)}
              isTopArticleInputShown={isTopArticleInputShown}
            />
            <Box sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* TODO: Decide if we want to use filter*/}
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
              <Tooltip title={searchIconTooltip}>
                <Button onClick={toggleSearch}>
                  {(isSearchShown) ?
                    <SearchOffIcon sx={{
                      color: theme.palette.primary.main
                    }} />
                    :
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  }
                </Button>
              </Tooltip>
            </Box>
            {
              <Collapse in={isTopArticleInputShown} sx={STYLES.articleInputContainer}>
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
              </Collapse>
            }
          </Box>
          {
            <Collapse in={isSearchShown}>
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: { sx: theme.spacing(3), sm: theme.spacing(4) },
                margin: theme.spacing(0, 0, 2, 0),
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: { sx: theme.spacing(3), sm: theme.spacing(4) },
                  width: { xs: '100%', sm: 'auto' },
                  marginBottom: { xs: theme.spacing(0.5), sm: 0 },
                }}>
                  <AutoComplete
                    label="Category"
                    list={CATEGORIES}
                    onChange={hanldeFilterChange(FILTER_PARAMS.category)}
                    value={category}
                    onClearClick={hanldeFilterChange(FILTER_PARAMS.category)}
                  />
                  <AutoComplete
                    label="Country"
                    list={COUNTIRES_LIST}
                    onChange={hanldeFilterChange(FILTER_PARAMS.country)}
                    value={country}
                    onClearClick={hanldeFilterChange(FILTER_PARAMS.country)}
                  />
                </Box>
                <Search
                  id={SEARCH_FIELD_ID}
                  onClick={handleSearchClick}
                  onChange={handleSearchFieldChange}
                  value={searchValue}
                  variant='text'
                  onClear={hanldeFilterChange(FILTER_PARAMS.searchTerm)}
                />
              </Box>
            </Collapse>
          }
          {/*TODO: decide if we need the chips*/}
          {/* {
            <List sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              minHeight: 40,
              marginBottom: 2,
            }}>
              {
                categoryFromQuery &&
                <Chip onDelete={hanldeFilterChange(FILTER_PARAMS.category)} label={`Category: ${categoryFromQuery}`} />
              }
              {
                countryFromQuery &&
                <Chip onDelete={hanldeFilterChange(FILTER_PARAMS.country)} label={`Country: ${countryFromQuery}`} />
              }
              {
                (searchFromQuery) &&
                <Chip onDelete={hanldeFilterChange(FILTER_PARAMS.searchTerm)} label={`Search Term: ${searchFromQuery}`} />
              }
            </List>
          } */}
          <Typography variant='body1' sx={STYLES.poweredBy}>
            {TEXTS.poweredBy}
          </Typography>

          {isPaginationEnabled && !isFirstPage && (
            <Pagination {...{ page, isFirstPage, isLastPage }} />
          )}
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
            <Box sx={STYLES.paginationContainerBottom}>
              <Pagination {...{ page, isFirstPage, isLastPage }} isScrollUpIconShown />
            </Box>
          )}
          {/* TODO: fix scroll position when article input is open */}
          {/* {

            shouldShowBottomCTA &&
            <>
            <Box sx={{ marginBottom: 2 }}>
              <CreateReportButton
                onClick={toggleArticleInput(false)}
                isArticleInputShown={isBottomArticleInputShown}
              />
            </Box>
          <Collapse in={isBottomArticleInputShown} sx={STYLES.articleInputContainer}>
            <Box sx={STYLES.articleInputContainer}>
              <AtricleInput
                article={article}
                onArticleChange={handleArticleChange}
                onGetReport={handleGetReport}
              />
            </Box>
          </Collapse>
          </>
          } */}
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

function getHtmlHead(asPath) {
  const queryString = getQueryStringByAsPath(asPath);
  const canonicalUrl = `${BASE_URL}${queryString ? `/${queryString}` : EMPTY_STRING}`;

  return (
    <Head>
      <title>{TEXTS.honestyMeter}</title>
      <meta name="description" content={TEXTS.desciptiion} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={TEXTS.honestyMeter} />
      <meta property="og:description" content={TEXTS.ogDescription} />
      <meta property="og:url" content={BASE_URL} />
      <meta property="og:image" content={OPEN_GRAPH_IMAGE_URL} />
      <meta property="twitter:image" content={OPEN_GRAPH_IMAGE_URL} />
      <link rel="shortcut icon" href={LOGO_URL} />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}

function getSearchIconTooltipText(isSearchShown, isQueryParams) {
  let tooltipText = isSearchShown ? TEXTS.cancelSearch : TEXTS.searchAndFilter;

  if (isQueryParams) {
    tooltipText = TEXTS.clearSearch;
  }

  return tooltipText;
}

function getNotFoundText(countryFromQuery, categoryFromQuery, searchFromQuery) {
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

export async function getServerSideProps(context) {
  const { req } = context;
  const host = req?.headers?.host;
  const { page = '1', searchTerm = '', country = '', category = '' } = context.query || {};
  const isFirstPage = page == 1;
  const categoryParam = category ? `&category=${category}` : EMPTY_STRING;
  const countryParam = country ? `&country=${country}` : EMPTY_STRING;
  const searchTermParam = searchTerm ? `&searchTerm=${searchTerm}` : EMPTY_STRING;
  const url = `http://${host}/api/saved_report?page=${page}${searchTermParam}${categoryParam}${countryParam}`;

  try {
    const res = await fetch(url) || {};
    const { data } = await res.json()
    const { reports = [], isLastPage } = data || {};
    const rating = await getLastRating() || {};
    const { mostObjectiveSources, createdAt: createdAtDate } = rating || {};
    const createdAtISOString = createdAtDate.toISOString();
    const createdAt = convertUTCDateToUserTimeZone(createdAtISOString).split(',')[0].trim();
    const date = new Date().toLocaleString();

    const props = {
      reports,
      page,
      isFirstPage,
      isLastPage: false,
      date,
      rating: {
        mostObjectiveSources,
        createdAt
      }
    }

    return {
      props
    };
  } catch (error) {
    console.error({ error });
  }
}

const STYLES = {
  container: {
    width: '100%',
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
    margin: theme.spacing(3, 0, 3),
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
    margin: theme.spacing(0, 3),
    alignSelf: 'center',
  },
  articleInputContainer: {
    width: '100%',
    margin: `${theme.spacing(1)} auto auto`,
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
  },
  paginationContainerBottom: {
    marginBottom: 2
  },
};
