import { ObjectId } from "mongodb";
import clientPromise from "../../../server/mongodb/mongodb";
import { STATUS_CODE } from "../../../server/constants/status_code";
import METHODS from "../../../server/constants/rest_methods";

//draft code, just to test the API

const dbName = 'honesty_meter';
const collectionName = 'report';

export default async function handler(req, res) {
    const reportId = req.query.id;
    const client = await clientPromise;
    const db = client.db(dbName);

    switch (req.method) {
        case METHODS.GET:
            try {
                const report = await db.collection(collectionName).findOne({ _id: new ObjectId(reportId) });
                const reportJson = JSON.stringify(report);

                res.json({ status: STATUS_CODE.OK, data: reportJson });
            } catch (error) {
                console.log(error)
            }
            break;
    }
}