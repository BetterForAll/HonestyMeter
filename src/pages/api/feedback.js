import REST_METHODS from "../../../server/constants/rest_methods";
import clientPromise, {
    dbName,
} from "../../../server/mongodb/mongodb";
import { sanitizeStrings } from "../../../server/utils/utils";

const FEEDBACK_COLLECTION_NAME = "feedback";

export default async function handler(req, res) {
    if (req.method === REST_METHODS.POST) {
        const client = await clientPromise;
        const db = client.db(dbName);
        const collection = db.collection(FEEDBACK_COLLECTION_NAME);
        const feedback = req.body;
        const parsesdFeedback = JSON.parse(feedback);
        const sanitizedFeedback = sanitizeStrings(parsesdFeedback);
        const result = await collection.insertOne(sanitizedFeedback);
        const savedFeedbackId = result.insertedId;

        res.status(200).json({ status: 'SUCCESS', savedFeedbackId });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
