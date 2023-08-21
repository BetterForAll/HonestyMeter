import { getOpenAiResponse } from '../../../server/services/openai_service';
import { rateLimiter } from '../../../server/services/rate_limiter';
import dotenv from 'dotenv';
import { ERROR_MESSAGE } from '../../../server/constants/error_message';
import { STATUS_CODE } from '../../../server/constants/status_code';
import { checkIsUrl } from '@/utils/utils';
import { formatUrl } from '../../../server/utils/utils';

dotenv.config();

const EXTRACT_API_URL = `https://api.worldnewsapi.com/extract-news?&api-key=${process.env.WORLD_NEWS_API_KEY}&url=`

export default async function handler(req, res) {
  try {
    const isRequestPassed = await rateLimiter(req, res);

    if (!isRequestPassed) {
      return res.status(STATUS_CODE.TOO_MANY_REQUESTS)
        .json({ error: ERROR_MESSAGE.TOO_MANY_REQUESTS });
    }

    const { text } = req.body;
    const { textForAnalysis, articleTitle = '', articleDate = '', articleLink = '' } = await getTextForAnalysis(text) || {};

    const responseText = await getOpenAiResponse(
      textForAnalysis,
      process.env.OPENAI_API_KEY
    );

    const parsedReport = JSON.parse(responseText);
    parsedReport.articleTitle = articleTitle;
    parsedReport.articleDate = articleDate;
    parsedReport.articleLink = articleLink;
    const updatedReportJson = JSON.stringify(parsedReport);

    res.status(STATUS_CODE.OK).json({ responseText: updatedReportJson });
  } catch (error) {
    console.log(error);

    res.status(STATUS_CODE.SERVER_ERROR).json({ error: error.message });
  }
}

async function getTextForAnalysis(text) {
  const isUrl = checkIsUrl(text);

  if (!isUrl) return ({ textForAnalysis: text });

  const formattedUrl = formatUrl(text);
  const extractTextReponse = await fetch(`${EXTRACT_API_URL}${formattedUrl}`);
  const { title: articleTitle, text: articleText, url: articleLink, publish_date: articleDate } = await extractTextReponse.json() || {};
  const textForAnalysis = `TITLE: ${articleTitle} TEXT: ${articleText}`;

  return { textForAnalysis, articleTitle, articleDate, articleLink };
}



