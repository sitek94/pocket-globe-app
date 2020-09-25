import React from 'react';
import { geoPath, geoNaturalEarth1, geoGraticule } from 'd3';

// Latitude and longitude to pixel coordinates
const projection = geoNaturalEarth1();
// Generate lines from pixel coordinates
const pathGenerator = geoPath(projection);
// Geometry object representing all meridians and parallels
const graticule = geoGraticule();

export const Marks = ({ data: { countries, interiors } }) => (
  <g className="marks">
    <path className="sphere" d={pathGenerator({ type: 'Sphere' })} />
    <path className="graticules" d={pathGenerator(graticule())} />
    {countries.features.map((feature) => (
      <path
        className="country"
        key={feature.properties.name}
        d={pathGenerator(feature)}
      />
    ))}
    <path className="interiors"  d={pathGenerator(interiors)} />
  </g>
);
