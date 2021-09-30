import React, { useState, memo, useEffect } from 'react';
import { makeStyles, fade, Link } from '@material-ui/core';

import { LoadingSpinner } from '../../LoadingSpinner';
import { Modal } from '../../Modal';
import { PhotoViewer } from './PhotoViewer';
import { ErrorBox } from '../../ErrorBox';
import { useDataApi } from '../../../hooks';
import { initialState } from '../../../utils';
import { unsplashApi } from '../apis';
import Image from 'material-ui-image';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(
  ({
    spacing,
    palette,
    transitions: { create, duration },
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
      marginBottom: spacing(1),
      cursor: 'pointer',
      overflow: 'hidden',
      /* Focus replacement */
      outline: 0,
      border: '3px solid transparent',
      transition: create('border', duration.standard),
      '&:focus': {
        border: `3px solid ${fade(palette.primary.main, 0.9)}`,
      },
      /* Prevent borders breaks in columns  */
      WebkitColumnBreakInside: 'avoid',
      pageBreakInside: 'avoid',
      breakInside: 'avoid',
    },
    list: {
      columnCount: 3,
      columnGap: spacing(1),
      [only('md')]: { columnCount: 2 },
      [down('xs')]: { columnCount: 2 },
      [down(mobile)]: { columnCount: 1 },
    },
  }),
);

export const Photos = memo(({ term }) => {
  const classes = useStyles();

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
    [term, setConfig],
  );

  // Open photo in a modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const handlePhotoClick = index => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  // Something went wrong when fetching the photos
  if (isError) return <ErrorBox when="fetching photos" />;
  // There are no photos
  if (data.total_pages === 0) {
    return (
      <Alert severity="info" style={{ marginTop: 16 }}>
        <AlertTitle>No photos &#x2639;</AlertTitle>
        Unfortunally, we couldn't find any photos for this country. But you can
        explore thousands of other photos and images on{' '}
        <Link href="https://unsplash.com/" target="_blank" rel="noopener">
          Unpslash website
        </Link>
        .
      </Alert>
    );
  }
  const photos = data.results;

  return (
    <div className={classes.photos}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.list}>
          {photos.map(
            ({ id, alt_description, urls, width, height, color }, i) => (
              <div tabIndex="0" key={id} className={classes.card}>
                <Image
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
                    // marginBottom: spacing(1),
                    cursor: 'pointer',
                  }}
                  onClick={() => handlePhotoClick(i)}
                />
              </div>
            ),
          )}
        </div>
      )}
      <Modal show={isModalOpen} onClose={closeModal}>
        <PhotoViewer photo={photos[currentIndex]} />
      </Modal>
    </div>
  );
});
