import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './search-box-styles';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const countries = ['Poland', 'United States', 'Germany'];

export const SearchBox = ({ onTermSubmit }) => {
  const classes = useStyles();

  // User input
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e, newInputValue) => {
    setInputValue(newInputValue);
  }

  // Selected value
  const [selectedValue, setSelectedValue] = useState(null);
  const handleSelectedValueChange = (e, newValue) => {
    e.preventDefault();

    setSelectedValue(newValue);
  };
  // Watch selected value and submit the term on change
  useEffect(() => {
    if (selectedValue) {
      onTermSubmit(selectedValue);
    }
  }, [selectedValue, onTermSubmit]);

  return (
    <Box
      bgcolor="text.secondary"
      color="background.paper"
      className={classes.box}
    >
      <form>
        <Autocomplete
          value={selectedValue}
          onChange={handleSelectedValueChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          options={countries}
          size="small"
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Search country"
              variant="filled"
            />
          )}
        />
      </form>
    </Box>
  );
};
