import React, { memo, useState } from 'react';
import ReportHeader from './ReportHeader';
import Charts from './Charts/Charts';
import ManipulationList from './ManipulationList/ManipulationList';
import { getFormattedReportData } from './reportUtils';
import { EMPTY_STRING } from '@/constants/constants';
import Warning from './Warning';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { CheckCircle, X } from 'lucide-react';
import { Report as ReportType } from '@/types/report';

async function submitFeedback(feedback: string, report: ReportType) {
  const result = await fetch('/api/feedback', {
    method: 'POST',
    body: JSON.stringify({ feedback, reportId: report._id })
  });

  const parsedRes = await result.json();
}

interface FormDialogProps {
    isDialogOpen: boolean;
    onClose: (e?: any) => void;
    report: ReportType;
}

function FormDialog({ isDialogOpen, onClose, report }: FormDialogProps) {
  const [feedback, setFeedback] = useState(EMPTY_STRING);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    onClose(e);
    try {
      await submitFeedback(feedback, report);
      setShowSuccess(true);
      setFeedback(EMPTY_STRING);
      setTimeout(() => setShowSuccess(false), 6000);
    } catch (err) {
      console.log(err);
      alert('Something went wrong, please try again later');
    }
  };

  return (
    <>
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>Feedback submitted successfully! If your feedback is accepted, the report will be updated.</span>
          <button onClick={() => setShowSuccess(false)} className="ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Give Feedback</DialogTitle>
            <DialogDescription>
              Improve the report, Shape a fairer world!
            </DialogDescription>
          </DialogHeader>
          <Textarea
            id="feedback"
            placeholder="Type Your Feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            rows={8}
            className="min-h-[200px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface ReportProps {
    report: ReportType;
    biasLevel: number;
    shareProps: any; // Using any for now, matches ReportHeader usage
}

function Report({ report, biasLevel, shareProps }: ReportProps) {
  const { sidesScoreData, sidesBalanceChartData } = getFormattedReportData(report);
  const isManipulationsFound = report?.score !== 100;
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleClose = (e?: any) => {
    e?.stopPropagation?.();
    setDialogOpen(false);
  };

  return (
    <div className="mx-auto max-w-[1000px] cursor-crosshair" onClick={handleOpenDialog}>
      <FormDialog isDialogOpen={isDialogOpen} onClose={handleClose} report={report} />
      <ReportHeader
        score={report.score || 0}
        explanation={report.explanation || ''}
        articleTitle={report.articleTitle || ''}
        articleLink={report.articleLink || ''}
        articleDate={report.articleDate || ''}
        biasLevel={biasLevel}
        shareProps={shareProps}
      />
      {isManipulationsFound && (
        <>
          <Charts
            sidesScoreData={sidesScoreData}
            sidesBalanceChartData={sidesBalanceChartData}
            favoredSide={report.favoredSide || ''}
          />
          <div className="my-6">
            <Warning />
          </div>
          <ManipulationList manipulations={report.manipulations || []} />
        </>
      )}
    </div>
  );
}

export default memo(Report);
