export async function saveReport(db, collectionName, report) {
    return await db.collection(collectionName).insertOne(report);
}