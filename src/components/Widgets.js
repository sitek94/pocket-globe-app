import React, { useState } from 'react';

import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(
  ({ breakpoints, spacing, transitions, shape }) => ({
    search: {
      position: 'absolute',
      left: 0,
      top: 0,
      borderRadius: shape.borderRadius,
      width: '100%',
      [breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
    searchIcon: {
      padding: spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${spacing(4)}px)`,
      transition: transitions.create('width'),
      width: '100%',
      [breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

export const SearchBox = ({ onTermSubmit }) => {
  const classes = useStyles();

  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    onTermSubmit(value);
  }

  return (
    <Box
      bgcolor="text.secondary"
      color="background.paper"
      className={classes.search}
    >
      <form onSubmit={handleSubmit}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={value}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};
