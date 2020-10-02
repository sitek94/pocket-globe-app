export const createTooltip = (selection) => {
  if (!selection) return;

  // Tooltip container
  const tooltip = selection
    .attr('id', 'tooltip')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  // Tooltip details
  const tooltipDetails = tooltip
    .select('p');

  // Mouse over handler
  const handleMouseover = (event, data) => {

  // Tooltip transition
  tooltip.transition()
    .duration(900)		
    .style("opacity", .9);

    console.log(data);
  const name = data.properties.name;

  // Construct details string
  const details = [
    name
  ].join('<br>');
  
  // Update details
  tooltipDetails.html(details);

  // Get constants to construct tooltip position
  const { pageX, pageY } = event;
  const { scrollLeft, offsetLeft } =  document.body;
  const yOffset = -70;
  const xOffset = scrollLeft + offsetLeft;

  // Update tooltip position and data-year
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