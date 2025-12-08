import React from "react";
import { MethodologyPeopleRating } from "@/components/Methodology/Methodology";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description: "Methodology",
};

export default function RatingPage() {
  return <MethodologyPeopleRating />;
}
