import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import theme from '@/theme';
import { object } from 'prop-types'

const TEXTS = {
  title: 'Sides Objectivity Scores'
}

const SIDES_SCORE_CHART_OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
};

export default function SidesScoresChart({ sidesScoreData }) {
  return (
    <Box sx={STYLES.container}>
      <Typography variant="h6" sx={STYLES.title}>{TEXTS.title}</Typography>
      <Paper elevation={2} sx={STYLES.paper}>
        <Bar options={SIDES_SCORE_CHART_OPTIONS} data={sidesScoreData} />
      </Paper>
    </Box>
  )
}

const STYLES = {
  container: {
    mixWidth: '60%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    maxHeight: '319px'
  },
}

SidesScoresChart.propTypes = {
  sidesScoreData: object.isRequired
}


