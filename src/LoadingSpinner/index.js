import React from 'react';
import './style.scss';

import { CircularProgress } from '@material-ui/core';

export const LoadingSpinner = ({ height }) => (
  <div className="LoadingSpinner" style={height ? { height } : null}>
    <CircularProgress />
  </div>
)