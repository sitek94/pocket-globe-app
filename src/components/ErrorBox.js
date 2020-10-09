import React from 'react';
import { ErrorOutline as ErrorIcon } from '@material-ui/icons';
import { makeStyles, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  box: {},
});

export const ErrorBox = ({ when }) => {
  const classes = useStyles();

  return (
    <Box
      color="background.paper"
      bgcolor="text.secondary"
      className={classes.container}
    >
      <div className={classes.box}>
        <ErrorIcon fontSize="large" />
        <Typography variant="h5">Aw, Snap!</Typography>
        <Typography variant="subtitle1">Something went wrong while {when}.</Typography>
      </div>
    </Box>
  );
};
