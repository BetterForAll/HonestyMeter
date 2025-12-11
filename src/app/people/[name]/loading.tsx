"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TEXTS = {
  objectivityScore: "Objectivity Score",
  viewReport: "View Bias Report",
};

// Skeleton for individual report card
function ReportCardSkeleton() {
  return (
    <Card className="flex flex-col justify-start items-start w-full p-4">
      <div className="h-12 w-full mb-2 bg-gray-200 animate-pulse rounded" />
      <div className="w-full flex justify-between items-center mb-2">
        <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
        <div className="w-14 h-3 bg-gray-200 animate-pulse rounded" />
      </div>
      <div className="h-[150px] w-72 bg-gray-200 animate-pulse rounded mb-2" />
      <div className="w-full flex justify-between items-center gap-2 mb-2">
        <span className="text-gray-500">{TEXTS.objectivityScore}</span>
        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
        <div className="w-14 h-6 bg-gray-200 animate-pulse rounded" />
      </div>
      <Button variant="outline" className="w-full" disabled>
        {TEXTS.viewReport}
      </Button>
    </Card>
  );
}

export default function Loading() {
  const skeletonCount = 6;

  return (
    <div className="w-full max-w-full sm:max-w-[1400px] mx-auto flex flex-col justify-center items-center pb-4">
      {/* Person name skeleton */}
      <div className="h-9 w-48 bg-gray-200 animate-pulse rounded mt-4 mb-2" />
      
      {/* Subtitle skeleton */}
      <div className="h-4 w-64 bg-gray-200 animate-pulse rounded mx-4 mb-1" />
      
      {/* Powered by skeleton */}
      <div className="h-3 w-40 bg-gray-200 animate-pulse rounded mx-4 mb-4" />
      
      {/* Back button skeleton */}
      <div className="h-10 w-48 bg-gray-200 animate-pulse rounded mb-4" />
      
      {/* Create report button skeleton */}
      <div className="h-10 w-40 bg-gray-200 animate-pulse rounded mb-4" />

      {/* Report cards skeleton grid */}
      <ul className="flex flex-wrap justify-center gap-4 mb-4 list-none p-0">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <li key={index} className="w-80 p-0">
            <ReportCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
