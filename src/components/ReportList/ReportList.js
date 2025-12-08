/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  getBaseUrlFromUrlString,
  convertUTCDateToUserTimeZone,
} from '@/utils/utils';
import CircularProgressWithLabel from '@/components/ReportList/CircularProgressWithLabel';
import { string, number, bool, arrayOf, func } from 'prop-types';
import reportPropType from '../Report/reportPropTypes';
import useIsTextLinesOverFlow from '@/hooks/useIsTextLinesOverflow';
import { EMPTY_STRING } from '@/constants/constants';

// Use relative URL to avoid hydration mismatch (server vs client base URL)
const REPORT_URL = '/report';
const IMAGE_URL = 'https://picsum.photos/288/150?random=';
const TEXTS = {
  title: 'News Integrity Feed',
  subtitle:
    'Top news analysed for bias by HonestyMeter (powered by newsdata.io api)',
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
  noReportsYet: 'No reports yet',
  objectivityLevel: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  },
};

export default function ReportList({ reports, onCardClick, isLoading }) {
  return (
    <ul className="flex flex-wrap justify-center gap-4 mb-4 list-none p-0">
      {reports.map((report) => {
        const source = getBaseUrlFromUrlString(report.articleLink);
        const reportUrl = `${REPORT_URL}/${report._id}`;
        const randomImageUrl = `${IMAGE_URL}${report._id}`;
        const { articleTitle, articleDate } = report || {};
        const articleDateInUserTimeZone = articleDate
          ? convertUTCDateToUserTimeZone(articleDate)
          : EMPTY_STRING;

        return (
          <ReportListItem
            key={report._id}
            onCardClick={onCardClick}
            reportUrl={reportUrl}
            report={report}
            isLoading={isLoading}
            articleTitle={articleTitle}
            randomImageUrl={randomImageUrl}
            source={source}
            articleDateInUserTimeZone={articleDateInUserTimeZone}
          />
        );
      })}
    </ul>
  );
}

ReportList.propTypes = {
  reports: arrayOf(reportPropType),
  onCardClick: func.isRequired,
  isLoading: bool.isRequired,
};

function ReportListItem({
  onCardClick,
  reportUrl,
  report = {},
  isLoading,
  articleTitle,
  randomImageUrl,
  source,
  articleDateInUserTimeZone,
}) {
  return (
    <li className="w-80 p-0">
      {isLoading ? (
        <ReportCardSkeleton />
      ) : (
        <Link href={reportUrl} onClick={onCardClick(reportUrl)} className="no-underline">
          <ReportCard
            {...{
              articleTitle,
              source,
              articleDateInUserTimeZone,
              randomImageUrl,
              objectivityScore: report.score,
            }}
          />
        </Link>
      )}
    </li>
  );
}

ReportListItem.propTypes = {
  onCardClick: func.isRequired,
  reportUrl: string.isRequired,
  isLoading: bool.isRequired,
  articleTitle: string.isRequired,
  randomImageUrl: string.isRequired,
  source: string.isRequired,
  articleDateInUserTimeZone: string.isRequired,
};

function ReportCard({
  articleTitle,
  source,
  articleDateInUserTimeZone,
  randomImageUrl,
  objectivityScore,
}) {
  const { colorClass, content } = getScoreStyle(objectivityScore);
  const articleTitleRef = useRef({ current: null });
  const isTitleTextOverflow = useIsTextLinesOverFlow(articleTitleRef);

  return (
    <Card className="flex flex-col justify-start items-start cursor-pointer transition-all duration-200 w-full p-4 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5">
      <h3 
        ref={articleTitleRef}
        className="min-h-[48px] w-full mb-2 text-sm font-medium text-gray-600 line-clamp-3"
        title={isTitleTextOverflow ? articleTitle : ''}
      >
        {articleTitle}
      </h3>
      <div className="w-full flex justify-between items-center mb-2 text-sm text-gray-500">
        <span className="w-40 truncate">
          {source}
        </span>
        <span className="text-xs">
          {articleDateInUserTimeZone}
        </span>
      </div>
      <div className="h-[150px] w-72 bg-gray-200 rounded mb-2 overflow-hidden">
        <img 
          src={randomImageUrl} 
          alt={TEXTS.imageAlt} 
          loading='lazy' 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex justify-between items-center gap-2 mb-2 text-gray-500">
        <span>{TEXTS.objectivityScore}</span>
        <div className="flex-1 flex justify-center">
          <CircularProgressWithLabel value={objectivityScore} colorClass={colorClass} />
        </div>
        <span className={cn("font-semibold", colorClass)}>{content}</span>
      </div>
      <Button variant="outline" className="w-full">
        {TEXTS.viewReport}
      </Button>
    </Card>
  );
}

ReportCard.propTypes = {
  articleTitle: string.isRequired,
  source: string.isRequired,
  articleDateInUserTimeZone: string.isRequired,
  randomImageUrl: string.isRequired,
  objecetivityScore: number,
};

function ReportCardSkeleton() {
  return (
    <Card className="flex flex-col justify-start items-start w-full p-4">
      <div className="h-12 w-full mb-2 bg-gray-200 animate-pulse rounded" />
      <div className="w-full flex justify-between items-center mb-2">
        <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
        <div className="w-14 h-3 bg-gray-200 animate-pulse rounded" />
      </div>
      <div className="h-[150px] w-72 bg-gray-200 animate-pulse rounded mb-2" />
      <div className="w-full flex justify-between items-center gap-2 mb-2">
        <span className="text-gray-500">{TEXTS.objectivityScore}</span>
        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
        <div className="w-14 h-6 bg-gray-200 animate-pulse rounded" />
      </div>
      <Button variant="outline" className="w-full" disabled>
        {TEXTS.viewReport}
      </Button>
    </Card>
  );
}

export const getScoreStyle = (score) => {
  let colorClass;
  let content;

  if (score < 70) {
    colorClass = 'text-red-500';
    content = ` ${TEXTS.objectivityLevel.low}`;
  } else if (score < 80) {
    colorClass = 'text-yellow-500';
    content = ` ${TEXTS.objectivityLevel.medium}`;
  } else {
    colorClass = 'text-green-500';
    content = ` ${TEXTS.objectivityLevel.high}`;
  }

  return {
    colorClass,
    content,
  };
};
