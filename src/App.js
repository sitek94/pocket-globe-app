import React from 'react';
// impor {} from 'd3';

import { useData } from './useData';
import { Marks } from './Marks';

// Variables
const width = window.innerWidth;
const height = window.innerHeight;

export const App = () => {
  // Fetch data using custom hook
  const data = useData();

  if (!data) return <pre>Loading...</pre>;

  return (
    <svg width={width} height={height}>
      <Marks data={data} />
    </svg>
  );
};
