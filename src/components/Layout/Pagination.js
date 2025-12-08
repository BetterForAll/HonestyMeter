import React from 'react';
import va from '@vercel/analytics';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

export default function Pagination({
  page,
  isFirstPage,
  onClick,
  isLastPage,
  onChange,
  isScrollUpIconShown,
}) {
  const router = useRouter();
  const pageParams = getPageParams(page, router, isFirstPage, isLastPage);

  const onStartClick = (e) => {
    if (isFirstPage) {
      e.preventDefault();
      return;
    }

    va.track(EVENT.skipToFirstPageClicked, { page });
    onClick && onClick();
  };

  const handlePageChange = (directionText, directionNumber) => (e) => {
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
          <Button variant="outline" size="icon" onClick={scrollToTop}>
            <ArrowUpToLine className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}

function GenerateLinkWithUpdatedQueryParam(key, value, router) {
  const newQuery = new URLSearchParams(router.query);
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


function getPageParams(page, router, isFirstPage, isLastPage) {
  const nextPage = parseInt(page) + 1;
  const prevPage = parseInt(page) - 1;
  const nextPageParamsString = GenerateLinkWithUpdatedQueryParam(PAGE_QUERY_PARAM_KEY, nextPage, router);
  const prevPageParamsString = GenerateLinkWithUpdatedQueryParam(PAGE_QUERY_PARAM_KEY, prevPage, router);
  const firstPageParamsString = GenerateLinkWithUpdatedQueryParam(PAGE_QUERY_PARAM_KEY, 1, router);
  const nextPageLink = isLastPage ? EMPTY_STRING : `${router.pathname}${nextPageParamsString}`;
  const prevPageLink = isFirstPage ? EMPTY_STRING : `${router.pathname}${prevPageParamsString}`;
  const firstPageLink = isFirstPage ? EMPTY_STRING : `${router.pathname}${firstPageParamsString}`;

  return {
    prev: prevPageLink,
    next: nextPageLink,
    first: firstPageLink
  };
};
