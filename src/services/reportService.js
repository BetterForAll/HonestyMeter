import { wait } from "@/utils/utils";
import mockReport from "../data/report";

const URL = "./api/report";
const OPTIONS_TEMPLATE = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: {text: ''},
};

export async function fetchReport(text) {
    const options = {
      ...OPTIONS_TEMPLATE,
      body: JSON.stringify({ text }),
    };
    const reportRes = await fetch(URL, options);
    const responseJson = await reportRes.json();
  
    return responseJson?.responseText;
  }

  export const mockFetchReport = async (delay = 1000) => { //for testing
    await wait(delay);
    
    return mockReport;
  };