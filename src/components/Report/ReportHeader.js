import React from 'react';
import va from '@vercel/analytics';
import { Typography, Paper, Box } from '@mui/material';
import theme from '@/theme';
import { string, number, object } from 'prop-types';
import { convertUTCDateToUserTimeZone, getBaseUrlFromUrlString } from '@/utils/utils';
import { EVENT } from '@/constants/constants';
import CircularProgressWithLabel from '../ReportList/CircularProgressWithLabel';
import { getScoreStyle } from '../ReportList/ReportList';
import Share from '../Share';
import Badge from '../Badge/Badge';
import Link from 'next/link';

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
  shareProps,
  biasLevel
}) {
  const articleBaseUrl = articleLink ? getBaseUrlFromUrlString(articleLink) : '';
  const userTimeZoneArticleDate = convertUTCDateToUserTimeZone(articleDate);
  const { color, content } = getScoreStyle(score);
  const badgeUrl = score >= 80 ? `/badge/fair` : score >= 70 ? `/badge/medium` : `/badge/high`;


  const fireArticleLinkClickEvent = () => {
    va.track(EVENT.articleLinkClicked, { articleTitle, articleLink, score, articleDate })
  }

  return (
    <Paper elevation={2} sx={STYLES.paper}>
      <Box sx={STYLES.objectivityScore}>
        <Box sx={{ width: { xs: '100%', sm: '300px' }, display: 'flex', gap: theme.spacing(1), justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{
            fontWeight: theme.typography.fontWeightMedium,
          }}>{TEXTS.score}</Typography>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', }}>
            <CircularProgressWithLabel value={score} color={color} />
          </Box>
          <Typography sx={{ color, textAlign: 'right' }}>{content}</Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flex: { xs: 1, sm: 0.82 },
          paddingBottom: theme.spacing(1),
          gap: theme.spacing(2),
        }}>
          <Box sx={{ transform: { xs: 'translateX(0)', md: 'translateX(-34px)' } }}>
            <Link href={badgeUrl} style={{ textDecoration: 'none' }}>
              <Badge biasLevel={biasLevel} showBadgeName showTitle showSubtitle isTooltipShownOnDesktop showFullTooltip height='100px' />
            </Link>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: { xs: 0, sm: theme.spacing(1) } }} >
            <Share {...shareProps} showCtaLine1={false} showCtaLine2={false} />
          </Box>
        </Box>
      </Box>
      {/* <Typography variant="h2" sx={STYLES.score}>
        {TEXTS.score}:&nbsp;&nbsp;{score}&nbsp;
        <Typography component='span' variant='h2' sx={STYLES.score}>
          {TEXTS.outOf100}
        </Typography>
      </Typography> */}
      {
        articleTitle &&
        <Box variant="subtitle1" sx={STYLES.articleDetails}>
          <Box sx={{ marginBottom: theme.spacing(0.5) }}>
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
  shareProps: object,
  biasLevel: number
}

const STYLES = {
  title: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2)
  },
  paper: {
    padding: theme.spacing(1, 3, 3),
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
  objectivityScore: {
    color: theme.palette.text.secondary,
    margin: 'auto',
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: { xs: 'row-reverse', sm: 'row' },
    justifyContent: { xs: 'center', sm: 'space-between' },
    alignItems: 'center',
    gap: theme.spacing(0.5),
    width: '100%',
    flexWrap: 'wrap-reverse',
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
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(3),
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