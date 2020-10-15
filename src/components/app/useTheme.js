import { useState } from 'react';
import { createMuiTheme, useMediaQuery } from '@material-ui/core';

/* Base theme for reference when creating app theme */
const baseTheme = createMuiTheme({
  palette: {
    primary: {
      /* Shade of blue from Material UI website */
      main: '#1976d2',
    },
  },
})

export const useTheme = () => {
  /* Dark / light mode */
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {  
        main: baseTheme.palette.primary.main,
      },
    },
    breakpoints: {
      values: {
        /* Extend original breakpoints with custom mobile breakpoint */
        ...baseTheme.breakpoints.values,
        mobile: 400,
      },
    },
    widgets: {
      button: {
        width: 29,
        height: 29,
        borderRadius: 8,
        boxShadow: baseTheme.shadows['11'],
        base: {
          width: 29,
          height: 29,
          padding: 0,
          minWidth: 0,
          minHeight: 0,
          borderRadius: 8,
        },
        border: `1px solid ${baseTheme.palette.primary.dark}`,
      }
    }
  });

  const toggleTheme = () => setDarkMode(!darkMode);
  return [theme, toggleTheme];
};
