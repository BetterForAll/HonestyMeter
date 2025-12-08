import { NextRequest, NextResponse } from "next/server";
import clientPromise, {
  collectionName,
  dbName,
} from "../../../../server/mongodb/mongodb";
import { ObjectId } from "mongodb";
import { STATUS_CODE } from "../../../../server/constants/status_code";
import { EMPTY_STRING } from "@/constants/constants";
import { sanitizeStrings } from "../../../../server/utils/utils";

const ITEMS_PER_PAGE = 12;

export async function GET(request: NextRequest) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get("id");

  if (id) {
    const report = await getReportById(id, db);
    return NextResponse.json({
      status: STATUS_CODE.OK,
      data: { reports: report },
    });
  }

  const { reports, isLastPage } = await getReportsPage(searchParams, db);
  return NextResponse.json({
    status: STATUS_CODE.OK,
    data: { reports, isLastPage },
  });
}

function sanitizePageNumber(input: string | null): number {
  const pageNumber = parseInt(input || "1", 10);
  return isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
}

async function getReportsPage(searchParams: URLSearchParams, db: any) {
  const page = sanitizePageNumber(searchParams.get("page"));
  const inputs = sanitizeStrings({
    category: searchParams.get("category") || "",
    country: searchParams.get("country") || "",
    searchTerm: searchParams.get("searchTerm") || "",
  });

  const skip = (page - 1) * ITEMS_PER_PAGE;
  const queryConditions = getQueryConditions(inputs);

  const reports = await db
    .collection(collectionName)
    .find(queryConditions, {
      projection: {
        articleTitle: 1,
        articleDate: 1,
        articleLink: 1,
        score: 1,
      },
    })
    .sort({ articleDate: -1 })
    .skip(skip)
    .limit(ITEMS_PER_PAGE)
    .toArray();

  const reportsCount = await db
    .collection(collectionName)
    .countDocuments(queryConditions);
  const isLastPage = skip + ITEMS_PER_PAGE >= reportsCount;

  return { reports, isLastPage };
}

function getQueryConditions({
  category = EMPTY_STRING,
  country = EMPTY_STRING,
  searchTerm = EMPTY_STRING,
}: {
  category?: string;
  country?: string;
  searchTerm?: string;
} = {}) {
  const alwaysTrueConditions = {
    $or: [
      { isModerationFailed: { $exists: false } },
      { isModerationFailed: null },
      { isModerationFailed: false },
    ],
    $and: [{ articleLink: { $exists: true } }, { articleLink: { $ne: "" } }],
  };

  const hiddenFromFeedCondition = {
    $or: [
      { isHiddenFromFeed: { $exists: false } },
      { isHiddenFromFeed: null },
      { isHiddenFromFeed: false },
    ],
  };

  const queryConditions: any = { $and: [alwaysTrueConditions, hiddenFromFeedCondition] };
  const filterConditions: any = { $and: [] };
  const searchConditions: any = { $or: [] };

  if (category?.length) {
    const categoryQuery = {
      $or: [
        { category: { $regex: new RegExp(category, "i") } },
        { "sidesScore.sideName": { $regex: new RegExp(category, "i") } },
        { articleTitle: { $regex: new RegExp(category, "i") } },
      ],
    };
    filterConditions.$and.push(categoryQuery);
  }

  if (country?.length) {
    const countryQuery = {
      $or: [
        { country: { $regex: new RegExp(country, "i") } },
        { "sidesScore.sideName": { $regex: new RegExp(country, "i") } },
        { articleTitle: { $regex: new RegExp(country, "i") } },
      ],
    };
    filterConditions.$and.push(countryQuery);
  }

  if (filterConditions.$and.length > 0) {
    queryConditions.$and.push(filterConditions);
  }

  if (searchTerm?.length && searchTerm.length < 100) {
    searchConditions.$or = [
      ...searchConditions.$or,
      { "sidesScore.sideName": { $regex: new RegExp(searchTerm, "i") } },
      { articleTitle: { $regex: new RegExp(searchTerm, "i") } },
    ];
    queryConditions.$and.push(searchConditions);
  }

  return queryConditions;
}

async function getReportById(id: string, db: any) {
  const report = await db
    .collection(collectionName)
    .findOne({ _id: new ObjectId(id) });

  return report;
}
