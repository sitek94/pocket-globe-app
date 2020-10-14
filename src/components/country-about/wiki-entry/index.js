import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';

import { LoadingSpinner } from '../../LoadingSpinner';
import { limitCharacters } from './utils';
import { useDataApi } from '../../../hooks/useDataApi';
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
