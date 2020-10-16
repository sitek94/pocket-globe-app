import React, { useState } from 'react';
import { Paper, InputBase } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search as SearchIcon } from '@material-ui/icons';

import { countries } from '../../utils/countries';
import { useStyles } from './search-box-styles';

export const SearchBox = ({ onOptionSelect }) => {
  const classes = useStyles();

  const [value, setValue] = useState("");
  const handleValueChange = (event, newValue) => {
    setValue(newValue);

    if (newValue) onOptionSelect(event, newValue);
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputValueChange = (event, newValue) => setInputValue(newValue);

  return (
    <Autocomplete
      size="small"
      value={value}
      inputValue={inputValue}
      onChange={handleValueChange}
      onInputChange={handleInputValueChange}
      options={countries}
      getOptionLabel={(option) => option ? option.name : ""}
      classes={{
        root: classes.autocompleteRoot,
        paper: classes.autocompletePaper,
      }}
      renderInput={(params) => (
        <Paper
          ref={params.InputProps.ref}
          className={classes.inputWrapper}
          elevation={7}
        >
          <InputBase
            id="select-country"
            type="text"
            placeholder="Search for a country..."
            aria-label="Search for a country"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            {...params.inputProps}
          />
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
        </Paper>
      )}
    />
  );
};

