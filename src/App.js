import React, { useState } from 'react';

import { Country } from './Country';
import { Globe } from './Globe';

const Layout = ({ leftColumn, rightColumn }) => (
  <div className="Layout">
    <div className="left-column">
      {leftColumn}
    </div>
    <div className="right-column">
      {rightColumn}
    </div>
  </div>
)

export const App = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Poland',
    alphaCode: 'POL'
  });

  return (
    <Layout
      leftColumn={<Globe onCountryClick={setSelectedCountry} />} 
      rightColumn={<Country countryProps={selectedCountry} />}
    />  
  );
};
