import React from 'react';
import va from '@vercel/analytics';
import theme from '@/theme';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EjectIcon from '@mui/icons-material/Eject';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { EMPTY_STRING, EVENT } from '@/constants/constants';
import { scrollToTop } from '@/utils/utils';
import { useRouter } from 'next/router';


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
  const pageParams = getPageParams(page, router);

  const onStartClick = () => {
    va.track(EVENT.skipToFirstPageClicked, { page });
    onClick && onClick();
  };

  const handlePageChange = (direction) => () => {
    const event = EVENT.pageChanged(direction)
    va.track(event, { page });
    onChange && onChange();
  };

  return (
    <Box sx={STYLES.pagination}>
      <Link href={pageParams.first} aria-label={TEXTS.skipToFirstPage} rel="start">
        <Button disabled={isFirstPage} onClick={onStartClick}>
          <SkipPreviousIcon fontSize='large' sx={STYLES.skipIcon} />
        </Button>
      </Link>
      <Link href={pageParams.prev} aria-label={TEXTS.previousPage} rel="prev">
        <Button disabled={isFirstPage} onClick={handlePageChange(TEXTS.nextPage)}>
          <ArrowLeftIcon fontSize='large' />
        </Button>
      </Link>
      <Link href={pageParams.next} aria-label={TEXTS.nextPage} rel="next">
        <Button disabled={isLastPage} onClick={handlePageChange(TEXTS.previousPage)}>
          <ArrowRightIcon fontSize='large' />
        </Button>
      </Link>
      {
        isScrollUpIconShown &&
        <Button onClick={scrollToTop}>
          <EjectIcon fontSize='large' sx={STYLES.ejectIcon} />
        </Button>
      }
    </Box>
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

  return isQueryEmpty ? EMPTY_STRING : `?${newQuery.toString()}`;
};


function getPageParams(page, router) {
  const nextPage = parseInt(page) + 1;
  const prevPage = parseInt(page) - 1;
  const nextPageParamsString = GenerateLinkWithUpdatedQueryParam(PAGE_QUERY_PARAM_KEY, nextPage, router);
  const prevPageParamsString = GenerateLinkWithUpdatedQueryParam(PAGE_QUERY_PARAM_KEY, prevPage, router);
  const firstPageParamsString = GenerateLinkWithUpdatedQueryParam(PAGE_QUERY_PARAM_KEY, 1, router);
  const nextPageLink = `${router.pathname}${nextPageParamsString}`;
  const prevPageLink = `${router.pathname}${prevPageParamsString}`;
  const firstPageLink = `${router.pathname}${firstPageParamsString}`;

  return {
    prev: prevPageLink,
    next: nextPageLink,
    first: firstPageLink
  };
};

const STYLES = {
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  skipIcon: {
    transform: 'scale(0.75)',
  },
  ejectIcon: {
    transform: 'scale(0.60)'
  }
};
