import { headers } from "next/headers";
import { API_URL, BASE_URL } from "@/constants/constants";
import { capitalizeFirstLetterOfEachWord } from "@/utils/utils";
import PersonPageClient from "./PersonPageClient";
import type { Metadata } from "next";

const OPEN_GRAPH_IMAGE_URL = "./opengraph-logo.png";
const TWITTER_IMAGE_URL = "./favicon.png";

async function getPersonReports(name: string, page: string, host: string) {
  const formattedName = name.replace(/-/g, " ");
  const url = `http://${host}/${API_URL.SAVED_REPORT}?page=${page}&searchTerm=${formattedName}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const { data } = await res.json();
    const { reports, isLastPage } = data;

    return {
      reports: reports || [],
      isLastPage: isLastPage || false,
    };
  } catch (error) {
    console.error({ error });
    return {
      reports: [],
      isLastPage: true,
    };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const formattedName = name.replace(/-/g, " ");
  const nameCapitalized = capitalizeFirstLetterOfEachWord(formattedName);
  const canonicalUrl = `${BASE_URL}/people/${name}`;

  return {
    title: `${nameCapitalized} - Honesty Meter`,
    description: `Latest news about ${nameCapitalized} analysed for bias and objectivity by Honesty Meter - free AI power framework for bias detection.`,
    openGraph: {
      type: "website",
      title: nameCapitalized,
      description: `News Integrity Feed for ${nameCapitalized}`,
      url: BASE_URL,
      images: [OPEN_GRAPH_IMAGE_URL],
    },
    twitter: {
      images: [TWITTER_IMAGE_URL],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PersonPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { name } = await params;
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page || "1";
  const isFirstPage = page === "1";
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";

  const { reports, isLastPage } = await getPersonReports(name, page, host);

  const formattedName = name.replace(/-/g, " ");
  const nameCapitalized = capitalizeFirstLetterOfEachWord(formattedName);

  return (
    <PersonPageClient
      reports={reports}
      page={page}
      name={formattedName}
      nameUrl={name}
      nameCapitalized={nameCapitalized}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  );
}
