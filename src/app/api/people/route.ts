import { NextResponse } from "next/server";
import clientPromise, { dbName } from "../../../../server/mongodb/mongodb";

const PEOPLE_COLLECTION_NAME = "people";

export async function getPeople() {
  try {
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
  } catch (error) {
    console.error("Database connection error in getPeople:", error);
    return [];
  }
}

export async function GET() {
  try {
    const reportedPeople = await getPeople();
    return NextResponse.json(reportedPeople);
  } catch (error) {
    console.error("Error fetching people:", error);
    return NextResponse.json(
      { error: "Unable to connect to database" },
      { status: 500 }
    );
  }
}
