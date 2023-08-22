import clientPromise, {
  collectionName,
  dbName,
} from "../../../server/mongodb/mongodb";
import { ObjectId } from "mongodb";
import { STATUS_CODE } from "../../../server/constants/status_code";
import METHODS from "../../../server/constants/rest_methods";
import { saveReport } from "../../../server/services/saved_report_service";

//draft code, just to test the API

const ITEMS_PER_PAGE = 12;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(dbName);

  switch (req.method) {
    case METHODS.POST:
      const report = req.body;
      const { insertedId } = await saveReport(db, report);

      res.json({ insertedId });
      break;
    case METHODS.GET:
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

async function getReportsPage(req, db) {
  const page = req.query.page || 1;
  const person = req.query.person;
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const reportsCount = await db.collection(collectionName).countDocuments();
  const isPageInRange = skip < reportsCount;
  const isLastPage = isPageInRange && skip + ITEMS_PER_PAGE >= reportsCount;
  let reports = [];

  if (isPageInRange) {
    const queryConditions = {
      $or: [
        { isUserGenerated: { $exists: false } },
        { isUserGenerated: null },
        { isUserGenerated: false },
      ],
    };

    if (person) {
      const personKey = "sidesBalance." + person;
      queryConditions[personKey] = { $exists: true };
    }

    reports = await db
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
  }

  return { reports, isLastPage };
}

async function getReportById(id, db) {
  const report = await db
    .collection(collectionName)
    .findOne({ _id: new ObjectId(id) });

  return report;
}
