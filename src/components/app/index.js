import React, { useCallback, useEffect, useState } from 'react';
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
import KEY_ from '../../utils/keyCodes';
import { Shortcuts } from '../Shortcuts';

export const App = () => {
  const [theme, toggleTheme] = useTheme();
  const [globeWidth, globeHeight] = useGlobeSize();

  /**
   * Show/hide widgets
   */
  const [showWidgets, setShowWidgets] = useState(true);
  const toggleWidgetsVisibility = () => {
    setShowWidgets((prev) => !prev);
  }

  /**
   * Show/hide shortcuts
   */
  const [shortcuts, setShowShortcuts] = useState(false);
  const hideShortcuts = () => setShowShortcuts(false);
  const toggleShortcutsVisibility = () => {
    setRotation(null);
    setShowShortcuts(prev => !prev);
  }

  /**
   * Selected country and rotation
   *
   * When updating the country it is necessary to update the rotation
   * as well.
   *
   */
  const [selectedCountry, setSelectedCountry] = useState(initialState);
  const [rotation, setRotation] = useState(initialState.rotation);

  const updateSelectedCountry = useCallback((newCountry) => {
    setSelectedCountry(newCountry);
    setRotation(newCountry.rotation);
  }, []);

  const setRandomCountry = useCallback(() => {
    updateSelectedCountry(getRandomCountry());
  }, [updateSelectedCountry]);

  /**
   * Event handlers
   *
   */
  const handleCountryClick = ({ target: { id } }) => {
    updateSelectedCountry(getCountryById(id));
  };

  const handleCountrySelect = (event, newCountry) => {
    if (newCountry) updateSelectedCountry(newCountry);
  };

  const handleRandomCountryClick = () => {
    setRandomCountry();
  };

  const handleLocationClick = (countryId, rotation) => {
    setSelectedCountry(getCountryById(countryId));
    setRotation(rotation);
  };

  /**
   * Add key down event listener to the window object
   *
   */
  useEffect(() => {
    const handleKeyDown = ({ which, keyCode, ctrlKey }) => {
      const pressedKey = which || keyCode;

      if (pressedKey === KEY_.R) setRandomCountry();
      if (pressedKey === KEY_.W) toggleWidgetsVisibility();
      if (ctrlKey && pressedKey === KEY_.SLASH) toggleShortcutsVisibility();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setRandomCountry]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        navbar={
          <Navbar
            title={selectedCountry.name}
            onThemeIconClick={toggleTheme}
            onWidgetsIconClick={toggleWidgetsVisibility}
            onShortcutsIconClick={toggleShortcutsVisibility}
          />
        }
        leftColumn={
          <>
            <SearchBox
              show={showWidgets}
              onOptionSelect={handleCountrySelect}
            />
            <Globe
              rotation={rotation}
              rotationBy={rotation}
              initialRotation={initialState.rotation}
              width={globeWidth}
              height={globeHeight}
              selectedCountry={selectedCountry}
              onCountryClick={handleCountryClick}
              onLocationClick={handleLocationClick}
              onRandomCountryClick={handleRandomCountryClick}
              showWidgets={showWidgets}
            />
          </>
        }
        rightColumn={<CountryAbout selectedCountry={selectedCountry} />}
        footer={<Footer />}
      />
      <Shortcuts show={shortcuts} onClose={hideShortcuts} />
    </ThemeProvider>
  );
};
