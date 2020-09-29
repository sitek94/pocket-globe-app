import React from 'react';
import { Box, Typography } from '@material-ui/core';

export const Title = ({ children }) => (
  <Box padding={2}>
    <Typography variant="h3" component="h1">{children}</Typography>
  </Box>
)