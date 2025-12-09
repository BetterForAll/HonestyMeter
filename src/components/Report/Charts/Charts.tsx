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
import { Card, CardContent } from '../../ui/card';
import { SidesBalanceChartData, SidesScoreChartData } from '@/types/report';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title, Tooltip, Legend
);

interface ChartsProps {
  sidesScoreData: SidesScoreChartData;
  sidesBalanceChartData: SidesBalanceChartData;
  favoredSide: string;
}

export default function Charts({ sidesScoreData, sidesBalanceChartData, favoredSide }: ChartsProps) {
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
