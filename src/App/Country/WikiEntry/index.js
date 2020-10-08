import React, { useEffect } from 'react';

import { Typography } from '@material-ui/core';
import { LoadingSpinner } from '../../LoadingSpinner';
import { limitCharacters } from './utils';
import { useWikiApi } from './useWikiApi';
import { ErrorBox } from '../../ErrorBox';

export const WikiEntry = ({ term }) => {
  const [{ data, isLoading, isError }, setQuery] = useWikiApi();
  useEffect(() => setQuery(term), [term, setQuery]);

  return (
    <div className="WikiEntry">
      {isError && <ErrorBox when="fetching paragraph about the country" />}
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

