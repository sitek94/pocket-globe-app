import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
} from '@material-ui/core';

import { LoadingSpinner } from '../../LoadingSpinner';
import { ErrorBox } from '../../ErrorBox';
import { useStyles } from './details-styles';
import { useDataApi } from '../../../hooks/useDataApi';
import { initialState } from '../../../utils';
import {
  generateDetailsArray,
  notListedCountries,
  initialDetails,
} from './utils';
import { restCountriesApi } from '../apis';

const DetailItem = ({ label, value }) => (
  <TableRow hover>
    <TableCell component="th" variant="head">
      {label}
    </TableCell>
    <TableCell>
      {label === 'Area' ? (
        <>
          {value} km<sup>2</sup>
        </>
      ) : (
        value
      )}
    </TableCell>
  </TableRow>
);

export const Details = ({ alpha }) => {
  const classes = useStyles();

  const [{ data, isLoading, isError }, { setUrl: setQuery }] = useDataApi({
    axiosInstance: restCountriesApi,
    initialData: initialDetails,
    initialUrl: initialState.alpha, // Rest countries api searches by country alpha code
  });

  useEffect(() => {
    // If alpha code is among not listed countries, don't fetch the data
    if (notListedCountries[alpha]) return;

    setQuery(alpha);
  }, [alpha, setQuery]);

  // Some countries like Kosovo, Somaliland and N. Cyprus are not listed
  // by restcountries API, I hard coded these details in notListedCountries
  const source = notListedCountries[alpha] || data;
  const details = generateDetailsArray(source);

  return (
    <TableContainer className={classes.container}>
      {isError && <ErrorBox when="fetching country details" />}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table size="small">
          <TableBody>
            {details.map(({ label, value }) => (
              <DetailItem key={label} label={label} value={value} />
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
