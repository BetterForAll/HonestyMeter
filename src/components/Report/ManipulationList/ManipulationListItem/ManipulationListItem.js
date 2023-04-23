import React from 'react';
import { Paper, ListItem } from '@mui/material';
import ManipulationDescription from './ManipulationDescription';
import SuggestedChangesList from './SuggestedChangesList/SuggestedChangesList';
import theme from '@/theme';
import {  bool } from 'prop-types';
import { manipulationPropType } from '../../reportPropTypes';

export default function ManipulationListItem({ manipulation, showSuggestedChangesTitle }) {
  return (
    <Paper elevation={2} style={STYLES.paper} >
      <ListItem alignItems="flex-start" sx={STYLES.listItem}>
        <ManipulationDescription
          name={manipulation.name}
          description={manipulation.description}
          context={manipulation.context} />
        <SuggestedChangesList
          suggestedChanges={manipulation.suggestedChanges}
          showTitle={showSuggestedChangesTitle} />
      </ListItem>
    </Paper>
  )
}

ManipulationListItem.propTypes = {
  manipulation: manipulationPropType,
  showSuggestedChangesTitle: bool
}

const STYLES = {
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  listItem: {
    display: 'flex',
    flexWrap: 'wrap'
  },
}








