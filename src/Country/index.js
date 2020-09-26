import React from 'react';
import { Details } from './Details';

export const Country = ({ countryProps: { name, alphaCode } }) => {
  
  return (
    <div className="Country">
      <h1>{name}</h1>
      <Details alphaCode={alphaCode} />
    </div>
  )
}