
import React from 'react';
import { func, string } from 'prop-types';
import theme from '@/theme';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { EMPTY_FUNCTION } from '@/utils/utils';

const TEXTS = {
    back: 'Back',
}

export default function BackButton({ text = TEXTS.back, onClick = EMPTY_FUNCTION }) {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
        onClick();
    }

    return (
        <Button
            variant='outlined'
            sx={STYLES.backButton}
            onClick={handleGoBack}
        >
            <ChevronLeftIcon />
            <Typography >
                {text}
            </Typography>
        </Button>
    );
}

BackButton.propTypes = {
    text: string,
    onClick: func,
}

const STYLES = {
    backButton: {
        margin: theme.spacing(1, 0, 3),
        display: 'flex',
        alignItems: 'center',
    },
}
