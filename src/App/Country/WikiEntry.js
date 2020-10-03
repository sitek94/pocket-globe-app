import React, { useEffect } from 'react';

import { Typography } from '@material-ui/core';
import { LoadingSpinner } from '../LoadingSpinner';

import { useData } from '../useData';

const MAX_ENTRY_LENGTH = 480;

export const WikiEntry = ({ term }) => {
  const [{ data, isLoading }, { setUrl }] = useData();

  useEffect(() => {
    setUrl(`https://en.wikipedia.org/api/rest_v1/page/summary/${term}`);
  }, [term, setUrl]);

  if (isLoading || !data) return <LoadingSpinner />;

  // Keep removing one sentence from the entry until it is less than max length
  let entry = data.extract;
  while (entry.length >= MAX_ENTRY_LENGTH) {
    entry = entry.split('. ').slice(0, -1).join('. ') + '.';
  }

  return (
    <div className="WikiEntry">
      <Typography variont="body2" align="justify">
        {entry}
      </Typography>
    </div>
  );
};
