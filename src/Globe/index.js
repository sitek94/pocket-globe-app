import React, { useEffect, useRef, memo } from 'react';
import { geoPath, geoOrthographic, select } from 'd3';
import './style.scss';

import { useData } from './useData';
import { dragBehaviour, zoomBehaviour } from './utils';
import { LoadingSpinner } from '../LoadingSpinner/';

export const Globe = memo(({ width = 600, height = 600, sensitivity = 75, onCountryClick }) => {

  // Refs
  const svgRef = useRef(null);
  const svgContentRef= useRef(null);
  
  // Projection
  const projection = geoOrthographic()
  .scale(250)
    .center([0, 0])
    .rotate([0,-30])
    .translate([width / 2, height / 2]);
  // Initial scale
  const initialScale = projection.scale();
    
  // Fetch TopoJSON data
  const [{ data, isLoading }] = useData({ resolution: 'low' });

  // Draw the globe
  useEffect(() => {
    if (!data) return;
    // Path generator
    const path = geoPath().projection(projection);

    // Selectors
    const svg = select(svgRef.current);
    const svgContent = select(svgContentRef.current);
    const circle = svg.select('circle');
    const countries = svgContent.selectAll('.country');

    // Apply zoom and drag
    svg
      // Drag
      .call(dragBehaviour({
        selection: countries,
        path,
        projection,
        sensitivity
      }))
      // Zoom
      .call(zoomBehaviour({
        selection: countries,
        path,
        projection,
        circle,
        initialScale
      }));

      // Update path of each country
      countries
        .data(data.features)
        .join('path')
        .attr('d', path)
        .on('click', (e, d) => onCountryClick(d.properties))

  }, [data, initialScale, projection, sensitivity, onCountryClick])

  if (!data || isLoading) return <LoadingSpinner />;

  return (
    <svg ref={svgRef} className="Globe" width={width} height={height}>
      <circle
        className="circle"
        cx={width / 2}
        cy={height / 2}
        r={initialScale}
      />
      <g className="content" ref={svgContentRef}>
        {data.features.map((feature) => (
          <path
            className="country"
            key={feature.properties.name}
            
          />
        ))}
      </g>
    </svg>
  )
})