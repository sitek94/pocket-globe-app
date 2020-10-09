import { useState } from 'react';
import { createMuiTheme, useMediaQuery } from '@material-ui/core';

const breakpoints = {
  values: {
    xs: 0,
    mobile: 400,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

export const useDarkMode = () => {
  // Dark/light mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2', // Shade of blue from Material UI website
      },
    },
    breakpoints
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);
  return [theme, toggleDarkMode];
};
