import React from 'react';

import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  spinner: {
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const LoadingSpinner = ({ height }) => {
  const classes = useStyles();

  return (
    <div className={classes.spinner} style={height ? { height } : null}>
      <CircularProgress />
    </div>
  );
};
