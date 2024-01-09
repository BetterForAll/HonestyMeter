import React, { memo, useState } from 'react';
import { Alert, Box, Snackbar } from '@mui/material';
import ReportHeader from './ReportHeader';
import Charts from './Charts/Charts';
import ManipulationList from './ManipulationList/ManipulationList';
import { getFormattedReportData } from './reportUtils';
import reportPropType from './reportPropTypes';
import { number, object } from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { EMPTY_STRING } from '@/constants/constants';

async function submitFeedback(feedback, report) {
  const result = await fetch('/api/feedback', {
    method: 'POST',
    body: JSON.stringify({ feedback, reportId: report._id })
  });

  const parsedRes = await result.json();
}

function FormDialog({ isDialogOpen, onClose, report }) {
  const [feedback, setFeedback] = useState(EMPTY_STRING);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (e) => {
    onClose(e);
    try {
      await submitFeedback(feedback, report);
      setSnackbarOpen(true);
      setFeedback(EMPTY_STRING);
    } catch (err) {
      console.log(err);
      alert('Something went wrong, please try again later');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    event?.stopPropagation();
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', textAlign: 'center' }}>
          Feedback submitted successfully! If your feedback is accepted, the report will be updated.
        </Alert>
      </Snackbar>
      <Dialog open={isDialogOpen} onClose={onClose}>
        <DialogTitle>Give Feedback, Improve the report, Shape a fairer world!</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Your feedback will be reviewed by our AI bias &apos;experts&apos;.
            If they accept your input, the report will be updated.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            label="Type Your Feedback"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={8}
            value={feedback}
            onChange={handleFeedbackChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Feedback</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

FormDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submitFeedback: PropTypes.func.isRequired,
  report: reportPropType
};

function Report({ report, biasLevel, shareProps }) {
  const { sidesScoreData, sidesBalanceChartData } = getFormattedReportData(report);
  const isManipulationsFound = report?.score !== 100;
  const [isDialogOpen, setDialogOpen] = useState(false);



  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    setDialogOpen(false);
  };

  return (
    <Box sx={STYLES.container} onClick={handleOpenDialog} title='Give feedback, Improve the report'>
      <FormDialog isDialogOpen={isDialogOpen} onClose={handleClose} report={report} />
      <ReportHeader
        score={report.score}
        explanation={report.explanation}
        articleTitle={report.articleTitle}
        articleLink={report.articleLink}
        articleDate={report.articleDate}
        biasLevel={biasLevel}
        shareProps={shareProps}
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
  biasLevel: number,
  shareProps: object
}

const STYLES = {
  container: {
    margin: 'auto',
    maxWidth: '1000px',
    cursor: 'crosshair'
  }
}

export default memo(Report);



