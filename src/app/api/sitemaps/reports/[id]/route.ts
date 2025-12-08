import { NextResponse } from "next/server";
import clientPromise, { dbName } from "../../../../../../server/mongodb/mongodb";
import { ObjectId } from "mongodb";

const SITEMAP = "sitemap";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportSitemapId } = await params;
    const client = await clientPromise;
    const db = client.db(dbName);
    const sitemap = await db
      .collection(SITEMAP)
      .findOne({ _id: new ObjectId(reportSitemapId) });

    return new NextResponse(sitemap?.content || "", {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error serving the sitemap:", error);
    return new NextResponse("Error fetching sitemap", { status: 500 });
  }
}
