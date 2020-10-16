import React from 'react';
import {  makeStyles } from '@material-ui/core';

import { WidgetNavigation } from './WidgetNavigation';
import { WidgetZoom } from './WidgetZoom';
import { WidgetRandomCountry } from './WidgetRandomCountry';
export {
  WidgetNavigation, WidgetZoom, WidgetRandomCountry
}

const useStyles = makeStyles(theme => ({
  widgets: {
    /* Position in the right bottom corner of relative parent */
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(2),
    /* Position children */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(1),
    }
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(3, auto)`,
    gridTemplateRows: `repeat(3, auto)`,
    gridTemplateAreas: `
      '. up .'
      'left center right'
      '. down .'`,
  }
}));

export const Widgets = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.widgets}>
      {children}
    </div>
  )
}