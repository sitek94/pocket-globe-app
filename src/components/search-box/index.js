import React, { useState } from 'react';
import { Paper, InputBase, Slide } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search as SearchIcon } from '@material-ui/icons';

import { countries } from '../../utils/countries';
import { useStyles } from './search-box-styles';
import { alphabeticKeys } from '../../utils/keyCodes';

export const SearchBox = ({ show, onOptionSelect, ...other }) => {
  const classes = useStyles();

  /**
   * A value that is currently selected
   * 
   */
  const [value, setValue] = useState('');
  const handleValueChange = (event, newValue) => {
    setValue(newValue);

    if (newValue) onOptionSelect(event, newValue);
  };

  /**
   * Input value
   * 
   */
  const [inputValue, setInputValue] = useState('');
  const handleInputValueChange = (event, newValue) => {
    setInputValue(newValue)
  };

  /**
   * Prevents propagtion of alphabetic keyboard events that are used 
   * as shortcuts and when ctrl key is pressed.
   * 
   * This is to ensure that it is not possible to hide widgets or rotate
   * the globe when typing.
   * 
   */
  const handleKeyDown = (event) => {
    const { which, keyCode, ctrlKey } = event;
    const pressedKey = which || keyCode;

    if (ctrlKey || alphabeticKeys.includes(pressedKey)) {
      event.stopPropagation();
    }
  }

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
            onKeyDown={handleKeyDown}
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
