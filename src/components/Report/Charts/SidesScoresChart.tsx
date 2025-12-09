import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent } from '../../ui/card';
import { SidesScoreChartData } from '@/types/report';

const TEXTS = {
  title: 'Sides Objectivity Scores'
}

const SIDES_SCORE_CHART_OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};

interface SidesScoresChartProps {
  sidesScoreData: SidesScoreChartData;
}

export default function SidesScoresChart({ sidesScoreData }: SidesScoresChartProps) {
  return (
    <div className="min-w-[60%] flex flex-col flex-1">
      <h3 className="text-lg font-semibold text-center mb-4">{TEXTS.title}</h3>
      <Card className="mb-4 max-h-[319px]">
        <CardContent className="p-4">
          <Bar options={SIDES_SCORE_CHART_OPTIONS} data={sidesScoreData} />
        </CardContent>
      </Card>
    </div>
  )
}
