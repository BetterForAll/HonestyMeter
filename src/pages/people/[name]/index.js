/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import va from '@vercel/analytics';
import { Share2 } from 'lucide-react';
import { scrollToTop, scrollToBottom, capitalizeFirstLetterOfEachWord, getQueryStringByAsPath } from '../../../utils/utils';
import Share from '@/components/Share';
import AtricleInput from '@/components/ArticleInput';
import Disclamer from '@/components/Disclamer';
import { API_URL, BASE_URL, EVENT, WOLRD_NEWS_API_URL } from '@/constants/constants';
import ReportList from '@/components/ReportList/ReportList';
import usePageLoadingFull from '@/hooks/usePageLoadingFull';
import Pagination from '@/components/Layout/Pagination';
import { array, bool, string, object } from 'prop-types';
import CreateReportButton from '@/components/Layout/CreateReportButton';
import BackButton from '@/components/Layout/BackButton';
import { useRouter } from 'next/router';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

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
      <div className="w-full max-w-full sm:max-w-[1400px] mx-auto flex flex-col justify-center items-center pb-4">
        <h1 className="text-3xl font-bold mt-4 mb-2">
          {nameCapitalized}
        </h1>
        <h2 className="text-sm font-normal text-gray-500 text-center mx-4 mb-1">
          {TEXTS.subtitle(nameCapitalized)}
        </h2>
        {!isReportListEmpty && (
          <p className="text-xs text-gray-500 opacity-80 text-center mx-4 mb-4">
            ({TEXTS.poweredBy})
          </p>
        )}
        <BackButton text={TEXTS.backButton} goTo='/people' />
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
                  <a href={WOLRD_NEWS_API_URL} target='_blank' rel='noreferrer' className="text-gray-500">
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
            <p className="text-base text-gray-900">
              {TEXTS.noReportsYet}
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
            <Pagination {...{ page, isFirstPage, isLastPage }} isScrollUpIconShown />
          </div>
        )}

        {shouldShowBottomControls && (
          <div className="flex flex-col items-center">
            <CreateReportButton
              onClick={toggleArticleInput(false)}
              isArticleInputShown={isArticleInputShown}
            />
             {isArticleInputShown && (
              <Collapsible open={isArticleInputShown} className="w-full mx-auto px-4 mt-4">
                <CollapsibleContent>
                 <div className="w-full mx-auto px-4 pb-4">
                  {isUrlProvidedAsInput && (
                    <p className="text-center mb-4 -mt-4 text-xs text-gray-500">
                      {TEXTS.articleTextExtracted}
                       &nbsp;
                      <a href={WOLRD_NEWS_API_URL} target='_blank' rel='noreferrer' className="text-gray-500">
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
            <BackButton text={TEXTS.backButton} goTo='/people' />
          </div>
        )}
      </div >
      
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
