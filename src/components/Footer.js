import React, { memo } from 'react';
import { Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing, shadows }) => ({
  container: {
    padding: spacing(1),
    textAlign: 'center',
    boxShadow: shadows['7'],
  },
}));

export const Footer = memo(() => {
  const classes = useStyles();

  const year = new Date().getFullYear();

  const myGithubLink = (
    <Link
      href="https://github.com/sitek94"
      target="_blank"
      variant="body2"
      rel="noopener"
    >
      Maciek Sitkowski
    </Link>
  );

  return (
    <footer className={classes.container}>
      <Typography color="textSecondary" variant="body2">
        &copy; {year} by {myGithubLink}
      </Typography>
    </footer>
  );
});
