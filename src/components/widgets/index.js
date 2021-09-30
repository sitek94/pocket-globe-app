import React, { forwardRef } from 'react';
import { makeStyles, Slide } from '@material-ui/core';

import { WidgetNavigation } from './WidgetNavigation';
import { WidgetZoom } from './WidgetZoom';
import { WidgetRandomCountry } from './WidgetRandomCountry';
export { WidgetNavigation, WidgetZoom, WidgetRandomCountry };

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  widgets: {
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginBottom: spacing(1),
    },
    /* Position in the right bottom corner of relative parent */
    position: 'absolute',
    bottom: spacing(2),
    right: spacing(2),
    [breakpoints.down('md')]: {
      bottom: 0,
      right: 0,
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(3, auto)`,
    gridTemplateRows: `repeat(3, auto)`,
    gridTemplateAreas: `
      '. up .'
      'left center right'
      '. down .'`,
  },
}));

const WidgetsBase = forwardRef((props, ref) => {
  const classes = useStyles();

  return <div ref={ref} className={classes.widgets} {...props} />;
});

export const Widgets = ({ show, children }) => {
  return (
    <Slide direction="right" in={show} mountOnEnter unmountOnExit>
      <WidgetsBase>{children}</WidgetsBase>
    </Slide>
  );
};
