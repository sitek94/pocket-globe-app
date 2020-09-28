import React from 'react';
import { Details } from './Details';
import { Photos } from './Photos';


export const Country = ({ countryProps: { name, alphaCode } }) => {
  return (
    <div className="Country">
      <h1>{name}</h1>
      <Details alphaCode={alphaCode} />
      <Photos terms={[name, 'travel']} />
    </div>
  )
}