import { headers } from "next/headers";
import ReportWrapper from "@/components/Report/ReportWrapper";
import { API_URL } from "@/constants/constants";
import { getReportShareTitle, getSavedReportUrl } from "@/components/Report/reportUtils";
import { getBaseUrlFromUrlString } from "@/utils/utils";
import type { Metadata } from "next";

const OPEN_GRAPH_IMAGE_URL = "https://honestymeter.com/opengraph-logo.png";
const LOGO_URL = "https://honestymeter.com/favicon.ico";

async function getReport(reportId: string, host: string) {
  const url = `http://${host}/${API_URL.SAVED_REPORT}?id=${reportId}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const { data: reportJson } = await res.json();
    const report = reportJson?.reports || {};
    return report;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reportId: string }>;
}): Promise<Metadata> {
  const { reportId } = await params;
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const report = await getReport(reportId, host);

  if (!report) {
    return {
      title: "Report Not Found - HonestyMeter",
    };
  }

  const { explanation = "", articleTitle = "", articleLink = "", score } = report;
  const title = getReportShareTitle(articleTitle, score);
  const url = getSavedReportUrl(host, reportId);
  const source = getBaseUrlFromUrlString(articleLink);

  return {
    title: `'${articleTitle}' by ${source} - Bias Report by HonestyMeter - free AI powered bias detection framework`,
    description: explanation,
    openGraph: {
      title,
      description: explanation,
      url,
      images: [OPEN_GRAPH_IMAGE_URL],
      type: "article",
    },
    twitter: {
      images: [OPEN_GRAPH_IMAGE_URL],
    },
    icons: {
      shortcut: LOGO_URL,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function SavedReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const report = await getReport(reportId, host);

  if (!report) {
    return (
      <div className="w-full mx-auto p-4 text-center">
        <h1>Report not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4">
      <ReportWrapper report={report} shareLevel={0} />
    </div>
  );
}
