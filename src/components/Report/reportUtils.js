import { convertStringToPascalCase, generateRandomRgbaColor, getHttpProtocol } from "@/utils/utils";
import { SIDES_BALANCE_CHART_TEMLATE, SIDES_SCORE_CHART_LABELS } from "./reportConstants";
import { BASE_URL } from "@/constants/constants";

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

function getSideBalanceData(sidesBalance = {}) {
  return Object.keys(sidesBalance).reduce((acc, sideName) => {
    const sideBalance = sidesBalance[sideName];
    acc.labels.push(`${sideName} (${sideBalance}%)`);
    acc.values.push(sideBalance);

    return acc;
  }, { labels: [], values: [] });
}

function generateSidesScoreChartData(sidesScore = []) {
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

export function getFormattedReportData(data) {
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

export function getShareHashTags(sidesScore) {
  const sideNames = Object.keys(sidesScore).map(key => sidesScore[key].sideName);
  const sideNamesHashTags = sideNames.map(sideName => convertStringToPascalCase(sideName));
  const shareHashTags = [...sideNamesHashTags, ...DEFAULT_HASH_TAGS];

  return shareHashTags;
}

export function getShareProps({ report, shareUrl }) {
  const { articleTitle, sidesScore = {}, score, explanation = '', _id: reportId } = report;

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

export function getReportShareTitle(articleTitle, objectivityScore) {
  const BIAS_REPORT = 'Bias Report';
  const OBJECTIVITY_SCORE = 'Objectivity score';
  const longTitle = `${articleTitle} - ${BIAS_REPORT} - ${OBJECTIVITY_SCORE}: ${objectivityScore}`;
  const shortTitle = BIAS_REPORT;
  const title = articleTitle ? longTitle : shortTitle;

  return title;
}

export function getSavedReportShareProps({ sidesScore, articleTitle, score, explanation, shareUrl }) {
  return {
    url: shareUrl,
    title: getReportShareTitle(articleTitle, score),
    hasTags: getShareHashTags(sidesScore),
    description: explanation,
    context: SHARING_CONTEXT.report,
  }
}

export const createShareUrl = (shareLevel) => {
  const isServerSide = isServer();

  if (isServerSide) return EMPTY_STRING;

  const SHARE_LEVEL_PARAM_KEY = 'shareLevel';
  const updatedShareLevel = parseInt(shareLevel) + 1;
  const baseUrl = new URL(window.location.href);
  baseUrl.searchParams.set(SHARE_LEVEL_PARAM_KEY, updatedShareLevel);

  return baseUrl.href;
}

export const getSavedReportUrl = (host, reportId) => {
  const httpProtocol = getHttpProtocol(host)

  return `${httpProtocol}://${host}/report/${reportId}`
}