import { wait } from "@/utils/utils";
import mockReport from "../data/report";

export async function fetchReport(text) {
    const url = "./api/report";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ text }),
    };
    const reportRes = await fetch(url, options);
    const responseJson = await reportRes.json();
  
    return responseJson?.responseText;
  }

  export const mockFetchReport = async (delay = 1000) => { //for testing
    await wait(delay);
    return mockReport;
  };