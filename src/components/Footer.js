import React, { memo } from 'react';
import { Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  footer: {
    [breakpoints.down('sm')]: {
      padding: spacing(1),
      textAlign: 'center'
    }
  }
}))

export const Footer = memo(() => {
  const classes = useStyles();

  const year = new Date().getFullYear();

  const myGithubLink = (
    <Link href="https://github.com/sitek94" target="_blank"  variant="body2" rel="noopener">
      Maciek Sitkowski
    </Link>
  )
  
  return (
    <footer className={classes.footer}>
      <Typography>&copy; {year} by {myGithubLink}</Typography>
    </footer>
  )
})