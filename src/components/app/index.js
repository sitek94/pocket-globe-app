import React, { useState } from 'react';

import { Layout } from '../Layout';
import { Country } from '../country';
import { Globe } from '../globe';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { useIsoCountriesData, useDarkMode } from './hooks';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorBox } from '../ErrorBox';

export const initialState = {
  name: 'Poland',
  code: '616',
  alpha: 'POL',
};

export const App = () => {
  const [theme, toggleDarkMode] = useDarkMode();
  const [countries, isLoading, isError] = useIsoCountriesData();

  // Selected country
  const [selectedCountry, setSelectedCountry] = useState(initialState);
  const handleSelectedCountryChange = (code) => {
    setSelectedCountry(countries[code]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isError && <ErrorBox when="loading the app" />}
      {isLoading ? (
        <LoadingSpinner height={600} />
      ) : (
        <Layout
          navbar={
            <Navbar
              title={selectedCountry.name}
              onThemeIconClick={toggleDarkMode}
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
      )}
    </ThemeProvider>
  );
};
