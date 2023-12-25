/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import theme from '@/theme';
import {
    Box,
    Fade,
    Modal,
    Tooltip,
    Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const TEXTS = {
    clickForMethodology: 'Click for methodology',
}


export function Rating({ createdAt, items, title, titleColor, Methodology }) {
    const [isMethodologyModalShown, setIsMethodologyModalShown] = useState(false);

    const handleRatingClick = () => {
        setIsMethodologyModalShown(prevShown => !prevShown);
    }

    return (
        <>
            <Modal open={isMethodologyModalShown} onClose={handleRatingClick}>
                <Fade in={isMethodologyModalShown} timeout={{ enter: 300, exit: 400 }}>
                    <Box onClick={handleRatingClick}>
                        <Methodology createdAt={createdAt} />
                    </Box>
                </Fade>
            </Modal>
            <Tooltip title={TEXTS.clickForMethodology}>
                <Box sx={STYLES.ratingContainer}
                    onClick={handleRatingClick}>
                    <Typography variant='body1'
                        sx={STYLES.title({ titleColor: titleColor })}>
                        {title} <InfoIcon sx={STYLES.infoIcon} />
                    </Typography>
                    <Typography variant='body1' sx={STYLES.paragraph}>
                        {items}
                    </Typography>
                </Box>
            </Tooltip>
        </>
    )
}

export function RatingList({ ratings }) {
    return (
        <Box>
            {ratings.map((rating) => (
                <Rating key={rating.title} {...rating} />
            ))}
        </Box>
    )
}


const STYLES = {
    ratingContainer: {
        cursor: 'pointer',
        fontSize: theme.typography.fontSize * 0.75,
        textAlign: 'center',
        marginBottom: 2,
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
    },
    title: ({ titleColor }) => ({
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.fontSize * 1,
        display: 'flex',
        color: titleColor || theme.palette.text.primary,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        marginBottom: 0.5,
    }),
    infoIcon: { fontSize: theme.typography.fontSize * 1.25 },
    paragraph: {
        fontSize: 'inherit',
        marginBottom: 1,
        color: theme.palette.text.primary
    },
};
