import React from 'react';
import { Typography, List } from '@mui/material';
import ManipulationListItem from './ManipulationListItem/ManipulationListItem';
import theme from '@/theme';
import { manipulationsPropType } from '../reportPropTypes';

const TEXTS = {
  title: 'Detected Manipulations & Suggested Changes'
}

export default function ManipulationList({ manipulations }) {
  return (
    <>
      <Typography variant="h6" sx={STYLES.title}>
        {TEXTS.title}
      </Typography>
      <List>
        {manipulations.map((manipulation, index) => {
          const isFirstItem = index === 0;

          return (
            <ManipulationListItem
              manipulation={manipulation}
              key={index}
              showSuggestedChangesTitle={isFirstItem} />
          )
        }
        )}
      </List>
    </>
  )
}

ManipulationList.propTypes = {
  manipulations: manipulationsPropType
}

const STYLES = {
  title: {
    padding: theme.spacing(0, 2),
  }
}


