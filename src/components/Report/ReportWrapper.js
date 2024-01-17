import React, { useEffect } from 'react';
import { string, func, object, number } from 'prop-types';
import theme from '@/theme';
import va from '@vercel/analytics';
import Report from './Report';
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Tooltip from '@mui/material/Tooltip';
import { EMPTY_FUNCTION, goBack } from '@/utils/utils';
import reportPropType from './reportPropTypes';
import CopyToClipboard from './CopyToClipboard';
import Share from '../Share';
import { createShareUrl, getShareProps } from './reportUtils';
import { EVENT } from '@/constants/constants';
import { useRouter } from 'next/router';
import Disclamer from '../Disclamer';
import Badge from '../Badge/Badge';
import Link from 'next/link';

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
    <Box sx={STYLES.container}>
      <ReportWrapperHeader onCloseReportClick={handleGoBack} biasLevel={biasLevel} shareProps={shareProps} />
      <Report report={report} biasLevel={biasLevel} shareProps={shareProps} />
      <Share {...shareProps} />
      <Box sx={STYLES.copyToClipboardContainer}>
        <CopyToClipboard copyText={shareUrl} />
      </Box>
      <Box sx={STYLES.botttomCloseButton}>
        <Button
          variant='outlined'
          size='large'
          sx={STYLES.closeButton}
          onClick={handleGoBack}
        >
          {TEXTS.closeReport}
        </Button>
      </Box>
      <ReportDivider />
      <Disclamer isShort />
    </Box>
  );
}

ReportWrapper.propTypes = {
  report: reportPropType,
  reportJson: string,
};

function ReportWrapperHeader({ onCloseReportClick = EMPTY_FUNCTION, biasLevel, shareProps }) {
  const closeIconTooltipTitle = TEXTS.closeReport;

  return (
    <Box>
      <Box sx={STYLES.header}>
        <EmptyElement sx={STYLES.emptyElement} />
        <Box sx={STYLES.headerContent}>
          <Typography variant='h4' sx={STYLES.title}>
            {TEXTS.title}
          </Typography>
          <Typography sx={STYLES.subtitle}>{TEXTS.subtitle}</Typography>
          <Typography sx={[STYLES.subtitle, STYLES.feedbackCta]}>
            CLICK ANY SECTION TO GIVE FEEDBACK, IMPROVE THE REPORT, SHAPE A FAIRER WORLD!
          </Typography>
        </Box>
        <CloseIconWithTooltip
          title={closeIconTooltipTitle}
          onClick={onCloseReportClick}
        />
      </Box>
    </Box>
  );
}

ReportWrapperHeader.propTypes = {
  onCloseReportClick: func,
  biasLevel: number,
  shareProps: object,
};

function CloseIconWithTooltip({ title, placement = 'top-start', onClick }) {
  return (
    <Tooltip
      title={<Typography variant='body2'>{title}</Typography>}
      placement={placement}
    >
      <CloseRoundedIcon
        color='inherit'
        sx={STYLES.closeIcon}
        onClick={onClick}
      />
    </Tooltip>
  );
}

CloseIconWithTooltip.propTypes = {
  title: string.isRequired,
  placement: string,
  onClick: func.isRequired,
};

const ReportDivider = () => <Divider sx={STYLES.divider} />;

const EmptyElement = ({ sx }) => <Box sx={sx} />;

const getBiasLevel = (score) => {
  if (score >= 80) return 0;
  if (score >= 70) return 1;
  return 2;
}

const STYLES = {
  container: {
    maxWidth: '1000px',
    margin: 'auto',
    paddingTop: theme.spacing(2),
  },
  closeButton: {
    width: '200px',
    marginBottom: theme.spacing(2),
  },
  botttomCloseButton: {
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center' 
  },
  title: {
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    fontSize: theme.typography.fontSize * 1.125,
  },
  subtitle: {
    marginBottom: theme.spacing(0),
    textAlign: 'center',
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.secondary,
  },
  badgeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    textDecoration: 'none',
  },
  closeIcon: {
    cursor: 'pointer',
    fontSize: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  divider: {
    marginBottom: theme.spacing(2.5),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative'
  },
  headerContent: {
    width: '100%'
  },
  emptyElement: {
    width: theme.spacing(3)
  },
  copyToClipboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2, 0, 4, 0),
  },
  feedbackCta: {
    margin: theme.spacing(1,0),
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize * 0.75,
    fontWeight: theme.typography.fontWeightMedium
  }
};

export default ReportWrapper;