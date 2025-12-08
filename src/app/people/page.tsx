import { Suspense } from "react";
import { BASE_URL, EMPTY_STRING } from "@/constants/constants";
import { getPeople } from "@/app/api/people/route";
import { getLastRating } from "@/app/api/rating/route";
import { convertUTCDateToUserTimeZone } from "@/utils/utils";
import PeoplePageClient from "./PeoplePageClient";
import type { Metadata } from "next";

const OPEN_GRAPH_IMAGE_URL = "./opengraph-logo.png";
const TWITTER_IMAGE_URL = "./favicon.png";

export const metadata: Metadata = {
  title: "Honesty Meter - Popular People news integrity feed",
  description:
    "Latest news about popular people analyzed by HonestyMeter - AI powered tool for bias detection",
  openGraph: {
    type: "website",
    title: "Honesty Meter - Popular People news integrity feed",
    description: "AI powered tool for bias detection",
    url: BASE_URL,
    images: [OPEN_GRAPH_IMAGE_URL],
  },
  twitter: {
    images: [TWITTER_IMAGE_URL],
  },
  alternates: {
    canonical: BASE_URL + "/people",
  },
};

async function getPeopleData() {
  try {
    const ENTRIES_TO_SHOW = 3;
    const people = await getPeople();
    
    // Check if people is array before mapping (handle potential API/DB failure)
    const peopleNames = Array.isArray(people) 
      ? people.map((person: { name: string }) => person.name)
      : [];
      
    const rating = await getLastRating();
    const { mostPraised, mostCriticized } = rating || {};
    const mostPraisedPeople =
      mostPraised?.people?.slice(0, ENTRIES_TO_SHOW) || [];
    const mostCriticizedPeople =
      mostCriticized?.people?.slice(0, ENTRIES_TO_SHOW) || [];
    const createdAtDate = rating?.createdAt;
    const createdAtISOString = createdAtDate?.toISOString() || new Date().toISOString();
    const createdAt = convertUTCDateToUserTimeZone(createdAtISOString)
      .split(",")[0]
      .trim();

    return {
      people: peopleNames,
      rating: { mostPraisedPeople, mostCriticizedPeople, createdAt },
    };
  } catch (error) {
    console.error("Error fetching people data:", error);
    // Return empty data structure on error (prevents build failure)
    return {
      people: [],
      rating: { mostPraisedPeople: [], mostCriticizedPeople: [], createdAt: "" },
    };
  }
}

// Revalidate every 4 hours (ISR)
export const revalidate = 14400;

export default async function PeoplePage() {
  const { people, rating } = await getPeopleData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PeoplePageClient people={people} rating={rating} />
    </Suspense>
  );
}
