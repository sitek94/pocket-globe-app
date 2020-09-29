import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

export const Title = ({ text }) => {
  return (
    <Box padding={2}>
      <Typography
        component="h1"
        variant="h3"
        style={text.length > 35 ? { fontSize: '1.8rem' } : null}
      >
        {text}
      </Typography>
    </Box>
  );
};
Title.propTypes = {
  children: PropTypes.string,
};
