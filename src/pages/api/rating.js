import clientPromise, {
    dbName,
} from "../../../server/mongodb/mongodb";

const RATING_COLLECTION_NAME = "rating";

export async function getLastRating() {
    const client = await clientPromise;
    const db = client.db(dbName);
    const result = await db
        .collection(RATING_COLLECTION_NAME)
        .find({})
        .sort({ createdAt: -1 })
        .limit(1)
        .toArray();

    return result?.[0]
}