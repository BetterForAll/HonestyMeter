import { Box, Typography } from '@mui/material'
import React from 'react'
import SuggestedChangesListItem from './SuggestedChangesListItem'
import theme from '@/theme'
import { arrayOf, string, bool } from 'prop-types'
import { suggestedChangesPropType } from '@/components/Report/reportPropTypes'

const TEXTS = {
    title: 'Suggested Changes'
}

export default function SuggestedChangesList({ suggestedChanges = [], showTitle }) {
    return (
        <Box sx={STYLES.container}>
            <Typography variant="body2" sx={STYLES.title}>
                {showTitle && TEXTS.title}
            </Typography>
            {suggestedChanges.map((suggestedChange) => (
                <SuggestedChangesListItem suggestedChange={suggestedChange} key={suggestedChange} />
            ))}
        </Box>
    )
}

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px'
    },
    title: {
        padding: theme.spacing(0, 0, 2, 6),
        fontSize: theme.typography.fontSize * 0.875,
        fontWeight: 500
    },
}

SuggestedChangesList.propTypes = {
    suggestedChanges: suggestedChangesPropType,
    showTitle: bool
}