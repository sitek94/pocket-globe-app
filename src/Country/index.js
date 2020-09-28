import React from 'react';
import { Details } from './Details';
import { Photos } from './Photos';
import { WikiEntry } from './WikiEntry';

export const Country = ({ countryProps: { name, alphaCode } }) => {
  return (
    <div className="Country">
      <h1>{name}</h1>
      <Details alphaCode={alphaCode} />
      <WikiEntry term={name} />
      <Photos terms={[name, 'travel']} />
    </div>
  )
}