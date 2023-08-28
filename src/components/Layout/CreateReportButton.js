import React from 'react';
import theme from '@/theme';
import { Button } from "@mui/material";
import { bool, func } from 'prop-types';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import QueryStatsIcon from '@mui/icons-material/QueryStats';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
// import CancelIcon from '@mui/icons-material/Cancel';
// import Tooltip from '@mui/material/Tooltip';
//TODO: decide if we want to use icons. If so,use imports above and wrap with tooltip that shows the title

const TEXTS = {
    newReport: 'Create Bias Report',
    cancelNewReport: 'Cancel Bias Report',
}

export default function CreateReportButton({ onClick, isArticleInputShown }) {
    const title = isArticleInputShown ? TEXTS.cancelNewReport : TEXTS.newReport;

    return (
        <Button
            variant='outlined'
            onClick={onClick}
            sx={STYLES.newReportButton}
        >
            {title}
        </Button>
    )
}

CreateReportButton.propTypes = {
    onClick: func,
    isArticleInputShown: bool,
}

const STYLES = {
    newReportButton: {
        textAlign: 'center',
    },
    icon: {
        color: theme.palette.text.secondary,
    }
}