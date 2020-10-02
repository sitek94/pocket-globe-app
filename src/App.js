import React, { useRef, useState } from 'react';

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

  const tooltipRef = useRef();

  // Selected country
  const [selectedCountry, setSelectedCountry] = useState(initialState);

  return (
    <ThemeProvider theme={theme}>
      <Layout
        navbar={<Navbar theme="light" title={selectedCountry.name} onThemeIconClick={handleDarkModeToggle} />}
        leftColumn={
          <>
            <Globe onCountryClick={setSelectedCountry} tooltipRef={tooltipRef} />
            <Footer />
          </>
        }
        rightColumn={<Country countryProps={selectedCountry} />}
      />
    </ThemeProvider>
  );
};
