import React, { useState } from 'react';

import { Country } from './Country';
import { Globe } from './Globe';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Layout = ({ leftColumn, rightColumn }) => (
  <div className="Layout">
    <div className="left-column">{leftColumn}</div>
    <div className="right-column">{rightColumn}</div>
  </div>
);

const Navbar = ({ title }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
)

export const App = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Poland',
    alphaCode: 'POL',
  });

  return (
    <Layout
      leftColumn={
        <>
          <Navbar title="Pocket Globe App" />
          <Globe onCountryClick={setSelectedCountry} />
          <footer>Footer</footer>
        </>
      }
      rightColumn={<Country countryProps={selectedCountry} />}
    />
  );
};
