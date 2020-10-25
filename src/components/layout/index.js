import React from 'react';
import { Paper, Container } from '@material-ui/core';
import { useStyles } from './layout-styles';

export const Layout = ({ navbar, leftColumn, rightColumn, footer, isSearchboxVisible }) => {
  const classes = useStyles(isSearchboxVisible);

  return (
    <Container maxWidth={false} disableGutters>
      <Paper className={classes.layout} elevation={0}>
        <div className={classes.navbar}>{navbar}</div>
        <div className={classes.leftColumn}>{leftColumn}</div>
        <div className={classes.rightColumn}>{rightColumn}</div>
        <div className={classes.footer}>{footer}</div>
      </Paper>
    </Container>
  );
};
