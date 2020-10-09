import React from 'react';
import {
  makeStyles,
  Paper,
  Container,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  container: {
    height: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '4fr 6fr',
    [breakpoints.down('sm')]: {
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  navbar: {
    gridColumn: '1 / span 2',
  },
  leftColumn: {
    position: 'relative',
    padding: spacing(2),
    paddingRight: spacing(1),

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      padding: spacing(2),
    },
  },
  rightColumn: {
    padding: spacing(2),
    paddingLeft: spacing(1),
    overflowY: 'scroll',
    overflowX: 'hidden',
    [breakpoints.down('sm')]: {
      padding: spacing(2),
      overflowY: 'hidden',
    },
    [breakpoints.only('xs')]: {
      paddingTop: 0,
    },
  },
  footer: {
    gridColumn: '1 / span 2',
  },
}));

export const Layout = ({ navbar, leftColumn, rightColumn, footer }) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} disableGutters>
      <Paper className={classes.container} elevation={0}>
        <div className={classes.navbar}>{navbar}</div>
        <div className={classes.leftColumn}>{leftColumn}</div>
        <div className={classes.rightColumn}>{rightColumn}</div>
        <div className={classes.footer}>{footer}</div>
      </Paper>
    </Container>
  );
};
