"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import va from "@vercel/analytics";
import { SearchIcon, SearchX } from "lucide-react";
import {
  scrollToTop,
  scrollToBottom,
  capitalizeFirstLetterOfEachWord,
} from "@/utils/utils";
import Share from "@/components/Share";
import AtricleInput from "@/components/ArticleInput";
import Disclamer from "@/components/Disclamer";
import {
  BASE_URL,
  COUNTRIES,
  EMPTY_STRING,
  EVENT,
} from "@/constants/constants";
import ReportList from "@/components/ReportList/ReportList";
import usePageLoadingFull from "@/hooks/usePageLoadingFull";
import Pagination from "@/components/Layout/Pagination";
import Search from "@/components/Layout/Search";
import CreateReportButton from "@/components/Layout/CreateReportButton";
import AutoComplete from "@/components/Autocomplete/Autocomplete";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Rating } from "@/components/RatingList/Rating";
import { MethodologySourcesRating } from "@/components/Methodology/Methodology";
import { SignIn, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHomePageContext } from "./providers";

const SHARING_CONTEXT = "app";
const SEARCH_FIELD_ID = "search-field-home";
const TEXTS = {
  title: "News Integrity Feed",
  subtitle: "Top news analysed for bias by HonestyMeter",
  poweredBy: "news api powered by newsdata.io",
  newReport: "Create new bias report",
  cancelNewReport: "Cancel new report",
  honestyMeter: "Honesty Meter",
  error: "Something went wrong. Please try again later.",
  shareTitle:
    "HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.",
  shareDescription:
    "HonestyMeter - Check media content for objectivity and bias.",
  shareHashTags: ["HonestyMeter", "MediaBias", "FakeNews"],
  noReportsFound: "No reports found",
  searchAndFilter: "Search and Filter",
  cancelSearch: "Cancel Search",
  clearSearch: "Clear Search",
  mostObjectiveSources: "Most Objective Sources",
};

const COUNTIRES_LIST = COUNTRIES.map((c) => c.country);

const FILTER_PARAMS = {
  searchTerm: "searchTerm",
  country: "country",
  category: "category",
};

