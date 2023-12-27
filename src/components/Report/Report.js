import React, { memo } from 'react';
import { Box } from '@mui/material';
import ReportHeader from './ReportHeader';
import Charts from './Charts/Charts';
import ManipulationList from './ManipulationList/ManipulationList';
import { getFormattedReportData } from './reportUtils';
import reportPropType from './reportPropTypes';
import { number } from 'prop-types';

function Report({ report, biasLevel }) {
  const { sidesScoreData, sidesBalanceChartData } = getFormattedReportData(report);
  const isManipulationsFound = report?.score !== 100;

  return (
    <Box sx={STYLES.container}>
      <ReportHeader
        score={report.score}
        explanation={report.explanation}
        articleTitle={report.articleTitle}
        articleLink={report.articleLink}
        articleDate={report.articleDate}
        biasLevel={biasLevel}
      />
      {
        isManipulationsFound &&
        <>
          <Charts
            sidesScoreData={sidesScoreData}
            sidesBalanceChartData={sidesBalanceChartData}
            favoredSide={report.favoredSide} />
          <ManipulationList manipulations={report.manipulations} />
        </>
      }
    </Box >
  );
};

Report.propTypes = {
  report: reportPropType,
  biasLevel: number
}

const STYLES = {
  container: {
    margin: 'auto',
    maxWidth: '1000px'
  }
}

export default memo(Report);



