import React, { forwardRef } from 'react';

export const Buttons = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}
    >
      <button value="up">UP</button>
      <button value="down">DOWN</button>
      <button value="left">LEFT</button>
      <button value="right">RIGHT</button>
    </div>
  );
});

export const ZoomButtons = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 50,
        right: 0,
      }}
    >
      <button value="plus">PLUS</button>
      <button value="minus">MINUS</button>
    </div>
  );
});
export const RandomCountry = (props) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 100,
        right: 0,
      }}
    >
      <button value="plus">RANDOM COUNTRY</button>
    </div>
  );
};
