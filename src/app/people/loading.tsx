"use client";

import React from "react";

// Skeleton for people chip/badge
function PersonChipSkeleton() {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 animate-pulse w-24 h-7" />
  );
}

export default function Loading() {
  // Show skeleton for people page layout
  const skeletonCount = 30; // Typical number of people shown

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-start items-center px-2 pb-4 flex-1">
      {/* Title skeleton */}
      <div className="h-8 w-48 bg-gray-200 animate-pulse rounded my-4" />

      {/* Rating section skeleton */}
      <div className="w-full max-w-2xl mb-4 flex flex-col gap-4 sm:flex-row sm:gap-8 justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>

      {/* Search skeleton */}
      <div className="flex gap-2 items-center mb-4">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
        <div className="h-10 w-20 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Subtitle skeleton */}
      <div className="h-4 w-64 bg-gray-200 animate-pulse rounded mx-4 mt-2" />

      {/* People chips skeleton grid */}
      <div className="flex-1 mb-4 flex items-start">
        <ul className="flex flex-row flex-wrap p-2 sm:p-4 justify-center items-start list-none gap-2">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <li key={index} className="w-fit p-1">
              <PersonChipSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
