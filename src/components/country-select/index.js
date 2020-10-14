import React, { useState } from 'react';
import { Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { countries } from '../../utils/countries';
import { useStyles } from './search-box-styles';

export const CountrySelect = ({ onCountrySelect }) => {
  const classes = useStyles();

  const [value, setValue] = useState(countries[0]);
  const handleValueChange = (event, newValue) => {
    setValue(newValue);

    if (newValue) onCountrySelect(event, newValue);
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputValueChange = (event, newValue) => setInputValue(newValue);

  return (
    <Autocomplete
      classes={{
        root: classes.root,
        input: classes.input,
      }}
      value={value}
      onChange={handleValueChange}
      inputValue={inputValue}
      onInputChange={handleInputValueChange}
      options={countries}
      getOptionLabel={(option) => option.name}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          id="country-select"
          label="Choose a country"
          variant="filled"
          size="small"
          component={Paper}
          elevation={0}
          square
        />
      )}
    />
  );
};
