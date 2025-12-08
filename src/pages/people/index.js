/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import va from '@vercel/analytics';
import { EMPTY_FUNCTION, convertUTCDateToUserTimeZone } from '../../utils/utils';
import { API_URL, BASE_URL, EMPTY_STRING, EVENT } from '@/constants/constants';
import Search from '@/components/Layout/Search';
import Link from 'next/link';
import { getPeople } from '../api/people';
import { getLastRating } from '../api/rating';
import { MethodologyPeopleRating } from '@/components/Methodology/Methodology';
import { RatingList } from '@/components/RatingList/Rating';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const LOGO_URL = './favicon.png';
const OPEN_GRAPH_IMAGE_URL = './opengraph-logo.png';
const TWITTER_IMAGE_URL = './favicon.png';
const SEARCH_FIELD_ID = 'search-field-people';
const TEXTS = {
  title: 'Popular People',
  subtitle: 'Latest news analyzed by HonestyMeter',
  poweredBy: 'news api powered by newsdata.io',
  newReport: 'Create new bias report',
  cancelNewReport: 'Cancel new report',
  articleTitle: 'Article Title',
  source: 'Source',
  objectivityScore: 'Objectivity Score',
  viewReport: 'View Bias Report',
  imageAlt: 'Random illustration image',
  honestyMeter: 'Honesty Meter - Popular People news integrity feed',
  error: 'Something went wrong. Please try again later.',
  desciptiion:
    'Latest news about popular people analyzed by HonestyMeter - AI powered tool for bias detection',
  ogDescription: 'AI powered tool for bias detection',
  shareTitle:
    'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
  shareDescription:
    'HonestyMeter - Check media content for objectivity and bias.',
  shareHashTags: ['HonestyMeter', 'MediaBias', 'FakeNews'],
  noReportsYet: 'No reports yet',
  objectivityLevel: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  },
  articleTextExtracted: 'text extraction by url powered by',
  worldNewsApi: 'world news api',
  people: 'People',
  noMatchesFound: 'No matches found',
  name: 'Name',
  searchName: 'Search Name',
  clickForMethodology: 'Click for methodology details',
  mostPraised: 'Most Praised',
  mostCriticized: 'Most Criticized',
};

export default function PeoplePage({ people: peopleFromDb, rating }) {
  const router = useRouter();
  const pageFromQuery = parseInt(router.query.page) || 1;
  const personFromQuery = router.query.person || '';
  const [peopleLocal, setPeopleLocal] = useState(peopleFromDb);
  const [searchValue, setSearchValue] = useState('');
  const isPeopleListEmpty = peopleLocal.length === 0;
  const mostCriticizedPeople = rating?.mostCriticizedPeople?.join(', ') || '';
  const mostPraisedPeople = rating?.mostPraisedPeople?.join(', ') || '';
  const { createdAt } = rating || ''
  const mostCritisizedRatingTitle = TEXTS.mostCriticized
  const mostPraisedRatingTitle = TEXTS.mostPraised
  const ratings = [
    { createdAt, items: mostCriticizedPeople, title: mostCritisizedRatingTitle, titleColor: 'text-orange-600', Methodology: MethodologyPeopleRating },
    { createdAt, items: mostPraisedPeople, title: mostPraisedRatingTitle, Methodology: MethodologyPeopleRating },
  ]

  const handleLocalSearch = (e) => {
    const searchValueRes = e.target.value;
    setSearchValue(searchValueRes);

    const filteredPeople = peopleFromDb.filter((person) =>
      person.toLowerCase().includes(searchValueRes.toLowerCase().trim())
    );

    setPeopleLocal(filteredPeople);
  };

  const handleSearchClick = () => {
    va.track(EVENT.searchClickedPeoplePage, { searchValue });

    const trimmedSearchValue = searchValue.trim().toLowerCase().split(' ').join('-');
    if (!trimmedSearchValue) return;

    const url = `/people/${trimmedSearchValue}`;

    router.push(url);
  }

  const clearSearch = () => {
    setSearchValue(EMPTY_STRING);
    setPeopleLocal(peopleFromDb);
  }


  useEffect(() => {
    va.track(EVENT.peoplePageLoaded);
  }, [pageFromQuery]);

  return (
    <>
      {HtmlHead}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-start items-center px-2 pb-4 flex-1">
        <h1 className="text-2xl my-4">
          {TEXTS.title}
        </h1>
        <RatingList ratings={ratings} />
        <Search
          value={searchValue}
          onChange={handleLocalSearch}
          onClick={handleSearchClick}
          label={TEXTS.name}
          inputLabel={TEXTS.searchName}
          id={SEARCH_FIELD_ID}
          variant='text'
          onClear={clearSearch}
          mobileWidth='auto'
        />
        {
          !isPeopleListEmpty &&
          <p className="text-sm text-gray-500 mx-4 mt-2 text-center">
            {TEXTS.subtitle}
          </p>
        }
        <People
          people={peopleLocal}
          selectedPerson={personFromQuery}
        />
      </div>
    </>
  );
}

const People = ({ people, selectedPerson }) => {
  const handleClick = (person) => () => {
    va.track(EVENT.personClicked, { person });
  };

  return (
    <div className="flex-1 mb-4 flex items-start">
      <ul className="flex flex-row flex-wrap p-2 sm:p-4 justify-center items-start list-none">
        {people.map((person) => {
          const isSelected = person === selectedPerson;
          const formattedPerson = person.split(' ').join('-').toLowerCase();

          return (
            <li key={person} className="w-fit p-1">
              <Link href={`/people/${formattedPerson}`} onClick={handleClick(person)} className="no-underline">
                <span className={cn(
                  "inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full cursor-pointer transition-colors",
                  isSelected 
                    ? "bg-indigo-600 text-white" 
                    : "bg-sky-100 text-sky-700 hover:bg-sky-200"
                )}>
                  {person}
                  {isSelected && <X className="w-3 h-3" />}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const HtmlHead = (
  <Head>
    <title>{TEXTS.honestyMeter}</title>
    <meta name='description' content={TEXTS.desciptiion} />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta property='og:type' content='website' />
    <meta property='og:title' content={TEXTS.honestyMeter} />
    <meta property='og:description' content={TEXTS.ogDescription} />
    <meta property='og:url' content={BASE_URL} />
    <meta property='og:image' content={OPEN_GRAPH_IMAGE_URL} />
    <meta property='twitter:image' content={TWITTER_IMAGE_URL} />
    <link rel='shortcut icon' href={LOGO_URL} />
    <link rel='canonical' href={BASE_URL + '/people'} />
  </Head>
);

export async function getStaticProps() {
  const ENTRIES_TO_SHOW = 3;
  const people = await getPeople();
  const peopleNames = people.map((person) => person.name);
  const rating = await getLastRating();
  const { mostPraised, mostCriticized } = rating || {};
  const mostPraisedPeople = mostPraised?.people?.slice(0, ENTRIES_TO_SHOW) || [];
  const mostCriticizedPeople = mostCriticized?.people?.slice(0, ENTRIES_TO_SHOW) || [];
  const createdAtDate = rating?.createdAt;
  const createdAtISOString = createdAtDate.toISOString();
  const createdAt = convertUTCDateToUserTimeZone(createdAtISOString).split(',')[0].trim();

  return {
    props: { people: peopleNames, rating: { mostPraisedPeople, mostCriticizedPeople, createdAt } },
    revalidate: 4 * 60 * 60
  };
}
