import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import theme from '@/theme';
import { string, number } from 'prop-types';

const TEXTS = {
  biasReport: 'Bias Report',
  score: 'Score',
  outOf100: '/ 100'
}

export default function ReportHeader({ score, explanation }) {
  return (
    <Box sx={STYLES.container}>
      <Typography variant="h4" sx={STYLES.title}>
        {TEXTS.biasReport}
      </Typography>
      <Paper elevation={2} style={STYLES.paper}>
        <Typography variant="h6">
          {TEXTS.score}:&nbsp;&nbsp;{score} <Typography component='span' variant='h6' color="text.secondary">{TEXTS.outOf100}</Typography>
        </Typography>
        <Typography variant="subtitle1" sx={STYLES.explanation}>
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
  explanation: {
    textAlign: 'left'
  },
}