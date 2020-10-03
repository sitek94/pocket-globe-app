import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import {
  PublicOutlined as GlobeIcon,
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
  GitHub as GitHubIcon,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    gridColumn: '1 / span 2',
    color: palette.text.primary,
    backgroundColor: palette.background.default,
  },
  toolbar: {
    display: 'flex',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
}));

export const Navbar = ({ title, onThemeIconClick }) => {
  const {
    palette: { type },
  } = useTheme();
  const classes = useStyles();

  // GitHub repository icon
  const githubIconLabel = 'GitHub repository';
  const githubIcon = (
    <Tooltip title={githubIconLabel} aria-label={githubIconLabel}>
      <IconButton
        component="a"
        edge="end"
        color="inherit"
        aria-label={githubIconLabel}
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  );

  // Theme toggle icon
  const themeIconLabel = 'Toggle light/dark theme';
  const themeIcon = (
    <Tooltip title={themeIconLabel} aria-label={themeIconLabel}>
      <IconButton
        edge="end"
        color="inherit"
        aria-label={themeIconLabel}
        onClick={onThemeIconClick}
      >
        {type === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Tooltip>
  );

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <GlobeIcon fontSize="large" />
        <Typography className={classes.title} variant="h4">{title}</Typography>
        {githubIcon}
        {themeIcon}
      </Toolbar>
    </AppBar>
  );
};
