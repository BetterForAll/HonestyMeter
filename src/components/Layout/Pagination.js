import React from 'react';
const { useRouter } = require('next/router');
import va from '@vercel/analytics';
import { Box, Button } from '@mui/material';
import theme from '@/theme';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { EVENT } from '@/constants/constants';

const STEPS = {
  forward: 1,
  back: -1,
};

export default function Pagination({
  isFirstPage,
  onClick,
  onChangePage,
  isLastPage,
}) {
  const router = useRouter();
  const { page: pageFromQuery } = router.query;

  const onStartClick = () => {
    va.track(EVENT.skipToFirstPageClicked, { page: pageFromQuery });

    const currentQuery = router.query;

    const newQuery = {
      ...currentQuery,
      page: 1,
    };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });

    onClick && onClick();
  };

  return (
    <Box sx={REPORTS_STYLES.pagination}>
      <Button disabled={isFirstPage} onClick={onStartClick}>
        <SkipPreviousIcon fontSize='large' sx={REPORTS_STYLES.skipIcon} />
      </Button>
      <Button disabled={isFirstPage} onClick={onChangePage(STEPS.back)}>
        <ArrowLeftIcon fontSize='large' />
      </Button>
      <Button disabled={isLastPage} onClick={onChangePage(STEPS.forward)}>
        <ArrowRightIcon fontSize='large' />
      </Button>
    </Box>
  );
}

const REPORTS_STYLES = {
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  skipIcon: {
    transform: 'scale(0.75)',
  },
};
