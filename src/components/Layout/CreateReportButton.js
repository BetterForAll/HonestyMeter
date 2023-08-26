import React from 'react';
import theme from '@/theme';
import { Button } from "@mui/material";
import { bool, func } from 'prop-types';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';

const TEXTS = {
    newReport: 'Create New Report',
    cancelNewReport: 'Cancel New Report',
}

export default function CreateReportButton({ onClick, isArticleInputShown }) {
    const icon = isArticleInputShown ? <CancelIcon sx={STYLES.icon} /> : <NoteAddIcon sx={STYLES.icon} />;
    const tooltipTitle = isArticleInputShown ? TEXTS.cancelNewReport : TEXTS.newReport;

    return (
        <Tooltip title={tooltipTitle}>
            <Button
                variant='outlined'
                onClick={onClick}
                sx={STYLES.newReportButton}
            >
                {tooltipTitle}
            </Button>
        </Tooltip>
    )
}

CreateReportButton.propTypes = {
    onClick: func,
    isArticleInputShown: bool,
}

const STYLES = {
    newReportButton: {
        // margin: 'auto',
        // marginBottom: theme.spacing(2),
        textAlign: 'center',
        // minWidth: '266px',
    },
    icon: {
        color: theme.palette.text.secondary,
    }
}