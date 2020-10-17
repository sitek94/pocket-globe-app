import React, { useReducer, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { Layout } from '../layout';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { Globe } from '../globe';
import { CountryAbout } from '../country-about';
import { SearchBox } from '../search-box';
import { useGlobeSize } from '../layout/hooks';
import { useTheme } from './useTheme';
import { getCountryById, getRandomCountry, initialState } from '../../utils';

export const App = () => {
  const [theme, toggleTheme] = useTheme();
  const [selectedCountry, setSelectedCountry] = useState(initialState);
  const [globeWidth, globeHeight] = useGlobeSize();
  const [rotation, setRotation] = useState(initialState.rotation);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // Updates selected country and rotation
  const updateSelectedCountry = (newCountry) => {
    setSelectedCountry(newCountry);
    setRotation(newCountry.rotation);
  };
  const setRandomCountry = () => {
    updateSelectedCountry(getRandomCountry());
  }

  const handleCountryClick = ({ target: { id } }) => {
    updateSelectedCountry(getCountryById(id));
  };

  const handleCountrySelect = (event, newCountry) => {
    if (newCountry) updateSelectedCountry(newCountry);
  };

  const handleKeyDown = ({ which, keyCode }) => {
    const pressedKey = which || keyCode;

    const L = 76,
      R = 82;
    // Select random country
    if (pressedKey === L) forceUpdate();
    // Center on selected country (force the globe to update)
    if (pressedKey === R) setRandomCountry();
  };

  const handleRandomCountryClick = () => {
    setRandomCountry();
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
            <SearchBox onOptionSelect={handleCountrySelect} />
            <Globe
              rotation={rotation}
              rotationBy={rotation}
              initialRotation={initialState.rotation}
              width={globeWidth}
              height={globeHeight}
              selectedCountry={selectedCountry}
              onKeyDown={handleKeyDown}
              onCountryClick={handleCountryClick}
              onRandomCountryClick={handleRandomCountryClick}
            />
          </>
        }
        rightColumn={<CountryAbout selectedCountry={selectedCountry} />}
        footer={<Footer />}
      />
    </ThemeProvider>
  );
};

/* 
// KEYBOARD EVENT HANDLERS
    
*/
