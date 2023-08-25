import React from 'react';
import theme from '@/theme';
import { Button } from "@mui/material";
import { bool, func } from 'prop-types';

const TEXTS = {
    newReport: 'Create New Report',
    cancelNewReport: 'Cancel New Report',
}

export default function CreateReportButton({ onClick, isArticleInputShown }) {
    const text = isArticleInputShown ? TEXTS.cancelNewReport : TEXTS.newReport;

    return (
        <Button
            variant='outlined'
            onClick={onClick}
            sx={STYLES.newReportButton}
        >
            {text}
        </Button>
    );
}

CreateReportButton.propTypes = {
    onClick: func,
    isArticleInputShown: bool,
}

const STYLES = {
    newReportButton: {
        margin: 'auto',
        marginBottom: theme.spacing(2),
        textAlign: 'center',
        minWidth: '266px',
    },
}