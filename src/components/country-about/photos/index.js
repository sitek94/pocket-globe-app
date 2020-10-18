import React, { useState, memo, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';

import { LoadingSpinner } from '../../LoadingSpinner';
import { Modal } from '../../Modal';
import { PhotoViewer } from './PhotoViewer';
import { ErrorBox } from '../../ErrorBox';
import { useDataApi } from '../../../hooks/useDataApi';
import { initialState } from '../../../utils';
import { unsplashApi } from '../apis';
import Image from 'material-ui-image';

const useStyles = makeStyles(
  ({
    spacing,
    breakpoints: {
      down,
      only,
      values: { mobile },
    },
  }) => ({
    photos: {
      margin: spacing(2, 0),
      height: '100%',
    },
    card: {
      display: 'block',
    },
    image: {},
    list: {
      columnCount: 3,
      columnGap: spacing(1),
      [only('md')]: { columnCount: 2 },
      [down('xs')]: { columnCount: 2 },
      [down(mobile)]: { columnCount: 1 },
    },
  })
);

export const Photos = memo(({ term }) => {
  const classes = useStyles();
  const { spacing } = useTheme();

  // Fetch photos from Unsplash
  const [{ data, isLoading, isError }, { setConfig }] = useDataApi({
    initialData: { results: [] },
    initialConfig: {
      params: {
        query: initialState.name,
      },
    },
    axiosInstance: unsplashApi,
  });
  useEffect(
    () =>
      setConfig({
        params: {
          query: term,
        },
      }),
    [term, setConfig]
  );

  // Open photo in a modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const handlePhotoClick = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  if (isError) return <ErrorBox when="fetching photos" />;
  const photos = data.results;

  return (
    <div className={classes.photos}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.list}>
          {photos.map(({ id, alt_description, urls, width, height, color }, i) => (
            <Image
              key={id}
              alt={alt_description}
              src={urls.small}
              color={color}
              aspectRatio={width / height}
              animationDuration={1500}
              disableSpinner
              style={{
                display: 'block',
                /* Important! Prevents images from breaking in columns */
                breakInside: 'avoid',
                marginBottom: spacing(1),
              }}
              onClick={() => handlePhotoClick(i)}
            />
          ))}
        </div>
      )}
      <Modal show={isModalOpen} onClose={closeModal}>
        <PhotoViewer photo={photos[currentIndex]} />
      </Modal>
    </div>
  );
});
