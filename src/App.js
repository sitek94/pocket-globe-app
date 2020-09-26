import { json } from 'd3';
import React, { useEffect } from 'react';
import { feature } from 'topojson';
import { Globe } from './Globe';

export const App = () => {
  useEffect (() => {
    json('https://gist.githubusercontent.com/sitek94/5dfcc1335322c06131436c59b1219f7c/raw/f8b72e0bc8c8440232dddee04256e4e324e6365b/countries-50m.json')
      .then(topology => {
        console.log(feature(topology, topology.objects.countries));
      });
  })

  return (
    <Globe />
  );
};
