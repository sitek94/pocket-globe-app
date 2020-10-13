import { rotateProjectionBy } from './rotate-projection-by';

// Handle clicking on rotation buttons
export const handleRotationClick = params => (e) => {
  const { value } = e.target;

  const rotation = { x: 0, y: 0, z: 0 };
  const base = 20;

  if (value === 'up') rotation.y = base;
  if (value === 'down') rotation.y = -base;
  if (value === 'left') rotation.x = -base;
  if (value === 'right') rotation.x = base;

  rotateProjectionBy({
    ...params,
    ...rotation,
  });
};

