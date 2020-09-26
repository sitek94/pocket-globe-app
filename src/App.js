import React, { useEffect, useState } from 'react';
import { Country } from './Country';

import { Globe } from './Globe';

const Sidebar = ({ children }) => {
   return (
    <div className="Sidebar">
      {children}
    </div>
  )
}

const Layout = ({ leftColumn, rightColumn }) => (
  <div className="Layout">
    <div className="left-column">
      {leftColumn}
    </div>
    <div className="right-column">
      <Sidebar>
        {rightColumn}
      </Sidebar>
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
