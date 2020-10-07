import React, { useState, memo } from 'react';
import { makeStyles } from '@material-ui/core';

import { PhotoCard } from './PhotoCard';
import { LoadingSpinner } from '../../LoadingSpinner';
import { Modal } from '../../Modal';
import { PhotoViewer } from './PhotoViewer';
import { useUnsplashData } from './useUnsplashData';
import { ErrorBox } from '../../ErrorBox';

const useStyles = makeStyles({
  container: {
    width: '100%',
    paddingTop: 10,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gridAutoRows: 10,
    gridGap: '0 10px',
  },
});

export const Photos = memo(({ term }) => {
  const classes = useStyles();

  const { data, isLoading, isError } = useUnsplashData(term);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const handlePhotoClick = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  if (!data || isLoading) return <LoadingSpinner height={300} />;

  const renderPhotos = photos => photos.map((photo, i) => (
    <PhotoCard
      key={photo.id}
      onClick={() => handlePhotoClick(i)}
      photo={photo}
    />
  ));

  return (
    <div className={classes.container}>
      {isError && <ErrorBox when="fetching photos from Unsplash" />}
      {isLoading ? (
        <LoadingSpinner height={300} />
      ) : (
        <>
          {renderPhotos(data.results)}
          <Modal
            open={isModalOpen}
            inZoom={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <PhotoViewer photo={data.results[currentIndex]} />
          </Modal>
        </>
      )}
    </div>
  );
});
