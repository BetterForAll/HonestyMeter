import { getOpenAiResponse } from '../../../server/services/openai_service';
import { rateLimiter } from '../../../server/services/rate_limiter';
import dotenv from 'dotenv';
import { ERROR_MESSAGE } from '../../../server/constants/error_message';
import { STATUS_CODE } from '../../../server/constants/status_code';

dotenv.config();

export default async function handler(req, res) {
  try {
    const isRequestPassed = await rateLimiter(req, res);

    if (!isRequestPassed) {
      return res.status(STATUS_CODE.TOO_MANY_REQUESTS)
      .json({ error: ERROR_MESSAGE.TOO_MANY_REQUESTS });
    }

    const { text } = req.body;
    const responseText = await getOpenAiResponse(
      text,
      process.env.OPENAI_API_KEY
    );

    res.status(STATUS_CODE.OK).json({ responseText });
  } catch (error) {
    console.log(error);

    res.status(STATUS_CODE.SERVER_ERROR).json({ error: error.message });
  }
}
