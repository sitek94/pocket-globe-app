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
import { getCountryById, getRandomCountry, initialState } from '../../utils';

export const App = () => {
  const [theme, toggleTheme] = useDarkTheme();

  // Selected country
  const [selectedCountry, setSelectedCountry] = useState(initialState);

  // Svg dimensions
  const [globeWidth, globeHeight] = useGlobeSize();
  const [rotation, setRotation] = useState(initialState.rotation);

  const handleCountryClick = ({ target: { id } }) => {
    const clickedCountry = getCountryById(id);

    setSelectedCountry(clickedCountry);
    setRotation(clickedCountry.rotation);
  }

  const handleCenterRotation = () => {
    setRotation(selectedCountry.rotation);
  }

  const handleSetRandomCountry = () => {
    const newCountry = getRandomCountry();

    console.log(newCountry);

    setSelectedCountry(newCountry);
    setRotation(newCountry.rotation);
  }

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
              rotation={rotation}
              width={globeWidth}
              height={globeHeight}
              selectedCountry={selectedCountry}
              onCountryClick={handleCountryClick}
              onNineKeyDown={handleCenterRotation}
              onZeroKeyDown={handleSetRandomCountry}
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


/* 
// KEYBOARD EVENT HANDLERS
    
*/