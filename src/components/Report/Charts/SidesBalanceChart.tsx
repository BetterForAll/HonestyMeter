import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent } from '../../ui/card';
import { SidesBalanceChartData } from '@/types/report';

const TEXTS = {
  title: 'Sides Representation Balance'
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        padding: 12,
        font: {
          size: 11,
        },
      },
    },
    tooltip: {
      callbacks: {
        // Show percentage in tooltip
        label: function(context: any) {
          return `${context.label}`;
        }
      }
    }
  },
};

interface SidesBalanceChartProps {
  sidesBalanceChartData: SidesBalanceChartData;
}

export default function SidesBalanceChart({ sidesBalanceChartData }: SidesBalanceChartProps) {
  return (
    <div className="w-[320px]">
      <h3 className="text-lg font-semibold text-center mb-4">
        {TEXTS.title}
      </h3>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="w-full flex justify-center items-center">
            <Pie data={sidesBalanceChartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
