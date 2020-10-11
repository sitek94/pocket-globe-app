import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
import { useStyles } from './search-box-styles';
import { Autocomplete } from '@material-ui/lab';
import { countries } from '../../assets/countries';

export const CountrySelect = ({ onCountrySelect }) => {
  const classes = useStyles();

  const [value, setValue] = useState(countries[0]);
  const [inputValue, setInputValue] = useState('');

  return (
    <Box
      bgcolor="text.secondary"
      color="background.paper"
      className={classes.box}
    >
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue) onCountrySelect(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={countries}
        getOptionLabel={(option) => option.name}
        size="small"
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            size="small"
            variant="filled"
          />
        )}
      />
    </Box>
  );
};
