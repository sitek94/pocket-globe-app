import React, { memo } from 'react';
import './style.scss';

import { Details } from './Details';
import { Photos } from './Photos';
import { WikiEntry } from './WikiEntry';

export const Country = memo(({ countryProps: { name, alphaCode } }) => {
  return (
    <div className="Country">
      <div className="Info-box">
        <WikiEntry term={name} />
        <Details alphaCode={alphaCode} />
      </div>
      <Photos terms={[name, 'travel']} columns={3} />
    </div>
  );
});
