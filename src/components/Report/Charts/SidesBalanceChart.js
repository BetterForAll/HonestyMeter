import React from 'react';
import { Pie } from 'react-chartjs-2';
import { object } from 'prop-types';
import { Card, CardContent } from '../../ui/card';

const TEXTS = {
  title: 'Sides Representation Balance'
}

export default function SidesBalanceChart({ sidesBalanceChartData }) {
  return (
    <div className="w-[300px]">
      <h3 className="text-lg font-semibold text-center mb-4">
        {TEXTS.title}
      </h3>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="w-full h-[287px] flex justify-center items-center">
            <Pie data={sidesBalanceChartData} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

SidesBalanceChart.propTypes = {
  sidesBalanceChartData: object.isRequired
}
