import React, { useEffect, useRef, useMemo } from 'react';
import { geoPath, geoOrthographic, select, drag, zoom } from 'd3';
import clsx from 'clsx';

import { useStyles } from './globe-styles';
import { useGeoJsonData } from './useGeoJsonData';
import { LoadingSpinner } from '../LoadingSpinner';
import {
  throttledRotateProjectionBy,
  throttledZoomProjectionBy,
  rotateProjectionTo,
} from './globe-transformations';

export const Globe = 
  ({
    width = 600,
    height = 600,
    initialRotation = [0, -30],
    initialScale = 250,
    maxScale = 4594.79,
    minScale = 94.73,
    maxScroll = 20,
    minScroll = 0.3,
    zoomInValue = 1.1487,
    zoomOutValue = 0.87055,
    sensitivity = 75,
    rotationValue = 5,
    rotation,
    selectedCountry,
    onKeyDown,
    onCountryClick,
  }) => {
    const classes = useStyles();

    // Refs
    const svgRef = useRef(null);
    const containerRef = useRef(null);

    // Projection
    // useMemo is important here because we want to create a projection only once
    const projection = useMemo(
      () =>
        geoOrthographic()
          .scale(initialScale)
          .center([0, 0])
          .rotate(initialRotation)
          .translate([width / 2, height / 2]),
      [width, height, initialRotation, initialScale]
    );
    const path = geoPath().projection(projection);

    // Get GeoJson data
    const [{ data, isLoading }] = useGeoJsonData();

    // Initial draw of the globe
    useEffect(() => {
      if (!data.features.length) return;

      // Selectors
      const svg = select(svgRef.current);
      const globeCircle = svg.select('circle');
      const countryPaths = svg.selectAll(`path`);

      // Drag
      const dragBehaviour = drag().on('drag', (event) => {
        const rotate = projection.rotate();
        const k = sensitivity / projection.scale();

        // Update projection
        projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k]);
        path.projection(projection);
        countryPaths.attr('d', path);
      });

      // Zoom
      const zoomBehaviour = zoom().on('zoom', (event) => {
        const scrollValue = event.transform.k;

        // Reached max/min zoom
        if (scrollValue >= maxScroll) event.transform.k = maxScroll;
        if (scrollValue <= minScroll) event.transform.k = minScroll;
        else {
          // Update projection
          projection.scale(initialScale * event.transform.k);

          // Update path generator with new projection
          path.projection(projection);

          // Update selectors
          countryPaths.attr('d', path);
          globeCircle.attr('r', projection.scale());
        }
      });

      // Apply scroll and drag behaviour
      svg.call(dragBehaviour).call(zoomBehaviour);

      // Update country paths
      countryPaths.data(data.features).join('path').attr('d', path);
      globeCircle.attr('r', projection.scale());
    }, [
      width,
      data,
      path,
      projection,
      initialScale,
      minScroll,
      maxScroll,
      sensitivity,
    ]);

    // Rotation update
    useEffect(() => {
      const paths = select(svgRef.current).selectAll('path');

      rotateProjectionTo({
        selection: paths,
        projection,
        path,
        rotation,
      });
    }, [rotation, path, projection]);

    const handleKeyDown = ({ which, keyCode }) => {
      const pressedKey = which || keyCode;

      const svg = select(svgRef.current);
      const countryPaths = svg.selectAll(`path`);
      const globeCircle = svg.select('circle');

      const UP = 38,
            DOWN = 40,
            LEFT = 37,
            RIGHT = 39,
            PLUS = 187,
            NUM_PLUS = 107,
            MINUS = 189,
            NUM_MINUS = 109;

      // ARROW KEYS used to rotate the globe
      if ([UP, DOWN, LEFT, RIGHT].includes(pressedKey)) {
        let x = 0, y = 0, z = 0;
        
        if (pressedKey === 38) y = rotationValue;
        if (pressedKey === 40) y = -rotationValue;
        if (pressedKey === 37) x = -rotationValue;
        if (pressedKey === 39) x = rotationValue;

        throttledRotateProjectionBy({
          selection: countryPaths,
          path,
          projection,
          rotation: [x, y, z],
        });
      }

      // PLUS / MINUS used for zooming
      if ([PLUS, NUM_PLUS, MINUS, NUM_MINUS].includes(pressedKey)) {
        let zoomValue;

        if (pressedKey === PLUS || pressedKey === NUM_PLUS)
          zoomValue = zoomInValue;
        if (pressedKey === MINUS || pressedKey === NUM_MINUS)
          zoomValue = zoomOutValue;

        throttledZoomProjectionBy({
          selection: countryPaths,
          circle: globeCircle,
          path,
          projection,
          maxScale,
          minScale,
          zoomValue,
        });
      }

      // Parent event handler
      onKeyDown({ which, keyCode });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
      <div ref={containerRef} className={classes.container}>
        <svg
          tabIndex="0"
          ref={svgRef}
          className={classes.svg}
          width={width}
          height={height}
          onKeyDown={handleKeyDown}
        >
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
                onClick={onCountryClick}
                className={clsx({
                  [classes.country]: true,
                  [classes.selected]: selectedCountry.id === id
                })}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
;
