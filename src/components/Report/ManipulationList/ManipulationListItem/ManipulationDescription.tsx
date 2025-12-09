import React from 'react';

interface ManipulationDescriptionProps {
  name: string;
  description: string;
  context: string;
}

export default function ManipulationDescription({ name, description, context }: ManipulationDescriptionProps) {
  return (
    <div className="flex flex-col mb-4 min-w-[60%] flex-[2]">
      <p className="text-sm font-medium text-gray-900 mb-1">
        {name}
      </p>
      <div className="flex flex-col text-sm text-gray-500">
        <p className="text-gray-900 mb-1">
          {description}
        </p>
        <p className="text-gray-500">
          {context}
        </p>
      </div>
    </div>
  )
}
