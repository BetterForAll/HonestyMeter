/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  getBaseUrlFromUrlString,
  convertUTCDateToUserTimeZone,
} from '@/utils/utils';
import CircularProgressWithLabel from '@/components/ReportList/CircularProgressWithLabel';
import useIsTextLinesOverFlow from '@/hooks/useIsTextLinesOverflow';
import { EMPTY_STRING } from '@/constants/constants';
import { Report } from '@/types/report';

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

interface ReportListProps {
  reports: Report[];
  onCardClick: (url: string) => (e: React.MouseEvent) => void;
  isLoading: boolean;
}

export default function ReportList({ reports, onCardClick, isLoading }: ReportListProps) {
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
            articleTitle={articleTitle || ''}
            randomImageUrl={randomImageUrl}
            source={source}
            articleDateInUserTimeZone={articleDateInUserTimeZone}
          />
        );
      })}
    </ul>
  );
}

interface ReportListItemProps {
  onCardClick: (url: string) => (e: React.MouseEvent) => void;
  reportUrl: string;
  report?: Report;
  isLoading: boolean;
  articleTitle: string;
  randomImageUrl: string;
  source: string;
  articleDateInUserTimeZone: string;
}

function ReportListItem({
  onCardClick,
  reportUrl,
  report = {} as Report,
  isLoading,
  articleTitle,
  randomImageUrl,
  source,
  articleDateInUserTimeZone,
}: ReportListItemProps) {
  return (
    <li className="w-80 p-0">
      {isLoading ? (
        <ReportCardSkeleton />
      ) : (
        <Link href={reportUrl} onClick={onCardClick(reportUrl)} className="no-underline">
          <ReportCard
              articleTitle={articleTitle}
              source={source}
              articleDateInUserTimeZone={articleDateInUserTimeZone}
              randomImageUrl={randomImageUrl}
              objectivityScore={report.score || 0}
          />
        </Link>
      )}
    </li>
  );
}

interface ReportCardProps {
  articleTitle: string;
  source: string;
  articleDateInUserTimeZone: string;
  randomImageUrl: string;
  objectivityScore: number;
}

function ReportCard({
  articleTitle,
  source,
  articleDateInUserTimeZone,
  randomImageUrl,
  objectivityScore,
}: ReportCardProps) {
  const { colorClass, content } = getScoreStyle(objectivityScore);
  const articleTitleRef = useRef<HTMLHeadingElement>(null);
  const isTitleTextOverflow = useIsTextLinesOverFlow(articleTitleRef);
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <Card className="flex flex-col justify-start items-start cursor-pointer transition-all duration-200 w-full p-4 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5">
      <h3 
        ref={articleTitleRef}
        className="h-10 w-full mb-2 text-sm font-medium text-gray-600 line-clamp-2 overflow-hidden text-left"
        title={isTitleTextOverflow ? articleTitle : ''}
      >
        {articleTitle}
      </h3>
      <div className="w-full flex justify-between items-center mb-2 text-sm text-gray-500 gap-2">
        <span className="flex-1 min-w-0 truncate text-left">
          {source}
        </span>
        <span className="text-xs whitespace-nowrap flex-shrink-0">
          {articleDateInUserTimeZone}
        </span>
      </div>
      <div className="h-[150px] w-72 rounded mb-2 overflow-hidden relative">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img 
          src={randomImageUrl} 
          alt={TEXTS.imageAlt} 
          loading='lazy' 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isImageLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsImageLoading(false)}
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

export const getScoreStyle = (score: number) => {
  let colorClass;
  let content;

  if (score < 70) {
    // Rose - sophisticated, not harsh
    colorClass = 'text-rose-600';
    content = ` ${TEXTS.objectivityLevel.low}`;
  } else if (score < 80) {
    // Amber - warm, professional
    colorClass = 'text-amber-600';
    content = ` ${TEXTS.objectivityLevel.medium}`;
  } else {
    // Emerald - premium, trustworthy
    colorClass = 'text-emerald-600';
    content = ` ${TEXTS.objectivityLevel.high}`;
  }

  return {
    colorClass,
    content,
  };
};
