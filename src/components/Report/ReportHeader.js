import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import theme from '@/theme';
import { string, number } from 'prop-types';
import { getBaseUrlFromUrlString } from '@/utils/utils';

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
  articleLink
}) {
  const articleBaseUrl = articleLink ? getBaseUrlFromUrlString(articleLink) : '';

  return (
    <Box sx={STYLES.container}>
      <Paper elevation={2} sx={STYLES.paper}>
        <Typography variant="h6" sx={STYLES.score}>
          {TEXTS.score}:&nbsp;&nbsp;{score} <Typography component='span' variant='h6' color="text.secondary">{TEXTS.outOf100}</Typography>
        </Typography>
        {
          articleTitle &&
          <Typography variant="subtitle1" sx={STYLES.articleTitle}>
            <b>
              {TEXTS.articleTitle}:
            </b>
            &nbsp;
            {articleTitle}
            &nbsp;
            {articleBaseUrl &&
              <a href={articleLink} target="_blank">
                {TEXTS.readOn}
                &nbsp;
                {articleBaseUrl}
              </a>}
          </Typography>
        }
        <Typography variant="subtitle1" sx={STYLES.explanation}>
          {
            articleTitle &&
            <b>
              {`${TEXTS.reportOverview}:`}
              &nbsp;
            </b>
          }
          {explanation}
        </Typography>
      </Paper>
    </Box>
  )
}

ReportHeader.propTypes = {
  score: number,
  explanation: string
}

const STYLES = {
  container: {
    marginBottom: theme.spacing(4)
  },
  title: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2)
  },
  paper: {
    padding: theme.spacing(3),
  },
  score: {
    marginBottom: theme.spacing(1),
  },
  articleTitle: {
    textAlign: 'left',
    marginBottom: theme.spacing(1),
  },
  explanation: {
    textAlign: 'left',
  },
  explanationText: {

  },
  readMore: {

  }
}