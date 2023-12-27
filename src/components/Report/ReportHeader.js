import React from 'react';
import va from '@vercel/analytics';
import { Typography, Paper, Box } from '@mui/material';
import theme from '@/theme';
import { string, number } from 'prop-types';
import { convertUTCDateToUserTimeZone, getBaseUrlFromUrlString } from '@/utils/utils';
import { EVENT } from '@/constants/constants';

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
}) {
  const articleBaseUrl = articleLink ? getBaseUrlFromUrlString(articleLink) : '';
  const userTimeZoneArticleDate = convertUTCDateToUserTimeZone(articleDate);

  const fireArticleLinkClickEvent = () => {
    va.track(EVENT.articleLinkClicked, { articleTitle, articleLink, score, articleDate })
  }

  return (
    <Paper elevation={2} sx={STYLES.paper}>
      <Typography variant="h2" sx={STYLES.score}>
        {TEXTS.score}:&nbsp;&nbsp;{score}&nbsp;
        <Typography component='span' variant='h2' sx={STYLES.score}>
          {TEXTS.outOf100}
        </Typography>
      </Typography>
      {
        articleTitle &&
        <Box variant="subtitle1" sx={STYLES.articleDetails}>
          <Box>
            <Typography component='span' sx={STYLES.articleTitle}>
              {TEXTS.articleTitle}:
              &nbsp;
            </Typography>
            <Typography component='h1' style={{ display: 'inline-block' }}>
              {articleTitle}.
              &nbsp;
            </Typography>
          </Box>
          <Typography component='span'
            sx={STYLES.articleDate}
          >
            [ {userTimeZoneArticleDate} ]
          </Typography>
          &nbsp;
          {articleBaseUrl &&
            <Typography component='span'
              sx={STYLES.articleLink}
            >
              <a href={articleLink} target="_blank" onClick={fireArticleLinkClickEvent}>
                {TEXTS.readOn}
                &nbsp;
                {articleBaseUrl}
              </a>
            </Typography>
          }
        </Box>
      }
      <Box sx={STYLES.explanation}>
        <Typography component='span'>
          {`${TEXTS.reportOverview}:`}
          &nbsp;
        </Typography>
        <Typography component='span'>
          {explanation}
        </Typography>
      </Box>
    </Paper>
  )
}

ReportHeader.propTypes = {
  score: number,
  explanation: string,
  articleTitle: string,
  articleLink: string,
  articleDate: string,
}

const STYLES = {
  title: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2)
  },
  paper: {
    padding: theme.spacing(3),
    position: 'relative',
    marginBottom: theme.spacing(4)
  },
  score: {
    fontSize: theme.typography.fontSize * 1.5,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(2),
    '& > span': {
      color: theme.palette.text.secondary,
    }
  },
  articleDetails: {
    textAlign: 'left',
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.fontSize * 0.875,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  articleTitle: {
    fontWeight: theme.typography.fontWeightMedium
  },
  articleDate: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.secondary,
  },
  articleLink: {
    '& > a': {
      color: theme.palette.text.secondary,
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none',
      }
    }
  },
  explanation: {
    textAlign: 'left',
    '& span:first-of-type': {
      fontWeight: theme.typography.fontWeightMedium,
    }
  },
}