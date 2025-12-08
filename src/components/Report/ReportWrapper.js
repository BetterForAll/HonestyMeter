import React, { useEffect } from 'react';
import { string, func, object, number } from 'prop-types';
import va from '@vercel/analytics';
import Report from './Report';
import { goBack } from '@/utils/utils';
import reportPropType from './reportPropTypes';
import CopyToClipboard from './CopyToClipboard';
import Share from '../Share';
import { createShareUrl, getShareProps } from './reportUtils';
import { EVENT } from '@/constants/constants';
import { useRouter } from 'next/router';
import Disclamer from '../Disclamer';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

const TEXTS = {
  title: 'Bias report',
  subtitle: 'HonestyMeter - AI powered bias detection',
  closeReport: 'close report',
};

function ReportWrapper({ report = {}, shareLevel }) {
  const shareUrl = createShareUrl(shareLevel);
  const shareProps = getShareProps({ report, shareUrl });
  const { articleTitle, articleLink, score } = report;
  const router = useRouter();
  const biasLevel = getBiasLevel(report.score);

  const handleGoBack = () => {
    goBack(router);
  }

  useEffect(() => {
    const isReportEmpty = !report.score;
    if (isReportEmpty) return;
    va.track(EVENT.reportViewed, { articleTitle, articleLink, score });
  }, [report, articleLink, articleTitle, score]);

  return (
    <div className="max-w-[1000px] mx-auto pt-4">
      <ReportWrapperHeader onCloseReportClick={handleGoBack} biasLevel={biasLevel} shareProps={shareProps} />
      <Report report={report} biasLevel={biasLevel} shareProps={shareProps} />
      <Share {...shareProps} />
      <div className="flex justify-center items-center my-4">
        <CopyToClipboard copyText={shareUrl} />
      </div>
      <div className="w-full flex justify-center">
        <Button
          variant='outline'
          size='lg'
          className="w-52 mb-4"
          onClick={handleGoBack}
        >
          {TEXTS.closeReport}
        </Button>
      </div>
      <hr className="mb-5 border-gray-200" />
      <Disclamer isShort />
    </div>
  );
}

ReportWrapper.propTypes = {
  report: reportPropType,
  reportJson: string,
};

function ReportWrapperHeader({ onCloseReportClick }) {
  return (
    <div>
      <div className="flex justify-between w-full relative">
        <div className="w-6" />
        <div className="w-full text-center">
          <h4 className="text-lg mb-2">
            {TEXTS.title}
          </h4>
          <p className="text-sm text-gray-500">
            {TEXTS.subtitle}
          </p>
          <p className="text-xs text-gray-900 font-medium my-2">
            CLICK ANY SECTION TO GIVE FEEDBACK, IMPROVE THE REPORT, SHAPE A FAIRER WORLD!
          </p>
        </div>
        <button 
          onClick={onCloseReportClick}
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          title={TEXTS.closeReport}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

ReportWrapperHeader.propTypes = {
  onCloseReportClick: func,
  biasLevel: number,
  shareProps: object,
};

const getBiasLevel = (score) => {
  if (score >= 80) return 0;
  if (score >= 70) return 1;
  return 2;
}

export default ReportWrapper;