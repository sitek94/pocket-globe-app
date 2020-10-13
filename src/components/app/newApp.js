import React, { useState, useRef, useMemo } from 'react';

import { Layout } from '../layout';
import { Country } from '../country';
import { Globe } from '../globe';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { CountrySelect } from '../search-box';
import { useGlobeSize } from '../layout/hooks/useColumnHeight';
import { useDarkTheme } from './hooks';
import { initialState } from '../../utils';
import { INITIAL_ROTATION, INITIAL_SCALE } from '../globe/utils/projection-defaults';
import { geoOrthographic, geoPath } from 'd3';




export const App = () => {
  const [theme, toggleTheme] = useDarkTheme();

  // Selected country
  const [selectedCountry, setSelectedCountry] = useState(initialState);

  // Svg dimensions
  const [globeWidth, globeHeight] = useGlobeSize();
    // Refs
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const buttonsRef = useRef(null);
    const zoomButtonsRef = useRef(null);

    // Projection
    // useMemo is important here because we want to create a projection only once
    const projection = useMemo(
      () =>
        geoOrthographic()
          .scale(INITIAL_SCALE)
          .center([0, 0])
          .rotate(INITIAL_ROTATION)
          .translate([globeWidth / 2, globeHeight / 2]),
      [globeWidth, globeHeight]
    );

    // Initial scale
    const initialScale = projection.scale();

    // Path generator
    const path = geoPath().projection(projection);



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
              projection
              pathGenerator
              
              width={globeWidth}
              height={globeHeight}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
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
