import React from 'react';
import ManipulationListItem from './ManipulationListItem/ManipulationListItem';
import { Manipulation } from '@/types/report';

const TEXTS = {
  title: 'Detected Manipulations & Suggested Changes'
}

interface ManipulationListProps {
  manipulations: Manipulation[];
}

export default function ManipulationList({ manipulations = [] }: ManipulationListProps) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold px-4 mb-4">
        {TEXTS.title}
      </h2>
      <ul className="list-none p-0 pb-0">
        {manipulations.map((manipulation, index) => {
          return (
            <ManipulationListItem
              manipulation={manipulation}
              key={index} />
          )
        }
        )}
      </ul>
    </div>
  )
}
