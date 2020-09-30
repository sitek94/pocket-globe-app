import { Typography } from '@material-ui/core';
import React, { useState } from 'react';

import { Country } from './Country';
import { Globe } from './Globe';

import { Navbar } from './Navbar';
import { Footer } from './Footer';

const Layout = ({ navbar, leftColumn, rightColumn }) => (
  <div className="Layout">
    {navbar}
    <div className="left-column">{leftColumn}</div>
    <div className="right-column">{rightColumn}</div>
  </div>
);


export const App = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Poland',
    alphaCode: 'POL',
  });

  return (
    <Layout
      navbar={<Navbar theme="light" title={selectedCountry.name} />}
      leftColumn={
        <>
          <Globe onCountryClick={setSelectedCountry} />
          <Footer />
        </>
      }
      rightColumn={<Country countryProps={selectedCountry} />}
    />
  );
};
