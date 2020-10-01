import React from 'react';

import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import {
  PublicOutlined as GlobeIcon,
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    gridColumn: '1 / span 2',
    color: palette.text.primary,
    backgroundColor: palette.background.default ,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}))

export const Navbar = ({ title, onThemeIconClick }) => {
  const { palette: { type } } = useTheme();
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <GlobeIcon fontSize="large" />
        <Typography variant="h4">
          {title}
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={onThemeIconClick}>
          {type === 'light' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
