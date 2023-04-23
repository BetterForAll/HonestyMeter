import { getMessages } from './prompt_service.js'
import { ERROR_MESSAGE } from '../constants/error_message.js'
import { URL } from '../constants/url.js'
import { OPEN_AI_REQUEST } from '../settings/openai_request.js';

export async function getOpenAiResponse(text) {
  const options = createRequestOptions(text);

  try {
    const openaiResponse = await fetch(URL.OPEN_AI, options);
    const responseJson = await openaiResponse.json();
    const responseText = responseJson.choices?.[0]?.message.content;

    return responseText;
  } catch (err) {
    console.error(err);
    throw new Error(ERROR_MESSAGE.SOMETHING_WENT_WRONG);
  }
}

function createRequestOptions(text) {
  const messages = getMessages(text);
  const requestBody = { ...OPEN_AI_REQUEST.body, messages }
  const requestBodyJson = JSON.stringify(requestBody)

  return {
    ...OPEN_AI_REQUEST,
    body: requestBodyJson
  }
}