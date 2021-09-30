import { useState } from 'react';
import { createMuiTheme, useMediaQuery } from '@material-ui/core';

/* Base theme for reference when creating app theme */
const defaultTheme = createMuiTheme();

export const useTheme = () => {
  /* Dark / light mode */
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        /* Shade of blue from Material UI website */
        main: '#1976d2',
      },
    },
    breakpoints: {
      values: {
        /* Extend original breakpoints with custom mobile breakpoint */
        ...defaultTheme.breakpoints.values,
        mobile: 400,
      },
    },
    shape: {
      borderRadius: 8,
      buttonWidth: 29,
    },
  });

  const toggleTheme = () => setDarkMode(!darkMode);
  return [theme, toggleTheme];
};
