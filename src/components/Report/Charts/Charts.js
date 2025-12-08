import React from 'react';
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
import { string } from 'prop-types';
import { sidesBalanceChartDataPropType, sidesScoreChartDataPropType } from '../reportPropTypes';
import { Card, CardContent } from '../../ui/card';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title, Tooltip, Legend
);

export default function Charts({ sidesScoreData, sidesBalanceChartData, favoredSide }) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4 flex flex-col gap-8">
        <div className="flex gap-8 flex-wrap w-full justify-center pointer-events-none">
          <SidesScoresChart sidesScoreData={sidesScoreData} />
          <SidesBalanceChart sidesBalanceChartData={sidesBalanceChartData} />
        </div>
        <FavoredSide favoredSide={favoredSide} />
      </CardContent>
    </Card>
  )
}

Charts.propTypes = {
  sidesScoreData: sidesScoreChartDataPropType.isRequired,
  sidesBalanceChartData: sidesBalanceChartDataPropType.isRequired,
  favoredSide: string,
}
