import React, { useEffect, useRef, memo, useMemo } from 'react';
import { geoPath, geoOrthographic, select, interpolate } from 'd3';
import { useTheme } from '@material-ui/core';
import { useStyles } from './globe-styles';
import { useGeoJsonData, useWindowWidth } from './hooks';
import { dragBehaviour, zoomBehaviour, rotateProjection } from './utils';
import { LoadingSpinner } from '../LoadingSpinner';
import { Tooltip, getTooltipHandlers } from './Tooltip';
// import { ZoomButtons } from '../ZoomButtons';
import { SearchBox } from '../Widgets';

export const Globe = memo(
  ({
    defaultSize = 600,
    sensitivity = 75,
    selectedCountry,
    onSelectedCountryChange,
  }) => {
    const classes = useStyles();

    const { breakpoints, spacing } = useTheme();
    const windowWidth = useWindowWidth();
    const padding = spacing(2) * 2;

    // Compute size of the globe svg
    const size =
      windowWidth > breakpoints.values.sm + padding
        ? defaultSize
        : windowWidth - padding;
    const width = size,
      height = size;

    // Refs
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
      if (!data) return;

      // Selectors
      const svg = select(svgRef.current);
      const tooltip = select(tooltipRef.current);
      const circle = svg.select('circle');
      const countries = svg.selectAll(`path`);

      // Apply zoom and drag
      svg
        // Drag
        .call(
          dragBehaviour({
            selection: countries,
            path,
            projection,
            sensitivity,
          })
        )
        // Zoom
        .call(
          zoomBehaviour({
            selection: countries,
            path,
            projection,
            circle,
            initialScale,
          })
        );

      // Click event handler
      const handleClick = (e, d) => {
        // rotateProjection({
        //   selection: countries,
        //   path,
        //   projection,
        //   target: d,
        // });

        onSelectedCountryChange(d.id);
      };

      // Mouseover, mouseout event handlers
      const { handleMouseover, handleMouseout } = getTooltipHandlers(tooltip);

      // Update countries
      countries
        .data(data.features)
        .join('path')
        .attr('d', path)
        .on('click', handleClick)
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);
    }, [
      data,
      path,
      projection,
      initialScale,
      sensitivity,
      onSelectedCountryChange,
      classes,
    ]);


    useEffect(() => {
      const svg = select(svgRef.current);
      const countries = svg.selectAll(`path`);
      
      const feature = data.features.find(f => f.id === selectedCountry.code);

      rotateProjection({
        selection: countries,
        path,
        projection,
        target: feature,
      });

    }, [data, projection, path, selectedCountry]);

    if (isLoading) return <LoadingSpinner />;

    return (
      <div className={classes.container}>
        <svg ref={svgRef} className={classes.svg} width={width} height={height}>
          <circle
            className={classes.circle}
            cx={width / 2}
            cy={height / 2}
            r={250}
          />
          <g>
            {data.features.map(({ id }) => (
              <path
                key={id}
                id={id}
                className={`${classes.country} ${
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
