import React, { useEffect, useRef, memo, useState } from 'react';
import { geoPath, geoOrthographic, select } from 'd3';

import { useData } from './useData';
import { dragBehaviour, zoomBehaviour } from './utils';
import { LoadingSpinner } from '../LoadingSpinner/';
import { makeStyles } from '@material-ui/core';

import * as d3 from 'd3';

const useStyles = makeStyles(({ palette: { primary, background, getContrastText } }) => ({
  root: {
    display: 'block',
    margin: '0 auto',
  },
  country: {
    fill: background.default,
    '&:hover': {
      fill: primary.main
    }
  },
  circle: {
    fill: getContrastText(background.default)
  }
}))

export const Globe = memo(({ 
  width = 600, 
  height = 600, 
  sensitivity = 75, 
  onCountryClick,
}) => {
  
  const classes = useStyles();

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

  // Path generator
  const path = geoPath().projection(projection);

  const [coordinates, setCoordinates] = useState([0, -30]);
  useEffect(() => {
    const svgContent = select(svgContentRef.current);
    const countries = svgContent.selectAll(`.${classes.country}`)
    projection.rotate(coordinates);

    let newPath = d3.geoPath().projection(projection)

    countries
      .attr('d', newPath)

  }, [coordinates, projection, classes]);
    
  // Fetch TopoJSON data
  const [{ data, isLoading }] = useData({ resolution: 'low' });

  console.log('Data: ', data, 'isLoading: ', isLoading);

  // Draw the globe
  useEffect(() => {
    if (!data) return;

    // Selectors
    const svg = select(svgRef.current);
    const svgContent = select(svgContentRef.current);
    const circle = svg.select(`.${classes.circle}`);
    const countries = svgContent.selectAll(`.${classes.country}`);

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

      const handleCountryClick = (e, d) => {
        const centroid = path.centroid(d);
        const [x, y] = projection.invert(centroid);

        setCoordinates([-x, -y]);
        onCountryClick(d.properties);
      }

      // Update path of each country
      countries
        .data(data.features)
        .join('path')
        .attr('d', path)
        .on('click', handleCountryClick);

  }, [data, sensitivity, onCountryClick, classes, height, width, initialScale, projection, path])

  if (!data || isLoading) return <LoadingSpinner />;

  return (
    <svg ref={svgRef} className={classes.root} width={width} height={height}>
      <circle
        className={classes.circle}
        cx={width / 2}
        cy={height / 2}
        r={250}
      />
      <g className="content" ref={svgContentRef}>
        {data.features.map((feature) => (
          <path
            className={classes.country}
            key={feature.properties.name}
          />
        ))}
      </g>
    </svg>
  )
})



