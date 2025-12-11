"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Skeleton for the report page
export default function Loading() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="w-full mx-auto p-4">
      <div className="max-w-[1000px] mx-auto">
        {/* Report Header Skeleton */}
        <Card className="relative mb-6">
          <CardContent className="p-4 sm:p-6">
            {/* Score and Badge Row */}
            <div className="flex flex-wrap-reverse items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <div className="h-5 w-28 bg-gray-200 animate-pulse rounded" />
                <div className="w-14 h-14 bg-gray-200 animate-pulse rounded-full" />
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex items-center gap-4 flex-1 sm:flex-none justify-between sm:justify-end">
                <div className="w-24 h-24 bg-gray-200 animate-pulse rounded" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
                </div>
              </div>
            </div>

            {/* Article Details */}
            <div className="text-sm flex items-center flex-wrap mb-2">
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mr-2" />
              <div className="h-5 w-64 bg-gray-200 animate-pulse rounded mr-2" />
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
            </div>

            {/* Explanation */}
            <div className="text-left mt-4">
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-1" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-1" />
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>

        {/* Bias Instances Skeleton */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-4" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-4 p-4 border rounded-lg">
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-4 mx-auto" />
              <div className="h-48 w-48 bg-gray-200 animate-pulse rounded-full mx-auto" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-4 mx-auto" />
              <div className="h-48 w-full bg-gray-200 animate-pulse rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
