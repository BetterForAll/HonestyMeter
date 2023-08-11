import { generateRandomRgbaColor } from "@/utils/utils";
import { SIDES_BALANCE_CHART_TEMLATE, SIDES_SCORE_CHART_LABELS } from "./reportConstants";

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