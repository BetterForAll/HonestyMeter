import { NextResponse } from "next/server";
import { getOpenAiResponse } from "../../../../server/services/openai_service";
import { rateLimiter } from "../../../../server/services/rate_limiter";
import { ERROR_MESSAGE } from "../../../../server/constants/error_message";
import { STATUS_CODE } from "../../../../server/constants/status_code";
import { checkIsUrl } from "@/utils/utils";
import { formatUrl } from "../../../../server/utils/utils";
import clientPromise, {
  collectionName,
  dbName,
} from "../../../../server/mongodb/mongodb";
import { saveReport } from "../../../../server/services/saved_report_service";

const EXTRACT_API_URL = `https://api.worldnewsapi.com/extract-news?&api-key=${process.env.WORLD_NEWS_API_KEY}&url=`;
const MODERATION_URL = "https://api.openai.com/v1/moderations";

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db(dbName);

  try {
    // Rate limiting would need to be adapted for App Router
    // For now, we'll skip the rate limiter check
    // const isRequestPassed = await rateLimiter(req, res);

    const body = await request.json();
    const { text, isForPublishing = false } = body;
    const isUrl = checkIsUrl(text);

    let textForAnalysis = text;
    let articleTitle = "";
    let articleDate = "";
    let articleLink = "";

    if (isUrl) {
      const formattedUrl = formatUrl(text);
      const existingReport = await db
        .collection(collectionName)
        .findOne({ articleLink: formattedUrl });

      if (existingReport?._id) {
        return NextResponse.json({ reportId: existingReport._id });
      }

      const extractResult = await getTextForAnalysisByUrl(text);
      if (extractResult) {
        textForAnalysis = extractResult.textForAnalysis;
        articleTitle = extractResult.articleTitle;
        articleDate = extractResult.articleDate;
        articleLink = extractResult.articleLink;
      }
    }

    const responseText = await getOpenAiResponse(textForAnalysis);

    const parsedReport = JSON.parse(responseText);
    parsedReport.articleTitle = articleTitle;
    parsedReport.articleDate = new Date(articleDate);
    parsedReport.articleLink = articleLink;
    parsedReport.isUserGenerated = true;
    parsedReport.isHiddenFromFeed = !isForPublishing;

    let isModerationFailed = false;

    if (isForPublishing) {
      isModerationFailed = await checkIsModerationFailed(textForAnalysis);
    }

    if (isModerationFailed) {
      parsedReport.isModerationFailed = true;
    }

    const { insertedId: reportId } =
      (await saveReport(db, collectionName, parsedReport)) || {};

    return NextResponse.json({ reportId, isModerationFailed });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: STATUS_CODE.SERVER_ERROR }
    );
  }
}

async function checkIsModerationFailed(textForAnalysis: string) {
  const moderationHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  const moderationBody = JSON.stringify({
    input: textForAnalysis,
  });

  const moderationResponse = await fetch(MODERATION_URL, {
    method: "POST",
    headers: moderationHeaders,
    body: moderationBody,
  });

  if (!moderationResponse.ok) {
    throw new Error(
      `Moderation API request failed with status ${moderationResponse.status}`
    );
  }

  const moderationData = await moderationResponse.json();
  const isModerationFailed = moderationData?.result?.[0]?.flagged ?? false;

  return isModerationFailed;
}

async function getTextForAnalysisByUrl(url: string) {
  const formattedUrl = formatUrl(url);
  const extractTextResponse = await fetch(`${EXTRACT_API_URL}${formattedUrl}`);
  const {
    title: articleTitle,
    text: articleText,
    url: articleLink,
    publish_date: articleDate,
  } = (await extractTextResponse.json()) || {};
  const textForAnalysis = `TITLE: ${articleTitle} TEXT: ${articleText}`;

  return { textForAnalysis, articleTitle, articleDate, articleLink };
}
