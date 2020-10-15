import React from 'react';
import { makeStyles } from '@material-ui/core/';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(({ widgets: { button } }) => ({
  root: {
    borderRadius: button.borderRadius,
    boxShadow: button.boxShadow,
  },
  button: {
    ...button.base,
  },
}));

export const WidgetZoom = () => {
  const classes = useStyles();

  return (
    <ButtonGroup
      className={classes.root}
      orientation="vertical"
      variant="contained"
      color="primary"
    >
      <Button
        variant="contained"
        disableElevation
        color="primary"
        className={clsx(classes.button, classes.up)}
      >
        <AddIcon />
      </Button>

      <Button
        variant="contained"
        disableElevation
        color="primary"
        className={clsx(classes.button, classes.up)}
      >
        <RemoveIcon />
      </Button>
    </ButtonGroup>
  );
};


