import React from 'react';
import './style.scss';

import { Details } from './Details';
import { Photos } from './Photos';
import { WikiEntry } from './WikiEntry';
import { Title } from './Title';

export const Country = ({ countryProps: { name, alphaCode } }) => {
  return (
    <div className="Country">
      <div className="Info-box">
        <Title text={name} />
        <Details alphaCode={alphaCode} />
        <WikiEntry term={name} />
      </div>      
      <Photos terms={[name, 'travel']} columns={3} />
    </div>
  );
};
