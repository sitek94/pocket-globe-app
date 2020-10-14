import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  tooltip: {
    position: 'absolute',
    padding: 5,
    borderRadius: 6,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0, .8)',
    textAlign: 'center',
   
    pointerEvents: 'none',
    transform: 'translate(-50%, 0)',
    zIndex: '1',
  },
});

/**
 * Tooltip component 
 * 
 * @param ref it needs ref so that a component that renders it can assign
 *            event handlers to the tooltip
 */ 
export const Tooltip = forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <div className={classes.tooltip} ref={ref} />
  )
});

/**
 * Get tooltip event handlers
 * 
 * @param selection when called with selection using d3.select() method 
 *                  it returns mouseover and mouseout event handlers
 */
export const getTooltipHandlers = (selection) => {
  if (!selection) return;

  // Tooltip container
  const tooltip = selection
    .style('opacity', 0);

  // Mouse over handler
  const handleMouseover = (event, { properties: { name } }) => {

  // Tooltip transition
  tooltip.transition()
    .duration(900)		
    .style("opacity", .9);

  // Update tooltip text
  tooltip.html(name);

  // Get constants to compute tooltip position
  const { pageX, pageY } = event;
  const { scrollLeft, offsetLeft } =  document.body;
  const yOffset = -70;
  const xOffset = scrollLeft + offsetLeft;

  // Update tooltip position
  tooltip
    .style("left", pageX + xOffset + "px")		
    .style("top", pageY + yOffset + "px");
  }

  // Mouse out handler
  const handleMouseout = () => {
    tooltip.transition()		
      .duration(500)		
      .style("opacity", 0);	
  }

  return { handleMouseover, handleMouseout };
}