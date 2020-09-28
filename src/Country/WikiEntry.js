import React from 'react';
import { useWikiEntry } from './hooks/useWikiEntry';
import { Typography } from '@material-ui/core';



export const WikiEntry = ({ term }) => {

  const paragraph = useWikiEntry(term);

  if (!paragraph) return <div>Loading</div>

  return (
    <div>
      
      <Typography variont="body2">{paragraph}</Typography>
    
    </div>
  )
}