interface HomePageClientProps {
  reports: any[];
  page: string;
  isFirstPage: boolean;
  isLastPage: boolean;
  date: string;
  rating: {
    mostObjectiveSources: string[];
    createdAt: string;
  } | null;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function HomePageClient({
  reports,
  page,
  isFirstPage,
  isLastPage,
  date,
  rating,
  searchParams,
}: HomePageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  const searchFromQuery = searchParams.searchTerm?.toString() || EMPTY_STRING;
  const categoryFromQuery = searchParams.category?.toString() || EMPTY_STRING;
  const countryFromQuery = searchParams.country?.toString() || EMPTY_STRING;

  const isQueryParams = Boolean(
    searchFromQuery || countryFromQuery || categoryFromQuery
  );
  const isOnlyOnePage = isFirstPage && isLastPage;
  const isPaginationEnabled = !isOnlyOnePage;
  const isLoading = usePageLoadingFull();

  const {
    article,
    isReportForPublishing,
    setIsReportForPublishing,
    handleArticleChange,
    clearArticleInput,
    handleGetReport,
    isUrlProvidedAsInput,
    closeReport,
  } = useHomePageContext();

  const [isTopArticleInputShown, setIsTopArticleInputShown] = useState(false);
  const [isSearchShown, setIsSearchShown] = useState(false);
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [category, setCategory] = useState(EMPTY_STRING);
  const [country, setCountry] = useState(EMPTY_STRING);

  const setFilterStateMethods: { [key: string]: (value: string) => void } = {
    [FILTER_PARAMS.category]: setCategory,
    [FILTER_PARAMS.country]: setCountry,
    [FILTER_PARAMS.searchTerm]: setSearchValue,
  };

  const isReportListEmpty = reports.length === 0;

  const searchIconTooltip = getSearchIconTooltipText(isSearchShown, isQueryParams);
  const { createdAt: ratingCreatedAt, mostObjectiveSources } = rating || {};
  const mostObjectiveSourcesFormatted = mostObjectiveSources
    ? mostObjectiveSources.join(", ").toUpperCase()
    : "";
  const { isSignedIn } = useUser();

  const onCardClick = (reportUrl: string) => () => {
    va.track(EVENT.reportCardClicked, { reportUrl });
  };

  const toggleArticleInput = (isTop: boolean) => () => {
    const event = isTopArticleInputShown
      ? EVENT.cancelNewReportClicked
      : EVENT.generateNewReportClicked;

    va.track(event);

    clearArticleInput();
    setIsTopArticleInputShown(!isTopArticleInputShown);
    setIsSearchShown(false);

    const scrollMethod = isTop ? scrollToTop : scrollToBottom;
    setTimeout(() => {
      scrollMethod();
    }, 0);
  };

  const handleSearchClick = () => {
    va.track(EVENT.searchClickedHomePage, { searchValue });

    const trimmedSearchValue = searchValue.trim();
    const isSearchParamsEmpty = Boolean(
      !trimmedSearchValue && !country && !category
    );

    if (isSearchParamsEmpty) return;

    const searchValueCapitalizedLetters =
      capitalizeFirstLetterOfEachWord(trimmedSearchValue);

    const params = new URLSearchParams(urlSearchParams.toString());
    params.set("searchTerm", searchValueCapitalizedLetters);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const toggleSearch = () => {
    const isSearchShownAfterChange = !isSearchShown;

    if (isSearchShownAfterChange) {
      setIsTopArticleInputShown(false);
    }

    if (isQueryParams) {
      router.push("/");
      setIsSearchShown(false);
      setCountry(EMPTY_STRING);
      setCategory(EMPTY_STRING);
      setSearchValue(EMPTY_STRING);

      return;
    }

    setIsSearchShown(isSearchShownAfterChange);
  };

  const handleFilterChange =
    (type: string) =>
    (_e: React.SyntheticEvent, newValue: string = EMPTY_STRING) => {
      setFilterStateMethods[type](newValue);

      const params = new URLSearchParams(urlSearchParams.toString());
      if (newValue) {
        params.set(type, newValue);
      } else {
        params.delete(type);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    };

  useEffect(() => {
    va.track(EVENT.pageLoaded, { page });
  }, [page]);

  return (
    <>
      <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center pb-4 px-4 text-center">
        <div className="flex justify-center items-center gap-6 mt-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{TEXTS.title}</h2>
        </div>

        {isFirstPage && (
          <Rating
            createdAt={ratingCreatedAt}
            items={mostObjectiveSourcesFormatted}
            title={TEXTS.mostObjectiveSources}
            titleColor="text-indigo-600"
            Methodology={MethodologySourcesRating}
          />
        )}

        <div className="flex flex-wrap gap-2 justify-center items-center mb-4 mt-2 w-full">
          <CreateReportButton
            onClick={toggleArticleInput(true)}
            isArticleInputShown={isTopArticleInputShown}
          />
          <div className="flex gap-2 justify-center items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={toggleSearch} variant="secondary">
                    {isSearchShown ? (
                      <SearchX className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <SearchIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{searchIconTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Collapsible
            open={isTopArticleInputShown}
            className="w-full mt-2 mx-auto sm:px-4"
          >
            <CollapsibleContent>
              {isSignedIn ? (
                <div className="w-full mt-2 mx-auto sm:px-4">
                  <AtricleInput
                    article={article}
                    onArticleChange={handleArticleChange}
                    onGetReport={handleGetReport}
                    isUrlProvidedAsInput={isUrlProvidedAsInput}
                    isPublished={isReportForPublishing}
                    setIsPublished={setIsReportForPublishing}
                    isPublishEnabled={isUrlProvidedAsInput}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <SignIn afterSignInUrl="/" afterSignUpUrl="/" routing="virtual" />
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Collapsible open={isSearchShown}>
          <CollapsibleContent>
            <div className="flex flex-wrap w-full justify-center items-center gap-6 mb-4 flex-col sm:flex-row">
              <div className="flex flex-wrap justify-center items-center gap-6 w-full sm:w-auto mb-1 sm:mb-0">
                <AutoComplete
                  label="Country"
                  list={COUNTIRES_LIST}
                  onChange={handleFilterChange(FILTER_PARAMS.country)}
                  value={country}
                  onClearClick={handleFilterChange(FILTER_PARAMS.country)}
                />
              </div>
              <Search
                id={SEARCH_FIELD_ID}
                onClick={handleSearchClick}
                onChange={handleSearchFieldChange}
                value={searchValue}
                variant="text"
                onClear={handleFilterChange(FILTER_PARAMS.searchTerm)}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <p className="text-xs text-gray-500 opacity-80 text-center mx-6 my-2">
          {TEXTS.poweredBy}
        </p>

        {isPaginationEnabled && !isFirstPage && (
          <Pagination page={page} isFirstPage={isFirstPage} isLastPage={isLastPage} />
        )}

        {isReportListEmpty ? (
          <div className="my-4">
            <p className="text-gray-900 text-base">
              {getNotFoundText(countryFromQuery, categoryFromQuery, searchFromQuery)}
            </p>
          </div>
        ) : (
          <ReportList
            reports={reports}
            onCardClick={onCardClick}
            isLoading={isLoading}
          />
        )}

        {isPaginationEnabled && (
          <div className="mb-4">
            <Pagination
              page={page}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
              isScrollUpIconShown
            />
          </div>
        )}

        <div className="mt-4">
          <Share
            title={TEXTS.shareTitle}
            url={BASE_URL}
            description={TEXTS.shareDescription}
            hashTags={TEXTS.shareHashTags}
            context={SHARING_CONTEXT}
          />
        </div>
      </div>
      {isFirstPage && <Disclamer />}
    </>
  );
}

function getSearchIconTooltipText(isSearchShown: boolean, isQueryParams: boolean) {
  let tooltipText = isSearchShown ? TEXTS.cancelSearch : TEXTS.searchAndFilter;

  if (isQueryParams) {
    tooltipText = TEXTS.clearSearch;
  }

  return tooltipText;
}

function getNotFoundText(
  countryFromQuery: string,
  categoryFromQuery: string,
  searchFromQuery: string
) {
  const contryPart = countryFromQuery ? `in "${countryFromQuery}"` : EMPTY_STRING;
  const categoryPart = categoryFromQuery
    ? `in "${categoryFromQuery}" category`
    : EMPTY_STRING;
  const searchPart = searchFromQuery ? `for "${searchFromQuery}"` : EMPTY_STRING;
  const isFilterOn = Boolean(countryFromQuery || categoryFromQuery);
  const advicePrefix = "Try to search without";
  const advicePartOne = countryFromQuery ? "Country" : "";
  const advicePartTwo = categoryFromQuery
    ? countryFromQuery
      ? "or category"
      : "category"
    : "";
  const adviceSufix = "filters";
  const advice = `${advicePrefix} ${advicePartOne} ${advicePartTwo} ${adviceSufix}`;

  return `${TEXTS.noReportsFound} ${searchPart} ${contryPart} ${categoryPart}. \n ${
    isFilterOn ? advice : ""
  }`;
}
