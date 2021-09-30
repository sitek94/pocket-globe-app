import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';

import { LoadingSpinner } from '../../LoadingSpinner';
import { limitCharacters } from './utils';
import { useDataApi } from '../../../hooks';
import { ErrorBox } from '../../ErrorBox';
import { initialState } from '../../../utils';
import { wikiApi } from '../apis';

export const WikiEntry = ({ term }) => {
  const [{ data, isLoading, isError }, { setUrl }] = useDataApi({
    initialData: { extract: '' },
    initialUrl: initialState.name,
    axiosInstance: wikiApi,
  });

  useEffect(() => {
    setUrl(term);
  }, [term, setUrl]);

  if (isError) return <ErrorBox when="fetching paragraph about the country" />;

  return (
    <div className="WikiEntry">
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
