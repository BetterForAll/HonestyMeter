import { headers } from "next/headers";
import { BASE_URL, EMPTY_STRING } from "@/constants/constants";
import { getLastRating } from "@/app/api/rating/route";
import { convertUTCDateToUserTimeZone } from "@/utils/utils";
import HomePageClient from "./HomePageClient";
import type { Metadata } from "next";

const LOGO_URL = "https://honestymeter.com/favicon.png";
const OPEN_GRAPH_IMAGE_URL = "https://honestymeter.com/opengraph-logo.png";

export const metadata: Metadata = {
  title: "Honesty Meter",
  description: "Honesty Meter is a tool that helps you discover the truth behind the news.",
  openGraph: {
    type: "website",
    title: "Honesty Meter",
    description: "AI powered tool for bias detection",
    url: BASE_URL,
    images: [OPEN_GRAPH_IMAGE_URL],
  },
  twitter: {
    images: [OPEN_GRAPH_IMAGE_URL],
  },
  icons: {
    shortcut: LOGO_URL,
  },
};

async function getReports(searchParams: { [key: string]: string | string[] | undefined }) {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  
  const page = searchParams.page?.toString() || "1";
  const searchTerm = searchParams.searchTerm?.toString() || "";
  const country = searchParams.country?.toString() || "";
  const category = searchParams.category?.toString() || "";

  const categoryParam = category ? `&category=${category}` : EMPTY_STRING;
  const countryParam = country ? `&country=${country}` : EMPTY_STRING;
  const searchTermParam = searchTerm ? `&searchTerm=${searchTerm}` : EMPTY_STRING;
  
  const url = `http://${host}/api/saved_report?page=${page}${searchTermParam}${categoryParam}${countryParam}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // Cache for 60 seconds
    const { data } = await res.json();
    const { reports = [], isLastPage } = data || {};

    return {
      reports,
      page,
      isFirstPage: page === "1",
      isLastPage: isLastPage || false,
    };
  } catch (error) {
    console.error({ error });
    return {
      reports: [],
      page: "1",
      isFirstPage: true,
      isLastPage: true,
    };
  }
}

async function getRating() {
  try {
    const rating = await getLastRating();
    const { mostObjectiveSources, createdAt: createdAtDate } = rating || {};
    const createdAtISOString = createdAtDate?.toISOString() || new Date().toISOString();
    const createdAt = convertUTCDateToUserTimeZone(createdAtISOString)
      .split(",")[0]
      .trim();

    return {
      mostObjectiveSources,
      createdAt,
    };
  } catch (error) {
    console.error("Error fetching rating:", error);
    return null;
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const { reports, page, isFirstPage, isLastPage } = await getReports(params);
  const rating = await getRating();
  const date = new Date().toLocaleString();

  return (
    <HomePageClient
      reports={reports}
      page={page}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      date={date}
      rating={rating}
      searchParams={params}
    />
  );
}
