import React, { useState } from 'react';

import { Layout } from './Layout';
import { Country } from './Country';
import { Globe } from './Globe';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';

const initialState = {
  name: 'Poland',
  alphaCode: 'POL'
}

export const App = () => {

  // Dark/light mode
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2' // Shade of blue from Material UI website
      }
    }
  });
  const handleDarkModeToggle = () => setDarkMode(!darkMode);

  // Selected country
  const [selectedCountry, setSelectedCountry] = useState(initialState);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        navbar={<Navbar title={selectedCountry.name} onThemeIconClick={handleDarkModeToggle} />}
        leftColumn={<Globe onCountryClick={setSelectedCountry} />}
        rightColumn={<Country countryProps={selectedCountry} />}
        footer={<Footer />}
      />
    </ThemeProvider>
  );
};
