"use client";

import React, { useState, useEffect } from "react";
import va from "@vercel/analytics";
import { scrollToTop, scrollToBottom } from "@/utils/utils";
import Share from "@/components/Share";
import AtricleInput from "@/components/ArticleInput";
import Disclamer from "@/components/Disclamer";
import { BASE_URL, EVENT, WOLRD_NEWS_API_URL } from "@/constants/constants";
import ReportList from "@/components/ReportList/ReportList";
import usePageLoadingFull from "@/hooks/usePageLoadingFull";
import Pagination from "@/components/Layout/Pagination";
import CreateReportButton from "@/components/Layout/CreateReportButton";
import BackButton from "@/components/Layout/BackButton";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useHomePageContext } from "../../providers";

const SHARING_CONTEXT = "app";
const TEXTS = {
  title: "News Integrity Feed",
  subtitle: (name: string) => `News Integrity Feed for ${name}`,
  poweredBy: "news api powered by newsdata.io",
  newReport: "Create new bias report",
  cancelNewReport: "Cancel new report",
  noReportsYet: "No reports yet",
  articleTextExtracted: "text extraction by url powered by",
  worldNewsApi: "world news api",
  backButton: "Back To People Index",
  shareTitle:
    "HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.",
  shareDescription:
    "HonestyMeter - Check media content for objectivity and bias.",
  shareHashTags: ["HonestyMeter", "MediaBias", "FakeNews"],
};

interface PersonPageClientProps {
  reports: any[];
  page: string;
  name: string;
  nameUrl: string;
  nameCapitalized: string;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export default function PersonPageClient({
  reports,
  page,
  name,
  nameUrl,
  nameCapitalized,
  isFirstPage,
  isLastPage,
}: PersonPageClientProps) {
  const isPaginationEnabled = !(isFirstPage && isLastPage);
  const isLoading = usePageLoadingFull();
  const {
    article,
    handleArticleChange,
    clearArticleInput,
    handleGetReport,
    isUrlProvidedAsInput,
  } = useHomePageContext();
  const [isArticleInputShown, setIsArticleInputShown] = useState(false);
  const isReportListEmpty = reports.length === 0;
  const shouldShowBottomControls = reports.length > 8;

  const onCardClick = (reportUrl: string) => () => {
    va.track(EVENT.reportCardClicked, { reportUrl });
  };

  const toggleArticleInput = (isTop: boolean) => () => {
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
      <div className="w-full max-w-full sm:max-w-[1400px] mx-auto flex flex-col justify-center items-center pb-4">
        <h1 className="text-3xl font-bold mt-4 mb-2">{nameCapitalized}</h1>
        <h2 className="text-sm font-normal text-gray-500 text-center mx-4 mb-1">
          {TEXTS.subtitle(nameCapitalized)}
        </h2>
        {!isReportListEmpty && (
          <p className="text-xs text-gray-500 opacity-80 text-center mx-4 mb-4">
            ({TEXTS.poweredBy})
          </p>
        )}
        <BackButton text={TEXTS.backButton} goTo="/people" />
        <div className="mb-4">
          <CreateReportButton
            onClick={toggleArticleInput(true)}
            isArticleInputShown={isArticleInputShown}
          />
        </div>

        <Collapsible open={isArticleInputShown} className="w-full mx-auto px-4">
          <CollapsibleContent>
            <div className="w-full mx-auto px-4 pb-4">
              {isUrlProvidedAsInput && (
                <p className="text-center mb-4 -mt-4 text-xs text-gray-500">
                  {TEXTS.articleTextExtracted}
                  &nbsp;
                  <a
                    href={WOLRD_NEWS_API_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500"
                  >
                    {TEXTS.worldNewsApi}
                  </a>
                </p>
              )}
              <AtricleInput
                article={article}
                onArticleChange={handleArticleChange}
                onGetReport={handleGetReport}
                isUrlProvidedAsInput={isUrlProvidedAsInput}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {isReportListEmpty ? (
          <div className="flex flex-col justify-center items-center p-4">
            <p className="text-base text-gray-900">{TEXTS.noReportsYet}</p>
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

        {shouldShowBottomControls && (
          <div className="flex flex-col items-center">
            <CreateReportButton
              onClick={toggleArticleInput(false)}
              isArticleInputShown={isArticleInputShown}
            />
            {isArticleInputShown && (
              <Collapsible
                open={isArticleInputShown}
                className="w-full mx-auto px-4 mt-4"
              >
                <CollapsibleContent>
                  <div className="w-full mx-auto px-4 pb-4">
                    {isUrlProvidedAsInput && (
                      <p className="text-center mb-4 -mt-4 text-xs text-gray-500">
                        {TEXTS.articleTextExtracted}
                        &nbsp;
                        <a
                          href={WOLRD_NEWS_API_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-500"
                        >
                          {TEXTS.worldNewsApi}
                        </a>
                      </p>
                    )}
                    <AtricleInput
                      article={article}
                      onArticleChange={handleArticleChange}
                      onGetReport={handleGetReport}
                      isUrlProvidedAsInput={isUrlProvidedAsInput}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
            <BackButton text={TEXTS.backButton} goTo="/people" />
          </div>
        )}
      </div>

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
