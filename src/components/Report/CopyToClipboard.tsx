import React, { useState, memo } from 'react';
import va from '@vercel/analytics';
import { EVENT } from '@/constants/constants';
import { copyTextToClipboard } from '@/utils/utils';
import { Button } from '../ui/button';
import { Copy, Check } from 'lucide-react';

const TIMEOUT = 1500;

const TEXTS = {
    copy: 'Copy report to clipboard',
    copied: 'Copied!',
}

interface CopyToClipboardProps {
    copyText: string;
}

function CopyToClipboard({ copyText }: CopyToClipboardProps) {
    const [isCopied, setIsCopied] = useState(false);
    const buttonText = isCopied ? TEXTS.copied : TEXTS.copy;
    const Icon = isCopied ? Check : Copy;

    const handleCopyClick = () => {
        copyTextToClipboard(copyText)
            .then(() => {
                setIsCopied(true);
                va.track(EVENT.reportCopied, { report: copyText });

                setTimeout(() => {
                    setIsCopied(false);
                }, TIMEOUT);
            })
            .catch((error) => {
                console.log(error);
                va.track(EVENT.reportCopyError, { error })
            });
    }

    return (
        <Button 
            variant='outline' 
            onClick={handleCopyClick}
            className="w-full max-w-xs gap-2"
        >
            <Icon className="w-4 h-4" />
            <span>{buttonText}</span>
        </Button>
    );
}

export default memo(CopyToClipboard);