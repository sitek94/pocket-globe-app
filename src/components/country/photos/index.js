import React, { useState, memo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

import { PhotoCard } from './PhotoCard';
import { LoadingSpinner } from '../../LoadingSpinner';
import { Modal } from '../../Modal';
import { PhotoViewer } from './PhotoViewer';
import { ErrorBox } from '../../ErrorBox';
import { useDataApi } from '../../../hooks/useDataApi';
import { initialState } from '../../../utils/initialState';
import { unsplashApi } from './utils';

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

  // Fetch photos from Unsplash
  const [{ data, isLoading, isError }, { setConfig }] = useDataApi({
    initialData: { results: [] },
    initialConfig: {
      params: {
        query: initialState.name,
      }
    },
    axiosInstance: unsplashApi,
  });
  useEffect(() => setConfig({
    params: {
      query: term
    }
  },), [term, setConfig]);

  // Open photo in a modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const handlePhotoClick = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const photos = data.results;

  return (
    <div className={classes.container}>
      {isError && <ErrorBox when="fetching photos" />}
      {isLoading ? (
        <LoadingSpinner height={300} />
      ) : (
        <>
          {photos.map((photo, i) => (
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
            <PhotoViewer photo={photos[currentIndex]} />
          </Modal>
        </>
      )}
    </div>
  );
});
