import React, { useEffect } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';

import { LoadingSpinner } from '../../LoadingSpinner';
import { ErrorBox } from '../../ErrorBox';
import { useStyles } from './details-styles';
import { Detail } from './Detail';
import { useDataApi } from '../../../hooks/useDataApi';
import { initialState } from '../../../utils/initialState';
import {
  generateDetailsArray,
  notListedCountries,
  restCountriesApi,
  initialDetailsData,
} from './utils';

export const Details = ({ alpha }) => {
  const classes = useStyles();

  const [{ data, isLoading, isError }, { setUrl }] = useDataApi({
    axiosInstance: restCountriesApi,
    initialData: initialDetailsData,
    initialUrl: initialState.alpha,
  });

  useEffect(() => {
    // If alpha code is among not listed countries, don't fetch the data
    // if (notListedCountries[alpha]) return;
    setUrl(alpha);
  }, [alpha, setUrl]);

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
              <Detail key={label} label={label} value={value} />
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
