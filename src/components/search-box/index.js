import React, { useState } from 'react';
import { Paper, InputBase, Slide } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search as SearchIcon } from '@material-ui/icons';

import { countries } from '../../utils/countries';
import { useStyles } from './search-box-styles';

export const SearchBox = ({ show, onOptionSelect, ...other }) => {
  const classes = useStyles();

  const [value, setValue] = useState('');
  const handleValueChange = (event, newValue) => {
    setValue(newValue);

    if (newValue) onOptionSelect(event, newValue);
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputValueChange = (event, newValue) => setInputValue(newValue);

  const autocomplete = (
    <Autocomplete
      size="small"
      value={value}
      inputValue={inputValue}
      onChange={handleValueChange}
      onInputChange={handleInputValueChange}
      options={countries}
      getOptionLabel={(option) => (option ? option.name : '')}
      classes={{
        root: classes.autocompleteRoot,
        paper: classes.autocompletePaper,
      }}
      {...other}
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

  return (
    <Slide in={show} direction="right" mountOnEnter unmountOnExit>
      {autocomplete}
    </Slide>
  );
};
