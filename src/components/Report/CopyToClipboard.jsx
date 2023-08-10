import React, { useState, memo } from 'react';
import Button from '@mui/material/Button';
import va from '@vercel/analytics';
import { EVENT } from '@/constants/constants';
import { copyTextToClipboard } from '@/utils/utils';

function CopyToClipboard({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        copyTextToClipboard(copyText)
            .then(() => {
                setIsCopied(true);
                va.track(EVENT.reportCopied, { report: copyText });

                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((error) => {
                console.log(error);
                va.track(EVENT.reportCopyError, { error })
            });
    }

    return (
        <Button variant='outlined' sx={STYLES.button} onClick={handleCopyClick} >
            <span>{isCopied ? 'Copied!' : 'Copy report to clipboard'}</span>
        </Button >
    );
}

const STYLES = {
    button: {
        minWidth: '100%',
    }
}

export default memo(CopyToClipboard);