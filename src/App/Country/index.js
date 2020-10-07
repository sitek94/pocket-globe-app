import React, { memo } from 'react';

import { Details } from './Details';
import { InfoBox } from './InfoBox';
import { Photos } from './Photos';
import { WikiEntry } from './WikiEntry';

export const Country = memo(({ selectedCountry: { name, alpha } }) => {
  return (
    <div>
      <InfoBox>
        <WikiEntry term={name} />
        <Details alpha={alpha} />
      </InfoBox>
      <Photos term={name} />
    </div>
  );
});
