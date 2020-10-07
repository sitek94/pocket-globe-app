import React from 'react';

import { Typography } from '@material-ui/core';
import { LoadingSpinner } from '../../LoadingSpinner';
import { limitCharacters } from './utils';
import { useData } from '../../useData';
import { ErrorBox } from '../../ErrorBox';

export const WikiEntry = ({ term }) => {
  const [{ data, isLoading, isError }] = useData(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${term}`,
    {
      extract: '',
    }
  );

  return (
    <div className="WikiEntry">
      {isError && <ErrorBox when="fetching data from Wikipedia." />}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Typography variont="body2" align="justify">
          {limitCharacters(data.extract, 480)}
        </Typography>
      )}
    </div>
  );
};
//{limitCharacters(data.extract, 480)}
