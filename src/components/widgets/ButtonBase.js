import React from 'react';
import clsx from 'clsx';
import { makeStyles, Button } from '@material-ui/core/';

const useStyles = makeStyles(({ widgets: { button } }) => ({
  root: {
    ...button.base,
    fontSize: '1.3rem',
  },
  shadow: {
    boxShadow: button.boxShadow,
    '&:hover': {
      boxShadow: button.boxShadow,
    },
  },
  /* Remove shadow because it overlap neighbor buttons */
  disableShadow: {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
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
    border: button.border,
  },
}));

export const ButtonBase = ({
  className,
  gridArea,
  disableShadow = false,
  ...other
}) => {
  const classes = useStyles();

  return (
    <Button
      color="primary"
      variant="contained"
      className={clsx(
        classes.root,
        classes[gridArea],
        {
          [classes.disableShadow]: disableShadow,
          [classes.shadow]: !disableShadow,
        },
        className, 
        )}
      {...other}
    />
  );
};
