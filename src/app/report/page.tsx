"use client";

import React from "react";
import ReportLoading from "@/components/Report/ReportLoading";
import ReportWrapper from "@/components/Report/ReportWrapper";
import { useHomePageContext } from "../providers";

export default function ReportPage() {
  const { report, shareLevel, closeReport } = useHomePageContext();

  return (
    <div className="w-full mx-auto p-4">
      {report ? (
        <ReportWrapper
          report={report}
          shareLevel={shareLevel}
        />
      ) : (
        <ReportLoading />
      )}
    </div>
  );
}
