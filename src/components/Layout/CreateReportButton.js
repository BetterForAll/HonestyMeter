import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { bool, func } from 'prop-types';

const TEXTS = {
    newReport: 'Create Bias Report',
    cancelNewReport: 'Cancel Bias Report',
}

export default function CreateReportButton({ onClick, isArticleInputShown }) {
    const title = isArticleInputShown ? TEXTS.cancelNewReport : TEXTS.newReport;
    const Icon = isArticleInputShown ? X : Plus;

    return (
        <Button
            variant={isArticleInputShown ? "destructive" : "default"}
            onClick={onClick}
            className="gap-2"
        >
            <Icon className="h-4 w-4" />
            {title}
        </Button>
    )
}

CreateReportButton.propTypes = {
    onClick: func,
    isArticleInputShown: bool,
}