import React from 'react';

import { makeStyles, Button, ButtonGroup } from '@material-ui/core';
import { Add as AddIcon, Remove as MinusIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: 40,
  },
}));

export const ZoomButtons = ({
  onZoomInClick,
  onZoomOutClick
}) => {
  const classes = useStyles();

  return (
    <ButtonGroup
      className={classes.root}
      orientation="vertical"
      color="primary"
      variant="contained"
    >
      <Button id="zoom-in" aria-label="Zoom in" onClick={onZoomInClick}>
        <AddIcon />
      </Button>
      <Button aria-label="Zoom out" onClick={onZoomOutClick}>
        <MinusIcon />
      </Button>
    </ButtonGroup>
  );
}