import React from 'react'
import Report from './Report'
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Tooltip from '@mui/material/Tooltip';
import theme from '@/theme';
import { EMPTY_FUNCTION, getBaseUrl } from '@/utils/utils';
import { string, func } from 'prop-types';
import reportPropType from './reportPropTypes';
import Share from '../Share';
import CopyToClipboard from './CopyToClipboard';

const TEXTS = {
    reportIsReady: 'Your Report is ready!',
    closeReport: 'close report'
}
const STATIC_REPORT_PATH = 'report?report='

export default function ReportWrapper({ report, reportJson, showArticleInput = EMPTY_FUNCTION }) {

    const baseUrl = getBaseUrl();
    const shareUrl = `${baseUrl}${STATIC_REPORT_PATH}${reportJson}`;

    return (
        <Box sx={STYLES.container}>
            <ReportWrapperHeader onCloseReportClick={showArticleInput} />
            <Report report={report} />
            <Box sx={STYLES.copyToClipboardContainer}>
                <CopyToClipboard copyText={shareUrl} />
            </Box>
            <ReportDivider />
            <Share />
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
    showArticleInput: func.isRequired
}

function ReportWrapperHeader({ onCloseReportClick = EMPTY_FUNCTION }) {
    const closeIconTooltipTitle = TEXTS.closeReport.toLowerCase();

    return (
        <Box sx={STYLES.header}>
            <EmptyElement />
            <Typography
                variant="h4"
                sx={STYLES.title}>
                {TEXTS.reportIsReady}
            </Typography>
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
        marginBottom: theme.spacing(4),
        textAlign: 'center',
        fontSize: theme.typography.fontSize * 1.125
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