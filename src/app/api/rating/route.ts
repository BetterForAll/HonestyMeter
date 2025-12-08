import { NextResponse } from "next/server";
import clientPromise, { dbName } from "../../../../server/mongodb/mongodb";

const RATING_COLLECTION_NAME = "rating";

export async function getLastRating() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const result = await db
      .collection(RATING_COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    return result?.[0];
  } catch (error) {
    console.error("Database connection error in getLastRating:", error);
    return null;
  }
}

export async function GET() {
  try {
    const rating = await getLastRating();
    return NextResponse.json(rating);
  } catch (error) {
    console.error("Error fetching rating:", error);
    return NextResponse.json(
      { error: "Unable to fetch rating" },
      { status: 500 }
    );
  }
}
