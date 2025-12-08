import { NextResponse } from "next/server";
import clientPromise, { dbName } from "../../../../server/mongodb/mongodb";
import { sanitizeStrings } from "../../../../server/utils/utils";

const FEEDBACK_COLLECTION_NAME = "feedback";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(FEEDBACK_COLLECTION_NAME);
    const feedbackText = await request.text();
    const parsedFeedback = JSON.parse(feedbackText);
    const sanitizedFeedback = sanitizeStrings(parsedFeedback);
    const result = await collection.insertOne(sanitizedFeedback);
    const savedFeedbackId = result.insertedId;

    return NextResponse.json({ status: "SUCCESS", savedFeedbackId });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}
