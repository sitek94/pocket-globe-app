import React, { useState } from 'react';

import { Layout } from '../layout';
import { Country } from '../country';
import { Globe } from '../globe';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { useIsoCountriesData, useDarkMode } from './hooks';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorBox } from '../ErrorBox';
import { SearchBox } from '../search-box';
import { useGlobeSize } from '../layout/hooks/useColumnHeight';

export const initialState = {
  name: 'Poland',
  code: '616',
  alpha: 'POL',
};

export const App = () => {
  const [theme, toggleDarkMode] = useDarkMode();
  const [countries, countryNames, isLoading, isError] = useIsoCountriesData();

  // Selected country
  const [selectedCountry, setSelectedCountry] = useState(initialState);
  const setSelectedCountryByCode = (value) => {
    if (!value) return;

    const newCountry = countries[value.toLowerCase()];

    if (newCountry) setSelectedCountry(newCountry);
  };
  // Svg dimensions
  const [globeWidth, globeHeight] = useGlobeSize();

  console.log(countryNames);

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
            <>
              <Globe
                width={globeWidth}
                height={globeHeight}
                selectedCountry={selectedCountry}
                onSelectedCountryChange={setSelectedCountryByCode}
              />
              <SearchBox onTermSubmit={setSelectedCountryByCode} options={countryNames} />
            </>
          }
          rightColumn={<Country selectedCountry={selectedCountry} />}
          footer={<Footer />}
        />
      )}
    </ThemeProvider>
  );
};
