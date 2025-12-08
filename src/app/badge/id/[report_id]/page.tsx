import React from "react";

// TODO: implement - this is a placeholder page

const Fair = () => <h1>Fair</h1>;
const Medium = () => <h1>Medium</h1>;
const High = () => <h1>High</h1>;

const BADGE_TYPES: { [key: number]: React.FC } = {
  0: Fair,
  1: Medium,
  2: High,
};

export default async function BadgeReportIdPage({
  params,
}: {
  params: Promise<{ report_id: string }>;
}) {
  const { report_id: reportId } = await params;
  // TODO: fetch report by id and detect bias level based on score
  const biasLevel = 0;
  const Badge = BADGE_TYPES[biasLevel];

  return (
    <>
      <h1>Report Id: {reportId}</h1>
      <Badge />
    </>
  );
}
