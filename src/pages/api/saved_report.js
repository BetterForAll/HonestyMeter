import clientPromise, {
  collectionName,
  dbName,
} from "../../../server/mongodb/mongodb";
import { ObjectId } from "mongodb";
import { STATUS_CODE } from "../../../server/constants/status_code";
import REST_METHODS from "../../../server/constants/rest_methods";
import { saveReport } from "../../../server/services/saved_report_service";
import { EMPTY_STRING } from "@/constants/constants";

//draft code, just to test the API

const ITEMS_PER_PAGE = 12;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(dbName);

  switch (req.method) {
    // case REST_METHODS.POST:
    //   const report = { ...req.body, isNew: true };
    //   const { insertedId } = await saveReport(db, collectionName, report);

    //   res.json({ insertedId });
    //   break;
    case REST_METHODS.GET:
      const { reports, isLastPage } = (await getReports(req, db)) || {};

      res.json({ status: STATUS_CODE.OK, data: { reports, isLastPage } });
      break;
  }
}

async function getReports(req, db) {
  const { id } = req.query;
  if (id) {
    const report = await getReportById(id, db);

    return { reports: report };
  }

  return getReportsPage(req, db);
}


function sanitizeStrings(inputs = {}) {
  return Object.keys(inputs).reduce((acc, key) => {
    const input = inputs[key]
    if (typeof input !== 'string') {
      acc[key] = EMPTY_STRING;
    }
    acc[key] = input.replace(/\$/g, '').trim();

    return acc;
  }, {});
}

function sanitizePageNumber(input) {
  const pageNumber = parseInt(input, 10);
  return isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
}

async function getReportsPage(req, db) {
  const page = sanitizePageNumber(req.query.page || 1);
  const inputs = sanitizeStrings(req.query);

  const skip = (page - 1) * ITEMS_PER_PAGE;
  const queryConditions = getQueryConditions(inputs);

  console.log({ queryConditions, inputs, page, skip })

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

  const reportsCount = await db.collection(collectionName).countDocuments(queryConditions);
  const isLastPage = skip + ITEMS_PER_PAGE >= reportsCount;

  console.log('REPORTS getReportsPage: ', reports)

  return { reports, isLastPage };
}


//TODO: remove this code after testing
// async function getReportsPage(req, db) {
//   const page = req.query.page || 1;
//   const { searchTerm = EMPTY_STRING, category = EMPTY_STRING, country = EMPTY_STRING } = req.query || {};
//   const skip = (page - 1) * ITEMS_PER_PAGE;
//   const queryConditions = getQueryConditions({ category, country, searchTerm });

//   const reports =
//     (await db
//       .collection(collectionName)
//       .find(queryConditions, {
//         projection: {
//           articleTitle: 1,
//           articleDate: 1,
//           articleLink: 1,
//           score: 1,
//         },
//       })
//       .sort({ articleDate: -1 })
//       .skip(skip)
//       .limit(ITEMS_PER_PAGE)
//       .toArray()) || [];
//   const reportsCount = await db.collection(collectionName).countDocuments(queryConditions);
//   const isLastPage = skip + ITEMS_PER_PAGE >= reportsCount;

//   return { reports, isLastPage };
// }

function getQueryConditions({
  category = EMPTY_STRING,
  country = EMPTY_STRING,
  searchTerm = EMPTY_STRING
} = {}) {

  const alwaysTrueConditions = {
    $or: [
      { isUserGenerated: { $exists: false } },
      { isUserGenerated: null },
      { isUserGenerated: false },
    ],
  };
  const queryConditions = { $and: [alwaysTrueConditions] };
  const filterConditions = { $and: [] };
  const searchConditions = { $or: [] };

  if (category?.length) {
    const categoryQuery = {
      $or: [
        { category: { $regex: new RegExp(category, "i") } },
        { "sidesScore.sideName": { $regex: new RegExp(category, "i") } },
        { "articleTitle": { $regex: new RegExp(category, "i") } },
      ]
    };
    filterConditions.$and.push(categoryQuery);
  }

  if (country?.length) {
    const countryQuery = {
      $or: [
        { country: { $regex: new RegExp(country, "i") } },
        { "sidesScore.sideName": { $regex: new RegExp(country, "i") } },
        { "articleTitle": { $regex: new RegExp(country, "i") } },
      ]
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
      { "articleTitle": { $regex: new RegExp(searchTerm, "i") } },
    ];
    queryConditions.$and.push(searchConditions);
  };

  return queryConditions;
}

async function getReportById(id, db) {
  const report = await db
    .collection(collectionName)
    .findOne({ _id: new ObjectId(id) });

  return report;
}
