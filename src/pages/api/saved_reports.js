import clientPromise from "../../../server/mongodb/mongodb";
import { STATUS_CODE } from "../../../server/constants/status_code";
import METHODS from "../../../server/constants/rest_methods";

//draft code, just to test the API

const dbName = 'honesty_meter';
const collectionName = 'report';
const ITEMS_PER_PAGE = 12;

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(dbName);

    switch (req.method) {
        case METHODS.POST:
            let report = req.body;
            let { insertedId } = await db.collection(collectionName).insertOne(report);

            res.json({ insertedId });
            break;
        case METHODS.GET:
            const page = req.query.page || 1;
            const skip = (page - 1) * ITEMS_PER_PAGE;
            const reportsCount = await db.collection(collectionName).countDocuments();
            const isPageInRange = skip < reportsCount;
            const isLastPage = isPageInRange && skip + ITEMS_PER_PAGE >= reportsCount;
            let allReports = [];

            if (isPageInRange) {
                allReports = await db.collection(collectionName)
                    .find({})
                    .sort({ articleDate: -1 })
                    .skip(skip)
                    .limit(ITEMS_PER_PAGE).toArray();
            }

            res.json({ status: STATUS_CODE.OK, data: { allReports, isLastPage } });
            break;
    }
}