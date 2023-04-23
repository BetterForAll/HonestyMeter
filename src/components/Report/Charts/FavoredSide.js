import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import theme from '@/theme';
import { string } from 'prop-types';

const TEXTS = {
  favoredSide: 'Favored Side'
}

export default function FavoredSide({ favoredSide }) {
  return (
    <Box sx={STYLES.container}>
      <Typography variant="h6" sx={STYLES.title}>
        {TEXTS.favoredSide}
      </Typography>
      <Paper elevation={2} sx={STYLES.favoredSideContainer}>
        <Typography variant="subtitle1" sx={STYLES.favoredSide}>
          {favoredSide}
        </Typography>
      </Paper>
    </Box>
  )
}

const STYLES = {
  container: {
    margin:
      'auto'
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  favoredSideContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#557fd6bf',
    color: 'white'
  },
  favoredSide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
}

FavoredSide.propTypes = {
  favoredSide: string
}

