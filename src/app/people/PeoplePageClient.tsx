"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import va from "@vercel/analytics";
import { EMPTY_STRING, EVENT } from "@/constants/constants";
import Search from "@/components/Layout/Search";
import Link from "next/link";
import { MethodologyPeopleRating } from "@/components/Methodology/Methodology";
import { RatingList } from "@/components/RatingList/Rating";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const SEARCH_FIELD_ID = "search-field-people";
const TEXTS = {
  title: "Popular People",
  subtitle: "Latest news analyzed by HonestyMeter",
  name: "Name",
  searchName: "Search Name",
  mostPraised: "Most Praised",
  mostCriticized: "Most Criticized",
};

interface PeoplePageClientProps {
  people: string[];
  rating: {
    mostPraisedPeople: string[];
    mostCriticizedPeople: string[];
    createdAt: string;
  };
}

export default function PeoplePageClient({ people: peopleFromDb, rating }: PeoplePageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const personFromQuery = searchParams.get("person") || "";
  const [peopleLocal, setPeopleLocal] = useState(peopleFromDb);
  const [searchValue, setSearchValue] = useState("");
  const isPeopleListEmpty = peopleLocal.length === 0;
  const mostCriticizedPeople = rating?.mostCriticizedPeople?.join(", ") || "";
  const mostPraisedPeople = rating?.mostPraisedPeople?.join(", ") || "";
  const { createdAt } = rating || "";
  const mostCritisizedRatingTitle = TEXTS.mostCriticized;
  const mostPraisedRatingTitle = TEXTS.mostPraised;
  const ratings = [
    {
      createdAt,
      items: mostCriticizedPeople,
      title: mostCritisizedRatingTitle,
      titleColor: "text-orange-600",
      Methodology: MethodologyPeopleRating,
    },
    {
      createdAt,
      items: mostPraisedPeople,
      title: mostPraisedRatingTitle,
      Methodology: MethodologyPeopleRating,
    },
  ];

  const handleLocalSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValueRes = e.target.value;
    setSearchValue(searchValueRes);

    const filteredPeople = peopleFromDb.filter((person) =>
      person.toLowerCase().includes(searchValueRes.toLowerCase().trim())
    );

    setPeopleLocal(filteredPeople);
  };

  const handleSearchClick = () => {
    va.track(EVENT.searchClickedPeoplePage, { searchValue });

    const trimmedSearchValue = searchValue.trim().toLowerCase().split(" ").join("-");
    if (!trimmedSearchValue) return;

    const url = `/people/${trimmedSearchValue}`;
    router.push(url);
  };

  const clearSearch = () => {
    setSearchValue(EMPTY_STRING);
    setPeopleLocal(peopleFromDb);
  };

  useEffect(() => {
    va.track(EVENT.peoplePageLoaded);
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-start items-center px-2 pb-4 flex-1">
      <h1 className="text-2xl my-4">{TEXTS.title}</h1>
      <RatingList ratings={ratings} />
      <Search
        value={searchValue}
        onChange={handleLocalSearch}
        onClick={handleSearchClick}
        label={TEXTS.name}
        inputLabel={TEXTS.searchName}
        id={SEARCH_FIELD_ID}
        variant="text"
        onClear={clearSearch}
        mobileWidth="auto"
      />
      {!isPeopleListEmpty && (
        <p className="text-sm text-gray-500 mx-4 mt-2 text-center">
          {TEXTS.subtitle}
        </p>
      )}
      <People people={peopleLocal} selectedPerson={personFromQuery} />
    </div>
  );
}

interface PeopleProps {
  people: string[];
  selectedPerson: string;
}

const People = ({ people, selectedPerson }: PeopleProps) => {
  const handleClick = (person: string) => () => {
    va.track(EVENT.personClicked, { person });
  };

  return (
    <div className="flex-1 mb-4 flex items-start">
      <ul className="flex flex-row flex-wrap p-2 sm:p-4 justify-center items-start list-none">
        {people.map((person) => {
          const isSelected = person === selectedPerson;
          const formattedPerson = person.split(" ").join("-").toLowerCase();

          return (
            <li key={person} className="w-fit p-1">
              <Link
                href={`/people/${formattedPerson}`}
                onClick={handleClick(person)}
                className="no-underline"
              >
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full cursor-pointer transition-colors",
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : "bg-sky-100 text-sky-700 hover:bg-sky-200"
                  )}
                >
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
