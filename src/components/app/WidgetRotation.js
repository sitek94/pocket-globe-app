import React from 'react';
import { makeStyles } from '@material-ui/core/';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import clsx from 'clsx';

const useStyles = makeStyles(({ widgets: { button }, shadows }) => ({
  widgetRotation: {
    display: 'grid',
    gridTemplateColumns: `repeat(3, auto)`,
    gridTemplateRows: `repeat(3, auto)`,
    gridTemplateAreas: `
      '. up .'
      'left center right'
      '. down .'`,
  },
  button: {
    ...button.base,
    position: 'relative',
  },
  up: {
    gridArea: 'up',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  down: {
    gridArea: 'down',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  left: {
    gridArea: 'left',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  right: {
    gridArea: 'right',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  center: {
    gridArea: 'center',
    borderRadius: 0,
    boxShadow: 'none',
    border: button.border,
  },
  /* Used for two divs that are beneath the buttons to avoid overlapping */
  shadow: {
    borderRadius: button.borderRadius,
    backgroundColor: 'transparent',
    boxShadow: button.boxShadow,
  },
  shadowHorizontal: {
    gridColumn: '1 / span 3',
    gridRow: '2 / span 1',
  },
  shadowVertical: {
    gridColumn: '2 / span 1',
    gridRow: '2 / span 3',
  },
}));

export const WidgetRotation = ({ className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.widgetRotation)}>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        className={clsx(classes.button, classes.up)}
      >
        <ArrowDropUpIcon />
      </Button>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        className={clsx(classes.button, classes.down)}
      >
        <ArrowDropDownIcon />
      </Button>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        className={clsx(classes.button, classes.center)}
      >
        <MyLocationIcon fontSize="inherit" />
      </Button>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        className={clsx(classes.button, classes.left)}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        className={clsx(classes.button, classes.right)}
      >
        <ArrowRightIcon />
      </Button>
      <div className={clsx(classes.shadowHorizontal, classes.shadow)} />
      <div className={clsx(classes.shadowVertical, classes.shadow)} />
    </div>
  );
};
