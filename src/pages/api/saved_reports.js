import clientPromise from "../../../server/mongodb/mongodb";
import { STATUS_CODE } from "../../../server/constants/status_code";
import METHODS from "../../../server/constants/rest_methods";

//draft code, just to test the API

const dbName = 'honesty_meter';
const collectionName = 'report';

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
            const allReports = await db.collection(collectionName).find({}).toArray();
            res.json({ status: STATUS_CODE.OK, data: allReports });
            break;
    }
}