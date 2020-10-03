import React, { useState, useEffect, memo } from 'react';

import { PhotoCard } from './PhotoCard';
import { LoadingSpinner } from '../LoadingSpinner';
import { useData } from '../useData';
import { makeStyles } from '@material-ui/core';

import Modal from '../Modal';

const unsplashReferral = '?utm_source=your_app_name&utm_medium=referral';

const useStyles = makeStyles({
  container: {
    width: '100%',
    paddingTop: 10,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gridAutoRows: 10,
    gridGap: '0 10px',
  },
  figure: {
    margin: '0 auto',
    padding: 25,
    backgroundColor: 'white',
    outline: 'none',
    height: '85vh',
  },
  img: {
    height: '100%',
  }
});

export const Photos = memo(({ term }) => {
  const classes = useStyles();

  const [{ data, isLoading }, { setUrl, setConfig }] = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const handlePhotoClick = index => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  }


  useEffect(() => {
    setUrl('https://api.unsplash.com/search/photos/');
    setConfig({
      params: {
        query: term,
        per_page: 12,
      },
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
      },
    });
  }, [term, setUrl, setConfig]);

  if (!data || isLoading) return <LoadingSpinner height={300} />;

  const photos = data.results;

  const renderClickedPhoto = () => {
    console.log(currentIndex);
    if (!data || isLoading) return <div>ops</div>
    const photo = photos[currentIndex];
    const { urls, description, links, user: { name } } = photo;
    
    return (
      <figure className={classes.figure}>
        <img className={classes.img} src={urls.regular} alt={description} />
        <figcaption>
          by
          <a href={links.html + unsplashReferral}>{name}</a> on{' '}
          <a href={`https://unsplash.com/${unsplashReferral}`}>Unsplash</a>
        </figcaption>
      </figure>
    )
  }
 
  return (
    <div className={classes.container}>
      {photos &&
        photos.map((photo, i) => (
          <PhotoCard
            key={photo.id}
            onClick={() => handlePhotoClick(i)}
            image={photo}
          />
        ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {renderClickedPhoto()}
      </Modal>
    </div>
  );
});

/* 
*  With Unsplash Reference
*  
<figure key={id}>
    <img src={urls.small} alt={description} />
    <figcaption>
      by
      <a href={links.html + unsplashReferral}>{name}</a> on{' '}
      <a href={`https://unsplash.com/${unsplashReferral}`}>Unsplash</a>
    </figcaption> }
</figure>
*/
