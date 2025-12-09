"use client";

import React, { MouseEvent } from 'react';
import va from '@vercel/analytics';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronRight, ChevronLeft, ChevronsLeft, ArrowUpToLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EMPTY_STRING, EVENT } from '@/constants/constants';
import { scrollToTop } from '@/utils/utils';

const TEXTS = {
  skipToFirstPage: 'Skip to First Page',
  previousPage: 'Previous Page',
  nextPage: 'Next Page',
}

const PAGE_QUERY_PARAM_KEY = 'page';

interface PaginationProps {
  page: number | string;
  isFirstPage: boolean;
  onClick?: () => void;
  isLastPage: boolean;
  onChange?: () => void;
  isScrollUpIconShown?: boolean;
}

export default function Pagination({
  page,
  isFirstPage,
  onClick,
  isLastPage,
  onChange,
  isScrollUpIconShown,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParams = getPageParams(page, pathname, searchParams, isFirstPage, isLastPage);

  const onStartClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isFirstPage) {
      e.preventDefault();
      return;
    }

    va.track(EVENT.skipToFirstPageClicked, { page });
    onClick && onClick();
  };

  const handlePageChange = (directionText: string, directionNumber: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    const shouldIgnore = (directionNumber === -1 && isFirstPage) || (directionNumber === 1 && isLastPage);

    if (shouldIgnore) {
      e.preventDefault();
      return;
    }

    const event = EVENT.pageChanged(directionText)
    va.track(event, { page });
    onChange && onChange();
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex gap-2">
        <Link 
          href={pageParams.first} 
          aria-label={TEXTS.skipToFirstPage} 
          rel="start" 
          onClick={onStartClick}
          className={isFirstPage ? 'pointer-events-none' : ''}
        >
          <Button variant="outline" size="icon" disabled={isFirstPage}>
            <ChevronsLeft className="h-5 w-5" />
          </Button>
        </Link>
        <Link 
          href={pageParams.prev} 
          aria-label={TEXTS.previousPage} 
          rel="prev" 
          onClick={handlePageChange(TEXTS.previousPage, -1)}
          className={isFirstPage ? 'pointer-events-none' : ''}
        >
          <Button variant="outline" size="icon" disabled={isFirstPage}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="flex gap-2">
        <Link 
          href={pageParams.next} 
          aria-label={TEXTS.nextPage} 
          rel="next" 
          onClick={handlePageChange(TEXTS.nextPage, +1)}
          className={isLastPage ? 'pointer-events-none' : ''}
        >
          <Button variant="outline" size="icon" disabled={isLastPage}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </Link>
        {isScrollUpIconShown && (
          <Button variant="outline" size="icon" onClick={() => scrollToTop()}>
            <ArrowUpToLine className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}

function GenerateLinkWithUpdatedQueryParam(key: string, value: string | number, searchParams: URLSearchParams) {
  const newQuery = new URLSearchParams(searchParams.toString());
  const isGoToFirstPage = key === 'page' && (value === 1 || value === '1');

  if (isGoToFirstPage) {
    newQuery.delete(key);
  } else {
    newQuery.set(key, value.toString());
  }

  const isQueryEmpty = [...newQuery].length === 0;
  const queryString = `?${newQuery.toString()}`;

  return isQueryEmpty ? EMPTY_STRING : queryString;
};


function getPageParams(page: string | number, pathname: string | null, searchParams: URLSearchParams, isFirstPage: boolean, isLastPage: boolean) {
  const nextPage = parseInt(page.toString()) + 1;
  const prevPage = parseInt(page.toString()) - 1;
  const nextPageParamsString = GenerateLinkWithUpdatedQueryParam(PAGE_QUERY_PARAM_KEY, nextPage, searchParams);
  const prevPageParamsString = GenerateLinkWithUpdatedQueryParam(PAGE_QUERY_PARAM_KEY, prevPage, searchParams);
  const firstPageParamsString = GenerateLinkWithUpdatedQueryParam(PAGE_QUERY_PARAM_KEY, 1, searchParams);
  const nextPageLink = isLastPage ? EMPTY_STRING : `${pathname}${nextPageParamsString}`;
  const prevPageLink = isFirstPage ? EMPTY_STRING : `${pathname}${prevPageParamsString}`;
  const firstPageLink = isFirstPage ? EMPTY_STRING : `${pathname}${firstPageParamsString}`;

  return {
    prev: prevPageLink,
    next: nextPageLink,
    first: firstPageLink
  };
};
