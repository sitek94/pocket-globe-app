import React from 'react';
import './style.scss';

import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import {
  PublicOutlined as GlobeIcon,
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
} from '@material-ui/icons';

export const Navbar = ({ title, theme }) => (
  <AppBar className="Navbar" position="static">
    <Toolbar className="toolbar">
      <GlobeIcon fontSize="large" />
      <Typography className="title" variant="h4">
        {title}
      </Typography>
      <IconButton edge="end" color="inherit" aria-label="menu">
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Toolbar>
  </AppBar>
);
