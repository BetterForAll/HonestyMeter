import React, { useState, memo } from 'react';
import Button from '@mui/material/Button';
import va from '@vercel/analytics';
import { EVENT } from '@/constants/constants';
import { copyTextToClipboard } from '@/utils/utils';

const TIMEOUT = 1500;

const TEXTS = {
    copy: 'Copy report to clipboard',
    copied: 'Copied!',
}

function CopyToClipboard({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);
    const buttonText = isCopied ? TEXTS.copied : TEXTS.copy;

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
        <Button variant='outlined' sx={STYLES.button} onClick={handleCopyClick} >
            <span>{buttonText}</span>
        </Button >
    );
}

const STYLES = {
    button: {
        minWidth: '100%',
    }
}

export default memo(CopyToClipboard);