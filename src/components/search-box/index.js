import React, { useState } from 'react';
import { Paper, TextField } from '@material-ui/core';

import { Autocomplete } from '@material-ui/lab';
import { countries } from '../../utils/countries';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, shape }) => ({
  root: {
    position: 'absolute',
    left: spacing(2),
    top: spacing(2),
    display: 'flex',
    alignItems: 'center',
    width: 250,
  },
  input: {
    borderRadius: 0,
    borderBottomRightRadius: shape.borderRadius,
  },
  inputInput: {
    padding: spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${spacing(4)}px)`,
    width: '100%',
  },
}));

export const CountrySelect = ({ onCountrySelect }) => {
  const classes = useStyles();

  const [value, setValue] = useState(countries[0]);
  const handleValueChange = (event, newValue) => {
    setValue(newValue);
    if (newValue) onCountrySelect(newValue);
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
