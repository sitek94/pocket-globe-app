import React from 'react';
import { useWikiEntry } from './useWikiEntry';

export const WikiEntry = ({ term }) => {

  const paragraph = useWikiEntry(term);

  if (!paragraph) return <div>Loading</div>

  return (
    <div>
      <p>{paragraph}</p>
    </div>
  )
}