import React, { memo } from 'react';

import { Details } from './details';
import { InfoBox } from './InfoBox';
import { Photos } from './photos';
import { WikiEntry } from './wiki-entry';

export const Country = ({ selectedCountry: { name, alpha } }) => {
  return (
    <div>
      <InfoBox>
        <Details alpha={alpha} />
        <WikiEntry term={name} />
      </InfoBox>
      <Photos term={name} />
    </div>
  );
};
