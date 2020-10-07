import React, { useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';

import { LoadingSpinner } from '../../LoadingSpinner';
import { useData } from '../../useData';
import { notListedCountries } from './notListedCountries';
import { generateDetails } from './generateDetails';
import { useStyles } from './useStyles';

export const Details = ({ alpha }) => {
  const classes = useStyles();

  const [{ data, isLoading }, { setUrl }] = useData();

  useEffect(() => {
    // If alpha code is among not listed countries, don't fetch the data
    if (notListedCountries[alpha]) return;

    setUrl(`https://restcountries.eu/rest/v2/alpha/${alpha}`);
  }, [alpha, setUrl]);

  if (!data || isLoading) return <LoadingSpinner />;

  // Some countries like Kosovo, Somaliland and N. Cyprus are not listed
  // by restcountries API, I hard coded these details in notListedCountries
  const source = notListedCountries[alpha] || data;
  const details = generateDetails(source);

  return (
    <TableContainer className={classes.container}>
      <Table size="small">
        <TableBody>
          {details.map(({ label, value }) => (
            <TableRow key={label} hover>
              <TableCell component="th" variant="head">{label}</TableCell>
              <TableCell>{label === 'Area' ? <>{value} km<sup>2</sup></> : value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}