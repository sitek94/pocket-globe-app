import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/';

const shadowStyles = makeStyles(({ widgets: { button } }) => ({
  base: {
    /* Mimic shape of rotation widget */
    borderRadius: button.base.borderRadius,
    backgroundColor: 'transparent',
    boxShadow: button.boxShadow,
  },
  /* Take advantage of the fact that WidgetRotation uses grid display */
  horizontal: {
    gridColumn: '1 / span 3',
    gridRow: '2 / span 1',
  },
  vertical: {
    gridColumn: '2 / span 1',
    gridRow: '2 / span 3',
  },
}));

/**
 * Used by Widget Rotation component, where box shadow is removed due 
 * to overlapping on the neighbor buttons.
 * 
 * This compoent is rendered beneath Widget Rotation to mimic its box shadow. 
 * 
 */
export const ShadowHelper = () => {
  const classes = shadowStyles();
  return (
    <>
      <div className={clsx(classes.horizontal, classes.base)} />
      <div className={clsx(classes.vertical, classes.base)} />
    </>
  );
};