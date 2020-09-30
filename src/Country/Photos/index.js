import React from 'react';
import './style.scss';

import { PhotoCard } from './PhotoCard';
import { usePhotos } from './usePhotos';

export const Photos = ({ terms }) => {
  const photos = usePhotos(terms);

  if (!photos) return <div>Loading</div>;
  
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
