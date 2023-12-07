import dotenv from 'dotenv';

dotenv.config();

const TEMPERATURE = 0;
const TOP_P = 1;
const FREQUENCY_PENALTY = 0.0;
const PRESENCE_PENALTY = 0.0;
const MODEL = 'gpt-4';
// const MODEL = 'gpt-3.5-turbo-16k';


export const OPEN_AI_REQUEST = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: {
    model: MODEL,
    messages: [
      { role: 'system', content: '' },
      { role: 'user', content: '' }
    ],
    temperature: TEMPERATURE,
    top_p: TOP_P,
    frequency_penalty: FREQUENCY_PENALTY,
    presence_penalty: PRESENCE_PENALTY,
  },
}
