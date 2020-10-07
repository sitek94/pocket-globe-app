import React, { useState } from 'react';

import { Layout } from './Layout';
import { Country } from './Country';
import { Globe } from './Globe';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { useIsoCountriesData } from './useIsoCountriesData';
import { LoadingSpinner } from './LoadingSpinner';

const initialState = {
  name: "Poland",
  code: "616",
  alpha: "POL",
};

export const App = () => {
  // Dark/light mode
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2', // Shade of blue from Material UI website
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        mobile: 400,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      }
    }
  });

  const handleDarkModeToggle = () => setDarkMode(!darkMode);

  const [countries] = useIsoCountriesData();
  
  // Selected country
  const [selectedCountry, setSelectedCountry] = useState(initialState);
  const handleSelectedCountryChange = code => {

    setSelectedCountry(countries[code]);
  }

  if (!countries) return <LoadingSpinner />  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        navbar={
          <Navbar
            title={selectedCountry.name}
            onThemeIconClick={handleDarkModeToggle}
          />
        }
        leftColumn={
          <Globe
            selectedCountry={selectedCountry}
            onSelectedCountryChange={handleSelectedCountryChange}
          />
        }
        rightColumn={<Country selectedCountry={selectedCountry} />}
        footer={<Footer />}
      />
    </ThemeProvider>
  );
};
