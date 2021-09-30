import React from 'react';
import { ErrorOutline as ErrorIcon } from '@material-ui/icons';
import {makeStyles, Typography, Box, Link} from '@material-ui/core';
import pkg from '../../package.json';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  box: {
    padding: spacing(2)
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }
}));

export const ErrorBox = () => {
  const classes = useStyles();

  return (
    <Box
      color="background.paper"
      bgcolor="text.secondary"
      className={classes.container}
    >
      <div className={classes.box}>
        <div className={classes.header}>
          <ErrorIcon fontSize="large" />
          <Typography variant="h5">Aw, Snap!</Typography>
        </div>
        <Typography variant="subtitle1">Something went wrong, please <Link underline="always" color="inherit" href={pkg.bugs.url}>submit an issue</Link>, and I'll get it fixed, cheers!</Typography>
      </div>
    </Box>
  );
};
