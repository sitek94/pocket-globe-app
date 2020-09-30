import React, { useState } from 'react';

import { Country } from './Country';
import { Globe } from './Globe';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ThemeProvider, createMuiTheme, Paper } from '@material-ui/core';

const Layout = ({ navbar, leftColumn, rightColumn }) => (
  <Paper className="Layout">
    {navbar}
    <div className="left-column">{leftColumn}</div>
    <div className="right-column">{rightColumn}</div>
  </Paper>
);

export const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  });
  const handleDarkModeToggle = () => setDarkMode(!darkMode);

  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Poland',
    alphaCode: 'POL',
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout
        navbar={<Navbar theme="light" title={selectedCountry.name} onThemeIconClick={handleDarkModeToggle} />}
        leftColumn={
          <>
            <Globe onCountryClick={setSelectedCountry} />
            <Footer />
          </>
        }
        rightColumn={<Country countryProps={selectedCountry} />}
      />
    </ThemeProvider>
  );
};
