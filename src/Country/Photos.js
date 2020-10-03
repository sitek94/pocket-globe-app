import React, { useEffect, memo } from 'react';

import { PhotoCard } from './PhotoCard';
import { LoadingSpinner } from '../LoadingSpinner';
import { useData } from '../useData';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    width: '100%',
    paddingTop: 10,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gridAutoRows: 10,
    gridGap: '0 10px',
  }
})

export const Photos = memo(({ term }) => {
  const classes = useStyles();
  
  const [{ data, isLoading }, { setUrl, setConfig }] = useData();

  useEffect(() => {
    setUrl('https://api.unsplash.com/search/photos/');
    setConfig({
      params: {
        query: term,
        per_page: 12
      },
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`
      }
    });
  }, [term, setUrl, setConfig]);

  if (!data || isLoading) return <LoadingSpinner height={300} />;
  
  const photos = data.results;

  return (
    <div className={classes.container}>
      {photos && photos.map((photo) => <PhotoCard key={photo.id} term={term} image={photo} />)}
    </div>
  );
});

/* 
*  With Unsplash Reference
*  const unsplashReferral = '?utm_source=your_app_name&utm_medium=referral';
<figure key={id}>
    <img src={urls.small} alt={description} />
    <figcaption>
      by
      <a href={links.html + unsplashReferral}>{name}</a> on{' '}
      <a href={`https://unsplash.com/${unsplashReferral}`}>Unsplash</a>
    </figcaption> }
</figure>
*/
