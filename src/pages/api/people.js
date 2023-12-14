import REST_METHODS from "../../../server/constants/rest_methods";
import clientPromise, {
    dbName,
} from "../../../server/mongodb/mongodb";

const PEOPLE_COLLECTION_NAME = "people";

export async function getPeople() {
    const client = await clientPromise;
    const db = client.db(dbName);

    return db
        .collection(PEOPLE_COLLECTION_NAME)
        .find(
            { reportCount: { $gt: 0 } },
            { projection: { name: 1, _id: 0 } }
        )
        .sort({ reportCount: -1 })
        .toArray();

}

export default async function handler(req, res) {
    try {
        if (req.method === REST_METHODS.GET) {
            const reportedPeople = await getPeople();
            res.status(200).json(reportedPeople);
        } else {
            res.status(405).end();
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to connect to database" });
    }
}