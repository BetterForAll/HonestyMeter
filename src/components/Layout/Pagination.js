import React from 'react';
import va from '@vercel/analytics';
import theme from '@/theme';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EjectIcon from '@mui/icons-material/Eject';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { EVENT } from '@/constants/constants';
import { scrollToTop } from '@/utils/utils';

const TEXTS = {
  skipToFirstPage: 'Skip to First Page',
  previousPage: 'Previous Page',
  nextPage: 'Next Page',
}

export default function Pagination({
  page,
  isFirstPage,
  onClick,
  isLastPage,
  onChange,
  isScrollUpIconShown,
}) {
  const pageParams = {
    prev: `?page=${parseInt(page) - 1}`,
    next: `?page=${parseInt(page) + 1}`,
    first: '?page=1',

  }

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
