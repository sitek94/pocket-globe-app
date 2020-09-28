import React from 'react';
import './style.scss';

import { Details } from './Details';
import { Photos } from './Photos';
import { WikiEntry } from './WikiEntry';
import { ExpansionPanel } from '../ExpansionPanel';

export const Country = ({ countryProps: { name, alphaCode } }) => {
  return (
    <div className="Country">
      <h1>{name}</h1>
      <ExpansionPanel 
        summary="Details"
        details={<Details alphaCode={alphaCode} />}
        disableDetailsPadding
      />
      <ExpansionPanel 
        summary="Description"
        details={<WikiEntry term={name} />}
      />
      <Photos terms={[name, 'travel']} />
    </div>
  );
};
