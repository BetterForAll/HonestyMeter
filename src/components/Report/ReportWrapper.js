import React, { useEffect } from 'react'
import { string, func } from 'prop-types';
import theme from '@/theme';
import va from '@vercel/analytics';
import Report from './Report';
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Tooltip from '@mui/material/Tooltip';
import { EMPTY_FUNCTION, scrollToTop } from '@/utils/utils';
import reportPropType from './reportPropTypes';
import CopyToClipboard from './CopyToClipboard';
import Share from '../Share';
import { createShareUrl, getShareProps } from './reportUtils';
import { EVENT } from '@/constants/constants';

const TEXTS = {
    title: 'Bias report',
    subtitle: 'HonestyMeter - AI powered bias detection',
    closeReport: 'close report',
}

function ReportWrapper({ report = {}, shareLevel, showArticleInput = EMPTY_FUNCTION }) {
    const shareUrl = createShareUrl(shareLevel);
    const shareProps = getShareProps({ report, shareUrl });
    const { articleTitle, articleLink, score } = report;

    useEffect(() => {
        scrollToTop();

        const isReportEmpty = !report.score;

        if (isReportEmpty) return

        va.track(EVENT.reportViewed, { articleTitle, articleLink, score });

    }, [report, articleLink, articleTitle, score])

    return (
        <Box sx={STYLES.container}>
            <ReportWrapperHeader onCloseReportClick={showArticleInput} />
            <Report report={report} />
            <Box sx={STYLES.copyToClipboardContainer}>
                <CopyToClipboard copyText={shareUrl} />
            </Box>
            <ReportDivider />
            <Share {...shareProps} />
            <Button
                variant="outlined"
                size="large"
                sx={STYLES.closeButton}
                onClick={showArticleInput}
            >
                {TEXTS.closeReport}
            </Button>
        </Box>
    )
}

ReportWrapper.propTypes = {
    report: reportPropType,
    reportJson: string,
    showArticleInput: func.isRequired,
}


function ReportWrapperHeader({ onCloseReportClick = EMPTY_FUNCTION }) {
    const closeIconTooltipTitle = TEXTS.closeReport;

    return (
        <Box sx={STYLES.header}>
            <EmptyElement />
            <Box>
                <Typography
                    variant="h4"
                    sx={STYLES.title}>
                    {TEXTS.title}
                </Typography>
                <Typography
                    sx={STYLES.subtitle}>
                    {TEXTS.subtitle}
                </Typography>
            </Box>
            <CloseIconWithTooltip
                title={closeIconTooltipTitle}
                onClick={onCloseReportClick}
            />
        </Box>
    )
}

ReportWrapperHeader.propTypes = {
    onCloseReportClick: func
}

function CloseIconWithTooltip({ title, placement = 'top-start', onClick }) {
    return (
        <Tooltip title={
            <Typography variant="body2">
                {title}
            </Typography>
        }
            placement={placement} >
            <CloseRoundedIcon color='inherit' sx={STYLES.closeIcon} onClick={onClick} />
        </Tooltip>
    )
}

CloseIconWithTooltip.propTypes = {
    title: string.isRequired,
    placement: string,
    onClick: func.isRequired
}

const ReportDivider = () => <Divider sx={STYLES.divider} />

const EmptyElement = () => <Box />

const STYLES = {
    container: {
        maxWidth: '1000px',
        margin: 'auto',
        paddingTop: theme.spacing(2),
    },
    closeButton: {
        width: '200px',
        marginLeft: 'calc(100% - 200px)',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(1),
        textAlign: 'center',
        fontSize: theme.typography.fontSize * 1.125,
    },
    subtitle: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
        fontSize: theme.typography.fontSize,
        color: theme.palette.text.secondary
    },
    closeIcon: {
        cursor: 'pointer',
        fontSize: theme.spacing(3),
        color: theme.palette.text.secondary,
    },
    divider: {
        marginBottom: theme.spacing(2.5)
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    copyToClipboardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing(0, 0, 4, 0)
    }
}

export default ReportWrapper;