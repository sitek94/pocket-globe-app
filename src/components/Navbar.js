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
import { useTheme, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    flexGrow: 1,
    gridColumn: '1 / span 2',
    color: palette.text.primary,
    backgroundColor: palette.background.default,
  },
  toolbar: {},
  title: {
    left: 0,
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    [breakpoints.only('xs')]: {
      position: 'static',
      textAlign: 'left',
    },
  },
  pushToRight: {
    marginLeft: 'auto',
  },
}));

export const Navbar = ({ title, onThemeIconClick }) => {
  const classes = useStyles();
  const {
    palette: { type },
    breakpoints,
  } = useTheme();

  // Media queries
  const matchesUpSm = useMediaQuery(breakpoints.up('sm'));
  const matchesDownSmall = useMediaQuery(breakpoints.down('xs'));
  const matchesDownMobile = useMediaQuery(
    `(max-width:${breakpoints.values.mobile}px)`
  );

  // App Globe icon
  const appGlobeIcon = (
    <IconButton edge="start">
      <GlobeIcon fontSize="large" />
    </IconButton>
  );

  // GitHub repository icon
  const githubIconLabel = 'GitHub repository';
  const githubIcon = (
    <Tooltip title={githubIconLabel} aria-label={githubIconLabel}>
      <IconButton
        className={classes.pushToRight}
        component="a"
        edge="end"
        color="inherit"
        aria-label={githubIconLabel}
        href="https://github.com/sitek94/pocket-globe-app"
        target="_blank"
        rel="noopener"
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

  let titleVariant = 'h4';
  if (matchesDownSmall) titleVariant = 'h5';
  if (matchesDownMobile) titleVariant = 'h6';

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        {matchesUpSm && appGlobeIcon}
        <Typography className={classes.title} variant={titleVariant}>
          {title}
        </Typography>
        {githubIcon}
        {themeIcon}
      </Toolbar>
    </AppBar>
  );
};
