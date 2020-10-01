import React from 'react';
import './style.scss';

import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const LoadingSpinner = ({ height }) => {
  const classes = useStyles();

  return (
    <div className={classes.container} style={height ? { height } : null}>
      <CircularProgress />
    </div>
  );
};
