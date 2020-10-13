import React, { useEffect, useRef, memo, useMemo, useState } from 'react';
import { geoPath, geoOrthographic, select, drag, zoom } from 'd3';
import { useStyles } from './globe-styles';
import { useGeoJsonData } from './hooks';
import { dragBehaviour, scrollBehaviour, rotateProjectionTo } from './utils';
import { LoadingSpinner } from '../LoadingSpinner';
import { Tooltip, getTooltipHandlers } from './Tooltip';
import { ZoomButtons, Buttons } from './Buttons';
import {
  INITIAL_ROTATION,
  INITIAL_SCALE,
  ZOOM_IN_VALUE,
  ZOOM_OUT_VALUE,
} from './utils/projection-defaults';
import { throttledRotateProjectionBy } from './utils/rotate-projection-by';
import { throttledZoomProjectionBy } from './utils/handleZoomClick';

export const Globe = memo(
  ({
    width = 600,
    height = 600,
    sensitivity = 75,
    maxScroll = 20,
    minScroll = 0.3,
    selectedCountry,
    onCountryClick,
    setSelectedCountry,
    rotation,
    rotationDuration,
    onNineKeyDown,
    onZeroKeyDown,

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
          .scale(INITIAL_SCALE)
          .center([0, 0])
          .rotate(INITIAL_ROTATION)
          .translate([width / 2, height / 2]),
      [width, height]
    );
    const initialScale = projection.scale();
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
        // Update path generator with new projection
        path.projection(projection);
        // Update selection
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

      /* buttons.on(
        'click',
        handleRotationClick({
          selection: countryPaths,
          path,
          projection,
        })
      );

      zoomButtons.on(
        'click',
        handleZoomClick({
          selection: countryPaths,
          path,
          projection,
          circle,
        })
      ); */

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
      })
    }, [rotation, path, projection])

    const handleKeyDown = ({ which, keyCode, shiftKey, ctrlKey }) => {
      const pressedKey = which || keyCode;
      const svg = select(svgRef.current);
      const countryPaths = svg.selectAll(`path`);
      
      const UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;
      const PLUS = 187, NUM_PLUS = 107, MINUS = 189, NUM_MINUS = 109;
      const NINE = 59, ZERO = 48;

      // Arrow keys - rotating the globe
      if ([UP, DOWN, LEFT, RIGHT].includes(pressedKey)) {
        const rotationValue = 5;
        const rotation = { x: 0, y: 0, z: 0 };
          
        if (pressedKey === 38) rotation.y = rotationValue;
        if (pressedKey === 40) rotation.y = -rotationValue;
        if (pressedKey === 37) rotation.x = -rotationValue;
        if (pressedKey === 39) rotation.x = rotationValue;
        
        throttledRotateProjectionBy({
          selection: countryPaths,
          path,
          projection,
          ...rotation,
        });

        // Plus and minus - zooming in/out
      } else if ([PLUS, NUM_PLUS, MINUS, NUM_MINUS].includes(pressedKey)) {
        let zoomValue;
      
        if (pressedKey === PLUS || pressedKey === NUM_PLUS) zoomValue = ZOOM_IN_VALUE;
        if (pressedKey === MINUS || pressedKey === NUM_MINUS) zoomValue = ZOOM_OUT_VALUE;
      
        throttledZoomProjectionBy({
          selection: countryPaths,
          path,
          projection,
          zoomValue,
        });

        // shift + ctrl + L - center on selected country
      } else if (pressedKey === ZERO) {
        onZeroKeyDown();

        // shift + ctrl + R - select random country
      } else if (pressedKey === NINE) {
        onNineKeyDown();
      }
    };



    if (isLoading) return <LoadingSpinner />;

    return (
      <div ref={containerRef} className={classes.container}>
        <svg
          // onKeyDown={handleKeyDown}
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
                className={`${classes.country} ${
                  selectedCountry.id === id && classes.selected
                }`}
                onClick={onCountryClick}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
);


