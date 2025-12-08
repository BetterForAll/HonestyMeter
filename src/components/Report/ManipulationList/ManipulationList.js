import React from 'react';
import { Typography, List } from '@mui/material';
import ManipulationListItem from './ManipulationListItem/ManipulationListItem';
import theme from '@/theme';
import { manipulationsPropType } from '../reportPropTypes';

const TEXTS = {
  title: 'Detected Manipulations & Suggested Changes'
}

export default function ManipulationList({ manipulations = [] }) {
  return (
    <>
      <Typography variant="h6" sx={STYLES.title}>
        {TEXTS.title}
      </Typography>
      <List sx={STYLES.list}>
        {manipulations.map((manipulation, index) => {
          return (
            <ManipulationListItem
              manipulation={manipulation}
              key={index} />
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
  },
  list: {
    paddingBottom: 0
  }
}


