import React from 'react';
import { usePhotos } from './usePhotos';

/* 
  RECOMMENDED CONTRIBUTING PATTERN
  https://help.unsplash.com/en/articles/2511315-guideline-attribution
  Photo by <a href="https://unsplash.com/@anniespratt?utm_source=your_app_name&utm_medium=referral">Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>
*/

export const Photos = ({ terms }) => {
  const photos = usePhotos(terms);

  console.log(photos);
  return (
    <div>
      {photos && photos.map(photo => (
        <img 
          key={photo.id}
          alt={photo.alt}
          src={photo.urls.small}
        />
      ))}
    </div>
  )
}