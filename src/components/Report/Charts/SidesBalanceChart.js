import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import theme from '@/theme';
import { object } from 'prop-types';

const TEXTS = {
  title: 'Sides Representation Balance'
}

export default function SidesBalanceChart({ sidesBalanceChartData }) {
  return (
    <Box sx={STYLES.container}>
      <Typography variant="h6" sx={STYLES.title}>
        {TEXTS.title}
      </Typography>
      <Paper elevation={2} sx={STYLES.paper}>
        <Box style={STYLES.pieContainer}>
          <Pie data={sidesBalanceChartData} />
        </Box>
      </Paper>
    </Box>
  )
}

const STYLES = {
  container: {
    width: '300px'
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  pieContainer: {
    width: '100%',
    height: '287px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

SidesBalanceChart.propTypes = {
  sidesBalanceChartData: object.isRequired
}





