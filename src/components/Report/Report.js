import React, { memo } from 'react';
import { Box } from '@mui/material';
import ReportHeader from './ReportHeader';
import Charts from './Charts/Charts';
import ManipulationList from './ManipulationList/ManipulationList';
import { getFormattedReportData } from './reportUtils';
import reportPropType from './reportPropTypes';

function Report({ report }) {
  const { sidesScoreData, sidesBalanceChartData } = getFormattedReportData(report);

  return (
    <Box sx={STYLES.container}>
      <ReportHeader score={report.score} explanation={report.explanation} articleTitle={report.articleTitle} articleLink={report.articleLink} />
      <Charts
        sidesScoreData={sidesScoreData}
        sidesBalanceChartData={sidesBalanceChartData}
        favoredSide={report.favoredSide} />
      <ManipulationList manipulations={report.manipulations} />
    </Box >
  );
};

Report.propTypes = {
  report: reportPropType
}

const STYLES = {
  container: {
    margin: 'auto',
    maxWidth: '1000px'
  }
}

export default memo(Report);



