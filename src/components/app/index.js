import React, { useState } from 'react';

import { Layout } from '../layout';
import { Country } from '../country';
import { Globe } from '../globe';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { CountrySelect } from '../search-box';
import { useGlobeSize } from '../layout/hooks/useColumnHeight';
import { useDarkTheme } from './hooks';
import { initialState } from '../../utils/initialState';

export const App = () => {
  const [theme, toggleTheme] = useDarkTheme();

  // Selected country
  const [selectedCountry, setSelectedCountry] = useState(initialState);

  // Svg dimensions
  const [globeWidth, globeHeight] = useGlobeSize();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        navbar={
          <Navbar title={selectedCountry.name} onThemeIconClick={toggleTheme} />
        }
        leftColumn={
          <>
            <Globe
              width={globeWidth}
              height={globeHeight}
              selectedCountry={selectedCountry}
              onCountryClick={setSelectedCountry}
            />
            <CountrySelect onCountrySelect={setSelectedCountry} />
          </>
        }
        rightColumn={<Country selectedCountry={selectedCountry} />}
        footer={<Footer />}
      />
    </ThemeProvider>
  );
};
