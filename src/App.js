import React, { useEffect, useRef } from 'react';
import { zoom, select } from 'd3';

import * as d3 from 'd3';
import { useData } from './useData';

// Variables
const width = 900;
const height = 500;

// Latitude and longitude to pixel coordinates
// const projection = geoNaturalEarth1();
// // Generate lines from pixel coordinates
// const pathGenerator = geoPath(projection);
// // Geometry object representing all meridians and parallels
// const graticule = geoGraticule();



let projection = d3.geoOrthographic()
  .scale(250)
  .center([0, 0])
  .rotate([0,-30])
  .translate([width / 2, height / 2]);

const sensitivity = 75;
const initialScale = projection.scale()
let path = d3.geoPath().projection(projection)




export const App = () => {
  // Fetch data using custom hook
  const data = useData();
  const svgRef = useRef(null);
  const gRef= useRef(null);

  

  useEffect(() => {
    if (!data) return;

    const svg = select(svgRef.current);
    
    const globe = svg.select('circle');

    const paths = svg.selectAll('path');

    svg
      .call(d3.drag().on('drag', event => {
        const rotate = projection.rotate()
        const k = sensitivity / projection.scale()
        projection.rotate([
          rotate[0] + event.dx * k,
          rotate[1] - event.dy * k
        ])
        path = d3.geoPath().projection(projection)
        paths.attr("d", path)
      }))
      .call(zoom().on('zoom', event => {
        if(event.transform.k > 0.3) {
          projection.scale(initialScale * event.transform.k)
          path = d3.geoPath().projection(projection)
          //svg.selectAll("path")
          paths.attr("d", path)
          globe.attr("r", projection.scale())
        }
        else {
          event.transform.k = 0.3
        }
      }))


     

  }, [data])

  useEffect(() => {
    if (!data) return;

    const g = select(gRef.current);
    g
    .selectAll('path')
    .data(data.features)
    .join('path')
    .attr('class', 'country')
    .attr('d', path)
  })

  if (!data) return <pre>Loading...</pre>;

  return (
    <svg ref={svgRef} width={width} height={height}>
      <circle
        fill="#EEE"
        stroke="#000"
        strokeWidth="0.2"
        cx={width/2}
        cy={height/2}
        r={initialScale}
      />
      <g className="container" ref={gRef}>
        
        {data.features.map((feature) => (
          <path
            className="country"
            key={feature.properties.name}
          />
        ))}
        
      </g>
    </svg>
  );
};
