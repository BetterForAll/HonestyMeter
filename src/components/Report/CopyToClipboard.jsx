import React, { useState, memo } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';


function CopyToClipboard({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text); //for IE
        }
    }

    const handleCopyClick = () => {
        copyTextToClipboard(copyText)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
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