import { PROMPT } from "../prompt_data/prompt.js";

export function getMessages(article) {

    return [
        { role: "system", content: PROMPT },
        { role: "user", content: `ARTICLE ${article}` },
    ];
}