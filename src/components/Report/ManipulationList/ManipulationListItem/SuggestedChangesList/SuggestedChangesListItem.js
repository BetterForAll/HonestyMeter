import { Box, Typography } from '@mui/material'
import React from 'react'
import theme from '@/theme'
import { string } from 'prop-types'

export default function SuggestedChangesListItem({ suggestedChange }) {
    return (
        <Box sx={STYLES.container}>
            <Typography variant="body2" sx={STYLES.suggestedChange}>
                {suggestedChange}
            </Typography>
        </Box>
    )
}

const STYLES = {
    container: {
        padding: theme.spacing(0, 4),
        marginBottom: theme.spacing(2),
        minWidth: '33.3%'
    },
    suggestedChange: {
        paddingLeft: theme.spacing(2),
        borderLeft: '3px solid #3f51b5'
    }
}

SuggestedChangesListItem.propTypes = {
    suggestedChange: string
}