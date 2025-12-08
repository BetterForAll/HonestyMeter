import { convertStringToPascalCase, generateRandomRgbaColor, getHttpProtocol, isServer } from "@/utils/utils";
import { SIDES_BALANCE_CHART_TEMLATE, SIDES_SCORE_CHART_LABELS } from "./reportConstants";
import { BASE_URL } from "@/constants/constants";
import { Report, SideScore } from "@/types/report";

const TEXTS = {
  shareTitle: 'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
  shareDescription: 'HonestyMeter - Check media content for objectivity and bias.',
  shareHashTags: ['HonestyMeter', 'MediaBias', 'FakeNews'],
}

const SHARING_CONTEXT = {
  app: 'app',
  report: 'report',
}
const DEFAULT_HASH_TAGS = ['HonestyMeter', 'MediaBias', 'FakeNews'];

function getSideBalanceData(sidesBalance: Record<string, number> = {}) {
  return Object.keys(sidesBalance).reduce((acc: { labels: string[], values: number[] }, sideName) => {
    const sideBalance = sidesBalance[sideName];
    acc.labels.push(`${sideName} (${sideBalance}%)`);
    acc.values.push(sideBalance);

    return acc;
  }, { labels: [], values: [] });
}

function generateSidesScoreChartData(sidesScore: SideScore[] = []) {
  const sidesScoreDataSets = sidesScore.map((side) => ({
    label: `${side.sideName} (${side.score})`,
    data: [side.score],
    backgroundColor: generateRandomRgbaColor()
  }));

  const sidesScoreData = {
    labels: SIDES_SCORE_CHART_LABELS,
    datasets: sidesScoreDataSets
  };

  return sidesScoreData;
}

export function getFormattedReportData(data: Report) {
  const { labels: sideBalanceChartLabels, values: sideBalanceChartValues } = getSideBalanceData(data.sidesBalance);
  const sidesBalanceColors = sideBalanceChartValues.map((_) => generateRandomRgbaColor());
  const sidesBalanceChartData = {
    ...SIDES_BALANCE_CHART_TEMLATE,
    labels: sideBalanceChartLabels,
    datasets: [
      {
        ...SIDES_BALANCE_CHART_TEMLATE.datasets[0],
        data: sideBalanceChartValues,
        backgroundColor: sidesBalanceColors,
        borderColor: sidesBalanceColors,
      }
    ]
  };
  const sidesScoreData = generateSidesScoreChartData(data.sidesScore);
  return { sidesScoreData, sidesBalanceChartData };
}

export function getShareHashTags(sidesScore: Record<string, any> | SideScore[]) {
  // Handle both array and object formats if necessary, but Report type says SideScore[]
  // If sidesScore is array:
  if (Array.isArray(sidesScore)) {
      const sideNames = sidesScore.map(s => s.sideName);
      const sideNamesHashTags = sideNames.map(sideName => convertStringToPascalCase(sideName));
      return [...sideNamesHashTags, ...DEFAULT_HASH_TAGS];
  }
  
  // Fallback if it's object (legacy)
  const sideNames = Object.keys(sidesScore).map(key => sidesScore[key].sideName);
  const sideNamesHashTags = sideNames.map(sideName => convertStringToPascalCase(sideName));
  const shareHashTags = [...sideNamesHashTags, ...DEFAULT_HASH_TAGS];

  return shareHashTags;
}

export interface ShareProps {
    report: Report;
    shareUrl?: string;
}

export function getShareProps({ report, shareUrl }: ShareProps) {
  const { articleTitle, sidesScore = [], score, explanation = '', _id: reportId } = report;

  const isReportSaved = Boolean(reportId);
  const shareProps = isReportSaved ?
    getSavedReportShareProps({ sidesScore, articleTitle, score, explanation, shareUrl })
    :
    getCustomReportShareProps();

  return shareProps;
}

export function getCustomReportShareProps() {
  //Temporary - share app instead of report. TODO: save and share report using same url structure as saved report
  return {
    url: BASE_URL,
    title: TEXTS.shareTitle,
    hashTags: DEFAULT_HASH_TAGS,
    description: TEXTS.shareDescription,
    context: SHARING_CONTEXT.app,
  }
}

export function getReportShareTitle(articleTitle: string, objectivityScore: number) {
  const BIAS_REPORT = 'Bias Report';
  const OBJECTIVITY_SCORE = 'Objectivity score';
  const longTitle = `${articleTitle} - ${BIAS_REPORT} - ${OBJECTIVITY_SCORE}: ${objectivityScore}`;
  const shortTitle = BIAS_REPORT;
  const title = articleTitle ? longTitle : shortTitle;

  return title;
}

interface SavedReportShareProps {
    sidesScore: SideScore[];
    articleTitle: string;
    score: number;
    explanation: string;
    shareUrl?: string;
}

export function getSavedReportShareProps({ sidesScore, articleTitle, score, explanation, shareUrl }: SavedReportShareProps) {
  return {
    url: shareUrl || BASE_URL,
    title: getReportShareTitle(articleTitle, score),
    hasTags: getShareHashTags(sidesScore),
    description: explanation,
    context: SHARING_CONTEXT.report,
  }
}

export const createShareUrl = (shareLevel: string | number, reportId?: string) => {
  const isServerSide = isServer();

  if (isServerSide) return '';

  const SHARE_LEVEL_PARAM_KEY = 'shareLevel';
  const updatedShareLevel = Number(shareLevel) + 1;
  
  // Build URL with report ID
  let baseUrl;
  if (reportId) {
    // Use the proper report URL with the ID
    baseUrl = new URL(`${window.location.origin}/report/${reportId}`);
  } else {
    baseUrl = new URL(window.location.href);
  }
  
  baseUrl.searchParams.set(SHARE_LEVEL_PARAM_KEY, updatedShareLevel.toString());

  return baseUrl.href;
}

export const getSavedReportUrl = (host: string, reportId: string) => {
  const httpProtocol = getHttpProtocol(host)

  return `${httpProtocol}://${host}/report/${reportId}`
}