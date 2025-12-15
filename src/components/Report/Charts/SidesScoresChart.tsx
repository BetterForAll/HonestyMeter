import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent } from '../../ui/card';
import { SidesScoreChartData } from '@/types/report';

const TEXTS = {
  title: 'Sides Objectivity Scores'
}

const SIDES_SCORE_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false, // Hide the built-in legend, we'll use a custom HTML legend
    },
    title: {
      display: true,
      text: '',
    },
    tooltip: {
      callbacks: {
        title: (context: any) => context[0]?.dataset?.label || '',
        label: (context: any) => `Score: ${context.parsed.y}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
    },
  },
};

interface SidesScoresChartProps {
  sidesScoreData: SidesScoreChartData;
}

// Custom HTML Legend component for better text wrapping
function CustomLegend({ datasets }: { datasets: any[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {datasets.map((dataset, index) => (
        <div 
          key={index} 
          className="flex items-start gap-2 max-w-[200px]"
        >
          <span 
            className="w-3 h-3 rounded-sm flex-shrink-0 mt-1"
            style={{ backgroundColor: dataset.backgroundColor }}
          />
          <span className="text-xs text-gray-700 break-words leading-relaxed">
            {dataset.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SidesScoresChart({ sidesScoreData }: SidesScoresChartProps) {
  return (
    <div className="min-w-[60%] flex flex-col flex-1">
      <h3 className="text-lg font-semibold text-center mb-4">{TEXTS.title}</h3>
      <Card className="mb-4">
        <CardContent className="p-4">
          <Bar options={SIDES_SCORE_CHART_OPTIONS} data={sidesScoreData} />
          <CustomLegend datasets={sidesScoreData.datasets} />
        </CardContent>
      </Card>
    </div>
  )
}

