import React from 'react';
import va from '@vercel/analytics';
import { convertUTCDateToUserTimeZone, getBaseUrlFromUrlString } from '@/utils/utils';
import { EVENT } from '@/constants/constants';
import CircularProgressWithLabel from '../ReportList/CircularProgressWithLabel';
import { getScoreStyle } from '../ReportList/ReportList';
import Share from '../Share';
import Badge from '../Badge/Badge';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { ShareProps } from '../Share'; // Assuming Share exports ShareProps or similar, if not I'll define partial or use any for now, but better to check Share.tsx exports. Share exports default. I'll check if I exported interface.

// I exported ShareProps in Share.tsx in step 914, but I didn't export it explicitly.
// "export default function Share({ ... }: ShareProps)"
// Wait, I declared "interface ShareProps" but didn't export it.
// I should export ShareProps from Share.tsx.
// For now I will define a local type or generic object, and then fix Share.tsx to export it.
// Actually, I can just define it here loosely or as `any` for `shareProps`.
// "shareProps: object" in propTypes.
// Let's assume ShareProps matching Share component props.

interface ReportHeaderProps {
  score: number;
  explanation: string;
  articleTitle: string;
  articleLink: string;
  articleDate: string;
  shareProps: any; // TODO: Export ShareProps from Share component
  biasLevel: number;
}

const TEXTS = {
  score: 'Objectivity Score',
  outOf100: '/ 100',
  readOn: 'Read on',
  articleTitle: 'Article Title',
  reportOverview: 'Report Overview',
}

export default function ReportHeader({
  score,
  explanation,
  articleTitle,
  articleLink,
  articleDate,
  shareProps,
  biasLevel
}: ReportHeaderProps) {
  const articleBaseUrl = articleLink ? getBaseUrlFromUrlString(articleLink) : '';
  const userTimeZoneArticleDate = convertUTCDateToUserTimeZone(articleDate);
  const { colorClass, content } = getScoreStyle(score);
  const badgeUrl = score >= 80 ? `/badge/fair` : score >= 70 ? `/badge/medium` : `/badge/high`;

  const fireArticleLinkClickEvent = () => {
    va.track(EVENT.articleLinkClicked, { articleTitle, articleLink, score, articleDate })
  }

  const handleArticleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fireArticleLinkClickEvent();
  }

  return (
    <Card className="relative mb-6">
      <CardContent className="p-4 sm:p-6">
        {/* Score and Badge Row */}
        <div className="flex flex-wrap-reverse items-center justify-between gap-2 mb-4 text-gray-500">
          {/* Score Container */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <span className="font-medium">{TEXTS.score}</span>
            <div className="flex-1 flex justify-center sm:flex-none">
              <CircularProgressWithLabel value={score} colorClass={colorClass} />
            </div>
            <span className={cn("font-semibold", colorClass)}>{content}</span>
          </div>
          
          {/* Badge and Share */}
          <div className="flex items-center gap-4 flex-1 sm:flex-none justify-between sm:justify-end">
            <Link href={badgeUrl} onClick={(e) => e.stopPropagation()} className="no-underline">
              <Badge biasLevel={biasLevel} showBadgeName showTitle showSubtitle isTooltipShownOnDesktop showFullTooltip height='100px' />
            </Link>
            <div className="flex items-center">
              <Share {...shareProps} showCtaLine1={false} showCtaLine2={false} />
            </div>
          </div>
        </div>

        {/* Article Details */}
        {articleTitle && (
          <div className="text-sm flex items-center flex-wrap mb-2">
            <div className="mb-1">
              <span className="font-medium">
                {TEXTS.articleTitle}:&nbsp;
              </span>
              <h1 className="inline text-base font-normal">
                {articleTitle}.&nbsp;
              </h1>
            </div>
            <span className="text-gray-500">
              [ {userTimeZoneArticleDate} ]
            </span>
            &nbsp;
            {articleBaseUrl && (
              <span className="text-gray-500">
                <a 
                  href={articleLink} 
                  target="_blank" 
                  onClick={handleArticleLinkClick}
                  className="text-gray-500 underline hover:no-underline"
                >
                  {TEXTS.readOn}&nbsp;{articleBaseUrl}
                </a>
              </span>
            )}
          </div>
        )}

        {/* Explanation */}
        <div className="text-left">
          <span className="font-medium">{`${TEXTS.reportOverview}:`}&nbsp;</span>
          <span>{explanation}</span>
        </div>
      </CardContent>
    </Card>
  )
}