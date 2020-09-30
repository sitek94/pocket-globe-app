import React, { useEffect } from 'react';
import './style.scss';

import { PhotoCard } from './PhotoCard';
import { LoadingSpinner } from '../LoadingSpinner';
import { useData } from '../useData';


export const Photos = ({ terms }) => {
  // const photos = usePhotos(terms);

  const [{ data, isLoading, isError }, { setUrl, setConfig }] = useData();

  useEffect(() => {
    setUrl('https://api.unsplash.com/search/photos/');
    setConfig({
      params: {
        query: terms.join('-'),
        per_page: 12
      },
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`
      }
    })
  }, [terms, setUrl, setConfig])

  if (!data || isLoading) return <LoadingSpinner height={300} />;
  
  const photos = data.results;

  return (
    <div className="Photos">
      {photos && photos.map((photo) => <PhotoCard key={photo.id} term={terms} image={photo} />)}
    </div>
  );
};

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
