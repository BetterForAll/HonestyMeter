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

const TEXTS = {
  skipToFirstPage: 'Skip to First Page',
  previousPage: 'Previous Page',
  nextPage: 'Next Page',
}

export default function Pagination({
  page,
  name = EMPTY_STRING,
  isFirstPage,
  onClick,
  isLastPage,
  onChange,
  isScrollUpIconShown,
}) {

  const pageParams = getPageParams(name, page);

  const onStartClick = () => {
    va.track(EVENT.skipToFirstPageClicked, { page });
    onClick && onClick();
  };

  const handlePageChange = (direction) => () => {
    console.log({ page, direction })
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

const getPageParams = (name, page) => {
  const prefix = name ? `/people/${name}` : EMPTY_STRING;
  return {
    prev: `${prefix}?page=${parseInt(page) - 1}`,
    next: `${prefix}?page=${parseInt(page) + 1}`,
    first: `${prefix}?page=1`,
  }
}

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
