import React, { useEffect, useRef } from 'react';
import { geoPath, geoNaturalEarth1, geoGraticule, zoom, select } from 'd3';

import { useData } from './useData';

// Variables
const width = window.innerWidth;
const height = window.innerHeight;

// Latitude and longitude to pixel coordinates
const projection = geoNaturalEarth1();
// Generate lines from pixel coordinates
const pathGenerator = geoPath(projection);
// Geometry object representing all meridians and parallels
const graticule = geoGraticule();

export const App = () => {
  // Fetch data using custom hook
  const data = useData();
  const svgRef = useRef(null);

  

  useEffect(() => {
    if (!data) return;

    const svg = select(svgRef.current);
    const container = svg.select('.container');

    svg.call(zoom().on('zoom', event => {
      container.attr('transform', event.transform)
    }))

  })

  if (!data) return <pre>Loading...</pre>;
  const { countries, interiors } = data;
  return (
    <svg ref={svgRef} width={width} height={height}>
      <g className="container">
        <path className="sphere" d={pathGenerator({ type: 'Sphere' })} />
        <path className="graticules" d={pathGenerator(graticule())} />
        {countries.features.map((feature) => (
          <path
            className="country"
            key={feature.properties.name}
            d={pathGenerator(feature)}
          />
        ))}
        <path className="interiors" d={pathGenerator(interiors)} />
      </g>
    </svg>
  );
};
