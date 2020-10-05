import React, { memo } from 'react';

import { Details } from './Details';
import { InfoBox } from './InfoBox';
import { Photos } from './Photos';
import { WikiEntry } from './WikiEntry';

export const Country = memo(({ countryProps: { name, alphaCode } }) => {
  return (
    <div>
      <InfoBox>
        <WikiEntry term={name} />
        <Details alphaCode={alphaCode} />
      </InfoBox>
      <Photos term={name} columns={3} />
    </div>
  );
});
