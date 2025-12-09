import React, { MouseEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

const TEXTS = {
    newReport: 'Create Bias Report',
    cancelNewReport: 'Cancel Bias Report',
}

interface CreateReportButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    isArticleInputShown: boolean;
}

export default function CreateReportButton({ onClick, isArticleInputShown }: CreateReportButtonProps) {
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