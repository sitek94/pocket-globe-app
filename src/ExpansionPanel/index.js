import React from 'react';
import './style.scss';

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core';

// Root
const Accordion = withStyles({
  root: {
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {},
})(MuiAccordion);

// Summary
const AccordionSummary = withStyles({
  root: {
    '&$expanded': {
      minHeight: 0,
    },
  },
  content: {
    '&$expanded': {
      margin: '0',
    },
  },
  expanded: {
    minHeight: 0,
  },
})(MuiAccordionSummary);

// Details
const AccordionDetails = withStyles({
  root: {
    
  },
})(MuiAccordionDetails);

// Expansion Panel
export const ExpansionPanel = ({ summary, details, disableDetailsPadding }) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      {summary}
    </AccordionSummary>
    <AccordionDetails style={disableDetailsPadding && { padding: 0 }}>
      {details}
    </AccordionDetails>
  </Accordion>
);
