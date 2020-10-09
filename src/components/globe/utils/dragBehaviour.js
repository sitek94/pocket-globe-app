import { drag } from 'd3';

// Drag
export const dragBehaviour = ({ 
  selection,
  projection, 
  path, 
  sensitivity 
}) => drag()
  .on('drag', (event) => {
    const rotate = projection.rotate();
    const k = sensitivity / projection.scale();

    // Update projection
    projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k]);

    // Update path generator with new projection
    path.projection(projection);

    // Update selection
    selection.attr('d', path);
  });
