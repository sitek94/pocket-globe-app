import React, { useState, useEffect, memo } from 'react';
import { makeStyles } from '@material-ui/core';

import { PhotoCard } from './PhotoCard';
import { LoadingSpinner } from '../LoadingSpinner';
import { useData } from '../useData';
import { Modal } from '../Modal';
import { PhotoViewer } from './PhotoViewer';

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
  },
});

export const Photos = memo(({ term }) => {
  const classes = useStyles();

  const [{ data, isLoading }, { setUrl, setConfig }] = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const handlePhotoClick = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

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
  const clickedPhoto = photos[currentIndex];

  return (
    <div className={classes.container}>
      {photos &&
        photos.map((photo, i) => (
          <PhotoCard
            key={photo.id}
            onClick={() => handlePhotoClick(i)}
            photo={photo}
          />
        ))}
      <Modal 
        open={isModalOpen} 
        inZoom={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <PhotoViewer photo={clickedPhoto} />
      </Modal>
    </div>
  );
});
