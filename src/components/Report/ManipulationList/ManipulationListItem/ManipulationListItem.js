import React, { useState } from 'react';
import { Paper, ListItem, Box, Typography, Chip, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import theme from '@/theme';
import { bool } from 'prop-types';
import { manipulationPropType } from '../../reportPropTypes';

export default function ManipulationListItem({ manipulation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const suggestionsCount = manipulation.suggestedChanges?.length || 0;

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Paper elevation={2} sx={STYLES.paper}>
      <ListItem sx={STYLES.listItem}>
        <Box sx={STYLES.content}>
          {/* Manipulation Type Badge */}
          <Typography component="span" sx={STYLES.manipulationType}>
            {manipulation.name}
          </Typography>

          {/* Description */}
          <Typography variant="body2" color="text.primary" sx={STYLES.description}>
            {manipulation.description}
          </Typography>

          {/* Context Quote */}
          <Typography variant="body2" color="text.secondary" sx={STYLES.context}>
            {manipulation.context}
          </Typography>

          {/* Suggestions Toggle */}
          {suggestionsCount > 0 && (
            <Box sx={STYLES.suggestionsToggle}>
              <Chip
                icon={<LightbulbOutlinedIcon sx={{ fontSize: '16px !important' }} />}
                label={`${suggestionsCount} suggestion${suggestionsCount > 1 ? 's' : ''}`}
                size="small"
                onClick={handleToggle}
                sx={STYLES.chip}
                variant={isExpanded ? 'filled' : 'outlined'}
                color="primary"
              />
              <IconButton
                size="small"
                onClick={handleToggle}
                sx={{
                  ...STYLES.expandIcon,
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
            </Box>
          )}

          {/* Collapsible Suggestions */}
          <Collapse in={isExpanded} timeout={300}>
            <Box sx={STYLES.suggestionsContainer}>
              {manipulation.suggestedChanges?.map((suggestion, index) => (
                <Box key={index} sx={STYLES.suggestionItem}>
                  <Typography variant="body2" sx={STYLES.suggestionText}>
                    {suggestion}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Collapse>
        </Box>
      </ListItem>
    </Paper>
  );
}

ManipulationListItem.propTypes = {
  manipulation: manipulationPropType,
  showSuggestedChangesTitle: bool
};

const STYLES = {
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    transition: 'box-shadow 0.2s ease',
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  },
  listItem: {
    display: 'block',
    padding: 0,
  },
  content: {
    width: '100%',
  },
  manipulationType: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main + '15',
    padding: theme.spacing(0.5, 1),
    borderRadius: '4px',
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(1),
    lineHeight: 1.6,
  },
  context: {
    fontStyle: 'italic',
    padding: theme.spacing(1, 2),
    borderLeft: `3px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[50],
    marginBottom: theme.spacing(1.5),
  },
  suggestionsToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },
  chip: {
    cursor: 'pointer',
    fontWeight: 500,
    '& .MuiChip-icon': {
      color: 'inherit',
    },
  },
  expandIcon: {
    transition: 'transform 0.3s ease',
    padding: theme.spacing(0.5),
  },
  suggestionsContainer: {
    marginTop: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    borderTop: `1px dashed ${theme.palette.divider}`,
  },
  suggestionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  suggestionText: {
    paddingLeft: theme.spacing(2),
    borderLeft: `3px solid ${theme.palette.success.main}`,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.success.main + '08',
    padding: theme.spacing(1, 2),
    borderRadius: '0 4px 4px 0',
    flex: 1,
  },
};








