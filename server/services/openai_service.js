import { getMessages } from './prompt_service.js'
import { ERROR_MESSAGE } from '../constants/error_message.js'
import { URL } from '../constants/url.js'
import { OPEN_AI_REQUEST, MODEL } from '../settings/openai_request.js';

const GPT_4_TURBO_NODEL = 'gpt-4-1106-preview';
const isGpt4Turbo = MODEL === GPT_4_TURBO_NODEL;

function formatGpt4TurboOutput(output) {
  return output.split('```json\n')[1].split('```')[0]
}

export async function getOpenAiResponse(text) {
  const options = createRequestOptions(text);

  try {
    const openaiResponse = await fetch(URL.OPEN_AI, options);
    const responseJson = await openaiResponse.json();
    const responseText = responseJson.choices?.[0]?.message.content;
    const response = isGpt4Turbo ? formatGpt4TurboOutput(responseText) : responseText;

    return response
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