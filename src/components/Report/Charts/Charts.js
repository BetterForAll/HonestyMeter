import React from 'react';
import { Box, Paper } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import SidesBalanceChart from './SidesBalanceChart';
import SidesScoresChart from './SidesScoresChart';
import FavoredSide from './FavoredSide';
import theme from '@/theme'
import { string } from 'prop-types';
import { sidesBalanceChartDataPropType, sidesScoreChartDataPropType } from '../reportPropTypes';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title, Tooltip, Legend
);

export default function Charts({ sidesScoreData, sidesBalanceChartData, favoredSide }) {
  return (
    <Paper
      elevation={2}
      sx={STYLES.container}>
      <Box sx={STYLES.chartsContainer}>
        <SidesScoresChart sidesScoreData={sidesScoreData} />
        <SidesBalanceChart sidesBalanceChartData={sidesBalanceChartData} />
      </Box>
      <FavoredSide favoredSide={favoredSide} />
    </Paper>
  )
}

Charts.propTypes = {
  sidesScoreData: sidesScoreChartDataPropType.isRequired,
  sidesBalanceChartData: sidesBalanceChartDataPropType.isRequired,
  favoredSide: string,
}

const STYLES = {
  container: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
  chartsContainer: {
    display: 'flex',
    gap: theme.spacing(4),
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    pointerEvents: 'none',
  }
}





