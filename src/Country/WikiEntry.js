import React, { useEffect } from 'react';

import { Typography } from '@material-ui/core';
import { LoadingSpinner } from '../LoadingSpinner';

import { useData } from '../useData';

const MAX_ENTRY_LENGTH = 480;
export const WikiEntry = ({ term }) => {
  
  // const [{ wikiEntry, isLoading, isError }, setTerm] = useWikiEntry();
  
  const [{ data, isLoading, isError }, { setUrl }] = useData();

  useEffect(() => {
    setUrl(`https://en.wikipedia.org/api/rest_v1/page/summary/${term}`);
  }, [term, setUrl])
  
  if (isLoading || !data) return <LoadingSpinner />;
  
  let entry = data.extract;
  while (entry.length >= MAX_ENTRY_LENGTH) {
    entry = entry.split('. ').slice(0, -1).join('. ') + '.';
  }

  return (
    <div className="WikiEntry">
      
      <Typography variont="body2">{entry}</Typography>
    
    </div>
  )
}