import React from 'react';
import { Typography, ListItemText } from '@mui/material';
import { string } from 'prop-types';
import theme from '@/theme';

export default function ManipulationDescription({ name, description, context }) {

  const suggestionNameJsx = (
    <Typography component="p" variant="body2" color="text.primary" sx={STYLES.container}>
      {name}
    </Typography>
  )
  const descriptionJsx = (
    <Typography component="p" variant="body2" color="text.primary" sx={STYLES.description}>
      {description}
    </Typography>
  )

  const contextJsx = (
    <Typography component="p" variant="body2" color="text.secondary">
      {context}
    </Typography>
  )

  const secondaryJsx = (
    <>
      {descriptionJsx}
      {contextJsx}
    </>
  )

  return (
    <ListItemText
      primary={suggestionNameJsx}
      secondary={secondaryJsx}
      sx={STYLES.listItemText}
      disableTypography
    />
  )
}

ManipulationDescription.propTypes = {
  name: string,
  description: string,
  context: string
}

const STYLES = {
  container: {
    fontWeight: 500,
    marginBottom: theme.spacing(1)
  },
  description: {
    marginBottom:
      theme.spacing(1)
  },
  listItemText: {
    marginBottom: theme.spacing(2),
    flex: '2',
    minWidth: '60%'
  }
}




