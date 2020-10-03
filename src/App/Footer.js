import React, { memo } from 'react';
import { Typography, Link } from '@material-ui/core';

export const Footer = memo(() => {
  const year = new Date().getFullYear();

  const myGithubLink = (
    <Link href="https://github.com/sitek94" target="_blank"  variant="body2" rel="noopener">
      Maciek Sitkowski
    </Link>
  )
  
  return (
    <footer>
      <Typography>&copy; {year} by {myGithubLink}</Typography>
    </footer>
  )
})