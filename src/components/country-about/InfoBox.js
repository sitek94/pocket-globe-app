import React from 'react';

import { makeStyles } from '@material-ui/core';

const styles = {
  horizontal: {
    display: 'grid',
    gridTemplateColumns: '5.5fr 4.5fr',
    columnGap: 10,
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
};

const useStyles = makeStyles(({ breakpoints }) => ({
  infoBox: {
    ...styles.horizontal,
    [breakpoints.down('md')]: styles.vertical,
    [breakpoints.down('sm')]: styles.horizontal,
    [breakpoints.down('xs')]: styles.vertical,
  },
}));

export const InfoBox = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.infoBox}>{children}</div>;
};
