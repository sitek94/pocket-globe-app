import React from 'react';

import { ButtonBase } from './ButtonBase';
import { GiPerspectiveDiceSixFacesRandom as DiceIcon } from 'react-icons/gi';

export const WidgetRandomCountry = ({ onClick }) => {
  return (
    <ButtonBase
      id="widget-random-country"
      label="Show random country"
      onClick={onClick}
    >
      <DiceIcon fontSize={25} />
    </ButtonBase>
  );
};
