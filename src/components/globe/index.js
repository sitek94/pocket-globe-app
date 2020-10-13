import React, {
  useEffect,
  useRef,
  memo,
  useMemo,
  useState,
} from 'react';
import { geoPath, geoOrthographic, select } from 'd3';
import { useStyles } from './globe-styles';
import { useGeoJsonData } from './hooks';
import {
  dragBehaviour,
  scrollBehaviour,
  rotateProjectionTo,
} from './utils';
import { LoadingSpinner } from '../LoadingSpinner';
import { Tooltip, getTooltipHandlers } from './Tooltip';
import { getCountryById, getRandomCountry } from '../../utils';
import { ZoomButtons, Buttons } from './Buttons';
import { INITIAL_ROTATION, INITIAL_SCALE, ZOOM_IN_VALUE, ZOOM_OUT_VALUE } from './utils/projection-defaults';
import { throttledRotateProjectionBy } from './utils/rotate-projection-by';
import { throttledZoomProjectionBy } from './utils/handleZoomClick';

export const Globe = memo(
  ({
    width = 600,
    height = 600,
    sensitivity = 75,
    selectedCountry,
    setSelectedCountry,
  }) => {
    const classes = useStyles();
    const [update, setUpdate] = useState(false);

    // Refs
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const buttonsRef = useRef(null);
    const zoomButtonsRef = useRef(null);

    // Projection
    // useMemo is important here because we want to create a projection only once
    const projection = useMemo(
      () =>
        geoOrthographic()
          .scale(INITIAL_SCALE)
          .center([0, 0])
          .rotate(INITIAL_ROTATION)
          .translate([width / 2, height / 2]),
      [height, width]
    );
    // Initial scale
    const initialScale = projection.scale();

    // Path generator
    const path = geoPath().projection(projection);

    // Get GeoJson data
    const [{ data, isLoading }] = useGeoJsonData();

    

    // Draw the globe
    useEffect(() => {
      if (!data.features.length) return;

      // Selectors
      const svg = select(svgRef.current);
      const tooltip = select(tooltipRef.current);
      const circle = svg.select('circle');
      const countryPaths = svg.selectAll(`path`);
      const buttons = select(buttonsRef.current);
      const zoomButtons = select(zoomButtonsRef.current);

      // Apply scroll and drag behaviour
   /*    svg
        // Drag
        .call(
          dragBehaviour({
            selection: countryPaths,
            path,
            projection,
            sensitivity,
          })
        )
        // Scroll
        .call(
          scrollBehaviour({
            selection: countryPaths,
            path,
            projection,
            circle,
            initialScale,
          })
        ); */

      // Click event handler
      const handleCountryClick = (e, feature) => {
        setSelectedCountry(getCountryById(feature.id));
      };

      // Mouseover, mouseout event handlers
      const { handleMouseover, handleMouseout } = getTooltipHandlers(tooltip);

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
      countryPaths
        .data(data.features)
        .join('path')
        .attr('d', path)
        .on('click', handleCountryClick)
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);

      // Update circle
      circle.attr('r', projection.scale());
    }, [
      width,
      update,
      data,
      path,
      projection,
      initialScale,
      sensitivity,
      setSelectedCountry,
      classes,
    ]);

    // Watch selected country and update projection when it changes
    useEffect(() => {
      if (!data.features.length) return;

      const countryPaths = select(svgRef.current).selectAll(`path`);

      // Rotate projection
      rotateProjectionTo({
        selection: countryPaths,
        path,
        projection,
        rotation: selectedCountry.rotation,
      });
    }, [data, projection, path, selectedCountry]);

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
                className={`path ${classes.country} ${
                  selectedCountry.code === id && classes.selected
                }`}
              />
            ))}
          </g>
        </svg>
 {/*        <button
          style={{
            position: 'absolute',
            top: 100,
            right: 0,
          }}
          onClick={() => setSelectedCountry(getRandomCountry(selectedCountry))}
        >
          RANDOM COUNTRY
        </button>
        <button
          style={{
            position: 'absolute',
            top: 150,
            right: 0,
          }}
          onClick={() => setUpdate(!update)}
        >
          CENTER ON SELECTED
        </button> */}
 {/*        <Buttons ref={buttonsRef} />
        <ZoomButtons ref={zoomButtonsRef} />
        <Tooltip ref={tooltipRef} /> */}
      </div>
    );
  }
);


/* 
// KEYBOARD EVENT HANDLERS
    const handleKeyDown = ({ which, keyCode, shiftKey, ctrlKey }) => {
      const pressedKey = which || keyCode;
      const svg = select(svgRef.current);
      const countryPaths = svg.selectAll(`path`);
      
      const UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;
      const PLUS = 187, NUM_PLUS = 107, MINUS = 189, NUM_MINUS = 109;
      const L = 76, R = 82;

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
      } else if (shiftKey && ctrlKey && pressedKey === L) {
        rotateProjectionTo({
          selection: countryPaths,
          path,
          projection,
          rotation: selectedCountry.rotation,
        });

        // shift + ctrl + R - select random country
      } else if (shiftKey && ctrlKey && pressedKey === R) {
        setSelectedCountry(getRandomCountry());
      }
    };

*/