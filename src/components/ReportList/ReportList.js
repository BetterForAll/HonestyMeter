/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';
import theme from '@/theme';
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  Skeleton,
  Typography,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import {
  getBaseUrl,
  getBaseUrlFromUrlString,
  convertUTCDateToUserTimeZone,
} from '@/utils/utils';
import CircularProgressWithLabel from '@/components/ReportList/CircularProgressWithLabel';
import { string, number, bool, arrayOf, func } from 'prop-types';
import reportPropType from '../Report/reportPropTypes';
import useIsTextLinesOverFlow from '@/hooks/useIsTextLinesOverflow';
import { EMPTY_STRING } from '@/constants/constants';
import Link from 'next/link';

//TODO: consider moving components to separate files

const baseUrl = getBaseUrl();
const REPORT_URL = `${baseUrl}report`;
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
    <List sx={REPORT_LIST_STYLES.list}>
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
    </List>
  );
}

ReportList.propTypes = {
  reports: arrayOf(reportPropType),
  onCardClick: func.isRequired,
  isLoading: bool.isRequired,
};

const REPORT_LIST_STYLES = {
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
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
    <ListItem
      sx={REPORT_LIST_ITEM_STYLES.listItem}
      key={report._id}
    >
      {isLoading ? (
        <ReportCardSkeleton />
      ) : (
        <Link href={reportUrl} onClick={onCardClick(reportUrl)} style={{ textDecoration: 'none' }}>
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
    </ListItem>
  );
}

ReportListItem.propTypes = {
  onCardClick: func.isRequired,
  reportUrl: string.isRequired,
  // report: shape(reportPropType), //TODO: add default to prevent warning
  isLoading: bool.isRequired,
  articleTitle: string.isRequired,
  randomImageUrl: string.isRequired,
  source: string.isRequired,
  articleDateInUserTimeZone: string.isRequired,
};

const REPORT_LIST_ITEM_STYLES = {
  listItem: {
    width: '320px',
    padding: 0,
  },
};

function ReportCard({
  articleTitle,
  source,
  articleDateInUserTimeZone,
  randomImageUrl,
  objectivityScore,
}) {
  const { color, content } = getScoreStyle(objectivityScore);
  const articleTitleRef = useRef({ current: null });
  const isTitleTextOverflow = useIsTextLinesOverFlow(articleTitleRef);
  const tooltipTitle = isTitleTextOverflow ? articleTitle : '';

  return (
    <Card sx={REPORT_CARD_STYLES.card}>
      <Tooltip title={tooltipTitle} placement='top'>
        <Typography
          sx={{
            ...REPORT_CARD_STYLES.textLine,
            ...REPORT_CARD_STYLES.articleTitle,
          }}
          ref={articleTitleRef}
        >
          {articleTitle}
        </Typography>
      </Tooltip>
      <Typography
        sx={REPORT_CARD_STYLES.textLine}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box component='span' style={REPORT_CARD_STYLES.source}>
          {source}
        </Box>
        <Box component='span' style={REPORT_CARD_STYLES.articleDate}>
          {articleDateInUserTimeZone}
        </Box>
      </Typography>
      <Box sx={REPORT_CARD_STYLES.image}>
        <img src={randomImageUrl} alt={TEXTS.imageAlt} loading='lazy' />
      </Box>
      <Box sx={REPORT_CARD_STYLES.objectivityScore}>
        <Typography>{TEXTS.objectivityScore}</Typography>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <CircularProgressWithLabel value={objectivityScore} color={color} />
        </Box>

        <Typography sx={{ color }}>{content}</Typography>
      </Box>
      <Button variant='outlined' sx={REPORT_CARD_STYLES.viewReportButton}>
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
    <Card sx={REPORT_CARD_STYLES.card}>
      <Skeleton
        sx={{
          ...REPORT_CARD_STYLES.textLine,
          ...REPORT_CARD_STYLES.articleTitle,
          width: 288,
        }}
      />
      <Typography
        sx={{
          ...REPORT_CARD_STYLES.textLine,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Skeleton
          component='span'
          sx={{ ...REPORT_CARD_STYLES.source, width: 80 }}
        />
        <Skeleton
          component='span'
          sx={{ ...REPORT_CARD_STYLES.articleDate, width: 56 }}
        />
      </Typography>
      <Box sx={REPORT_CARD_STYLES.image} />
      <Box sx={[REPORT_CARD_STYLES.objectivityScore]}>
        <Typography>{TEXTS.objectivityScore}</Typography>
        <Skeleton sx={{ width: 40, height: 40 }} />
        <Skeleton sx={{ width: 58, height: 24 }} />
      </Box>
      <Button
        variant='outlined'
        disabled
        sx={REPORT_CARD_STYLES.viewReportButton}
      >
        {TEXTS.viewReport}
      </Button>
    </Card>
  );
}

const REPORT_CARD_STYLES = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    width: '100%',
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      boxShadow:
        '0px 5px 5px -1px rgba(0,0,0,0.2), 0px 5px 5px 0px rgba(0,0,0,0.14), 0px 5px 5px 0px rgba(0,0,0,0.12)',
      transform: 'translate(0, -2px)',
    },
  },
  image: {
    height: '150px',
    width: '288px',
    backgroundColor: theme.palette.grey[300],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '4px',
    marginBottom: theme.spacing(1),
    animation: 'skeleton 1s ease-in-out infinite alternate',
    '@keyframes skeleton': {
      '0%': {
        backgroundColor: theme.palette.grey[200],
      },
      '100%': {
        backgroundColor: theme.palette.grey[100],
      },
    },
  },
  textLine: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  articleTitle: {
    height: '48px',
    width: '100%',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    fontWeight: theme.typography.fontWeightMedium,
  },
  source: {
    fontSize: theme.typography.fontSize * 1,
    width: '160px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  articleDate: {
    fontSize: theme.typography.fontSize * 0.75,
  },
  objectivityScore: {
    color: theme.palette.text.secondary,
    margin: 'auto',
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(1),
    width: '100%',
  },
  scoreDigit: (score) => getScoreStyle(score),
  viewReportButton: {
    width: '100%',
    color: theme.palette.text.secondary,
    borderColor: theme.palette.divider,
    '&:hover': {
      borderColor: theme.palette.divider,
      outline: `2px solid theme.palette.divider`,
    },
  },
};

export const getScoreStyle = (score) => {
  let color;
  let content;

  if (score < 70) {
    color = theme.palette.error.main;
    content = ` ${TEXTS.objectivityLevel.low}`;
  } else if (score < 80) {
    color = theme.palette.warning.main;
    content = ` ${TEXTS.objectivityLevel.medium}`;
  } else {
    color = theme.palette.success.main;
    content = ` ${TEXTS.objectivityLevel.high}`;
  }

  return {
    color,
    content,
  };
};
