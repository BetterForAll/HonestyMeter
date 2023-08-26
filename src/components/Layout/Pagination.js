import React from 'react';
const { useRouter } = require('next/router');
import va from '@vercel/analytics';
import { Box, Button } from '@mui/material';
import theme from '@/theme';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EjectIcon from '@mui/icons-material/Eject';
import { EVENT, STEPS } from '@/constants/constants';
import { scrollToTop } from '@/utils/utils';
import { Scale } from 'chart.js';

export default function Pagination({
  isFirstPage,
  onClick,
  isLastPage,
  onChange
}) {
  const router = useRouter();
  const { page: pageFromQuery = 1 } = router.query || {};

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

  const handlePageChange = (step) => () => {
    const event =
      step === STEPS.forward
        ? EVENT.nextPageClicked
        : EVENT.previousPageClicked;
    va.track(event, { page: pageFromQuery });

    const nextPage = parseInt(pageFromQuery) + step;
    router.query.page = nextPage;
    router.push(router);

    console.log({
      pageFromQuery,
      nextPage,
      router
    })

    onChange && onChange();
  };

  return (
    <Box sx={REPORTS_STYLES.pagination}>
      <Button disabled={isFirstPage} onClick={onStartClick}>
        <SkipPreviousIcon fontSize='large' sx={REPORTS_STYLES.skipIcon} />
      </Button>
      <Button disabled={isFirstPage} onClick={handlePageChange(STEPS.back)}>
        <ArrowLeftIcon fontSize='large' />
      </Button>
      <Button disabled={isLastPage} onClick={handlePageChange(STEPS.forward)}>
        <ArrowRightIcon fontSize='large' />
      </Button>
      <Button onClick={scrollToTop}>
        <EjectIcon fontSize='large' sx={{ transform: 'scale(0.60)' }} />
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
