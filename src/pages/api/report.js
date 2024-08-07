import { getOpenAiResponse } from "../../../server/services/openai_service";
import { rateLimiter } from "../../../server/services/rate_limiter";
import dotenv from "dotenv";
import { ERROR_MESSAGE } from "../../../server/constants/error_message";
import { STATUS_CODE } from "../../../server/constants/status_code";
import { checkIsUrl } from "@/utils/utils";
import { formatUrl } from "../../../server/utils/utils";
import clientPromise, {
  collectionName,
  dbName,
} from "../../../server/mongodb/mongodb";
import { saveReport } from "../../../server/services/saved_report_service";

dotenv.config();

const EXTRACT_API_URL = `https://api.worldnewsapi.com/extract-news?&api-key=${process.env.WORLD_NEWS_API_KEY}&url=`;
const MODERATION_URL = "https://api.openai.com/v1/moderations";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(dbName);

  try {
    const isRequestPassed = await rateLimiter(req, res);

    if (!isRequestPassed) {
      return res
        .status(STATUS_CODE.TOO_MANY_REQUESTS)
        .json({ error: ERROR_MESSAGE.TOO_MANY_REQUESTS });
    }

    const { text, isForPublishing = false } = req.body;
    const isUrl = checkIsUrl(text);

    let {
      textForAnalysis = text,
      articleTitle = "",
      articleDate = "",
      articleLink = "",
    } = {};

    if (isUrl) {
      const formattedUrl = formatUrl(text);
      const existingReport = await db
        .collection(collectionName)
        .findOne({ articleLink: formattedUrl });

      if (existingReport?._id) {
        return res
          .status(STATUS_CODE.OK)
          .json({ reportId: existingReport._id });
      }

      ({
        textForAnalysis,
        articleTitle = "",
        articleDate = "",
        articleLink = "",
      } = (await getTextForAnalysisByUrl(text)) || {});
    }

    const responseText = await getOpenAiResponse(
      textForAnalysis,
      process.env.OPENAI_API_KEY
    );

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

    // parsedReport.isNew = true;
    const { insertedId: reportId } =
      (await saveReport(db, collectionName, parsedReport)) || {};

    res.status(STATUS_CODE.OK).json({ reportId, isModerationFailed });
  } catch (error) {
    console.log(error);

    res.status(STATUS_CODE.SERVER_ERROR).json({ error: error.message });
  }
}

async function checkIsModerationFailed(textForAnalysis) {
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

async function getTextForAnalysisByUrl(url) {
  const formattedUrl = formatUrl(url);
  const extractTextReponse = await fetch(`${EXTRACT_API_URL}${formattedUrl}`);
  const {
    title: articleTitle,
    text: articleText,
    url: articleLink,
    publish_date: articleDate,
  } = (await extractTextReponse.json()) || {};
  const textForAnalysis = `TITLE: ${articleTitle} TEXT: ${articleText}`;

  return { textForAnalysis, articleTitle, articleDate, articleLink };
}
