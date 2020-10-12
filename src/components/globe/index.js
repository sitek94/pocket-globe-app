import React, { useEffect, useRef, memo, useMemo } from 'react';
import { geoPath, geoOrthographic, select } from 'd3';
import { useStyles } from './globe-styles';
import { useGeoJsonData } from './hooks';
import { dragBehaviour, zoomBehaviour, rotateProjection } from './utils';
import { LoadingSpinner } from '../LoadingSpinner';
import { Tooltip, getTooltipHandlers } from './Tooltip';
import { countries } from '../../assets/countries';

export const Globe = memo(
  ({
    width = 600,
    height = 600,
    sensitivity = 75,
    selectedCountry,
    onCountryClick,
  }) => {
    const classes = useStyles();

    // Refs
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);

    // Projection
    // useMemo is important here because we want to create a projection only once
    const projection = useMemo(
      () =>
        geoOrthographic()
          .scale(250)
          .center([0, 0])
          .rotate([0, -30])
          .translate([width / 2, height / 2]),
      [height, width]
    );
    // Initial scale
    const initialScale = projection.scale();

    // Path generator
    const path = geoPath().projection(projection);

    // Fetch TopoJSON data
    const [{ data, isLoading }] = useGeoJsonData();

    // Draw the globe
    useEffect(() => {
      if (!data.features.length) return;

      // Selectors
      const svg = select(svgRef.current);
      const tooltip = select(tooltipRef.current);
      const circle = svg.select('circle');
      const countryPaths = svg.selectAll(`path`);

      // Apply zoom and drag
      svg
        // Drag
        .call(
          dragBehaviour({
            selection: countryPaths,
            path,
            projection,
            sensitivity,
          })
        )
        // Zoom
        .call(
          zoomBehaviour({
            selection: countryPaths,
            path,
            projection,
            circle,
            initialScale,
          })
        );

      // Click event handler
      const handleClick = (e, feature) => {
        const country = countries.find(country => country.id === feature.id);
        onCountryClick(country);
      };

      // Mouseover, mouseout event handlers
      const { handleMouseover, handleMouseout } = getTooltipHandlers(tooltip);

      // Update country paths
      countryPaths
        .data(data.features)
        .join('path')
        .attr('d', path)
        .on('click', handleClick)
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);

      // Update circle
      circle
        .attr('r', projection.scale());
    }, [
      width,
      data,
      path,
      projection,
      initialScale,
      sensitivity,
      onCountryClick,
      classes,
    ]);

    useEffect(() => {
      if (!data.features.length) return;

      const svg = select(svgRef.current);
      const countryPaths = svg.selectAll(`path`);

      // Find selected country feature
      const feature = data.features.find(
        (feature) => feature.id === selectedCountry.id
      );
      // Get its rotation
      const { rotation } = feature.properties;

      // Rotate projection
      rotateProjection({
        selection: countryPaths,
        path,
        projection,
        rotation,
      });
    }, [data, projection, path, selectedCountry]);

    if (isLoading) return <LoadingSpinner />;

    return (
      <div ref={containerRef} className={classes.container}>
        <svg ref={svgRef} className={classes.svg} width={width} height={height}>
          <circle
            className={classes.circle}
            cx={width / 2}
            cy={height / 2}
            r={initialScale}
          />
          <g>
            {data.features.map(({ id }) => (
              <path
                key={id}
                id={id}
                className={`path ${classes.country} ${
                  selectedCountry.code === id && classes.selected
                }`}
              />
            ))}
          </g>
        </svg>
        {/* <ZoomButtons
          onZoomInClick={() => console.log('zoom in')}
          onZoomOutClick={() => console.log('zoom out')}
        /> */}
        <Tooltip ref={tooltipRef} />
      </div>
    );
  }
);
