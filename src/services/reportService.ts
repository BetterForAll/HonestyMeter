import { wait } from "@/utils/utils";
import mockReport from "../data/report";
import { Report } from "@/types/report";

const GENERATE_REPORT_API_URL = "./api/report";
const OPTIONS_TEMPLATE = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: { text: "" },
};

export async function fetchReport(text: string, isForPublishing: boolean = false): Promise<string> {
  const options = {
    ...OPTIONS_TEMPLATE,
    body: JSON.stringify({ text, isForPublishing }),
  };
  const reportRes = await fetch(GENERATE_REPORT_API_URL, options);
  const { reportId } = (await reportRes.json()) || {};

  return reportId;
}

export const mockFetchReport = async (delay: number = 1000): Promise<Report> => {
  //for testing
  await wait(delay);

  return mockReport;
};

// export async function saveReport(report) {
//   const options = {
//     body: JSON.stringify(report),
//     method: 'POST',
//   };
//   const reportRes = await fetch(API_URL.SAVED_REPORT, options);
//   const responseJson = await reportRes.json();

//   return responseJson?.insertedId;
// }
