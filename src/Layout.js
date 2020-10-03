import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '4fr 6fr',
  },
  leftColumn: {
    padding: 15,
    paddingRight: 10,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightColumn: {
    padding: 15,
    paddingLeft: 10,
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
});

export const Layout = ({ navbar, leftColumn, rightColumn, footer }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      {navbar}
      <div className={classes.leftColumn}>
        {leftColumn}
        {footer}
      </div>
      <div className={classes.rightColumn}>{rightColumn}</div>
    </Paper>
  );
};
