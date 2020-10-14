import React from 'react';

import { Details } from './details';
import { InfoBox } from './InfoBox';
import { Photos } from './photos';
import { WikiEntry } from './wiki-entry';

export const CountryAbout = ({ selectedCountry: { name, alpha } }) => {
  return (
    <div>
      <InfoBox>
        <WikiEntry term={name} />
        <Details alpha={alpha} />
      </InfoBox>
      <Photos term={name} />
    </div>
  );
};
