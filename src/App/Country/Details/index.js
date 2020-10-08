import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
} from '@material-ui/core';
import { LoadingSpinner } from '../../LoadingSpinner';
import { notListedCountries } from './notListedCountries';
import { generateDetails } from './utils';
import { useStyles } from './useStyles';
import { ErrorBox } from '../../ErrorBox';
import { Detail } from './Detail';
import { useRestCountriesApi } from './useRestCountriesApi';

export const Details = ({ alpha }) => {
  const classes = useStyles();

  const [{ data, isLoading, isError }, setQuery] = useRestCountriesApi();

  useEffect(() => {
    // If alpha code is among not listed countries, don't fetch the data
    if (notListedCountries[alpha]) return;

    setQuery(alpha);
  }, [alpha, setQuery]);

  // Some countries like Kosovo, Somaliland and N. Cyprus are not listed
  // by restcountries API, I hard coded these details in notListedCountries
  const source = notListedCountries[alpha] || data;
  const details = generateDetails(source);

  return (
    <TableContainer className={classes.container}>
      {isError && <ErrorBox when="fetching country details" />}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table size="small">
          <TableBody>
            {details.map(({ label, value }) => (
              <Detail key={label} label={label} value={value} />
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
