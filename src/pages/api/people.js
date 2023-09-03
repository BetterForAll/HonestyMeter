import clientPromise, {
    dbName,
} from "../../../server/mongodb/mongodb";

const PEOPLE_COLLECTION_NAME = "people";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(dbName);

    try {
        if (req.method === 'GET') {
            const reportedPeople = await db
                .collection(PEOPLE_COLLECTION_NAME)
                .find(
                    { reportCount: { $gt: 0 } },
                    { projection: { name: 1, _id: 0 } }
                )
                .sort({ reportCount: -1 })
                .toArray();

            res.status(200).json(reportedPeople);
        } else {
            res.status(405).end();
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to connect to database" });
    }
}