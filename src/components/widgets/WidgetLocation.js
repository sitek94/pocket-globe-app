import React, { useCallback, useEffect, useState } from 'react';
import { ButtonBase } from './ButtonBase';
import {
  MyLocation as LocationIcon,
  LocationDisabled as LocationDisabledIcon,
} from '@material-ui/icons';
import { CircularProgress, makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import KEY_ from '../../utils/keyCodes';

const useStyles = makeStyles({
  spinner: {
    color: '#fff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -10,
  },
});

const Spinner = () => {
  const classes = useStyles();
  return <CircularProgress className={classes.spinner} size={20} />;
};

export const WidgetLocation = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNotSupported, setIsNotSupported] = useState(false);

  const getLocation = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error);
        }
      );
    });

  /**
   * Handler triggered by clicking on a button or by pressing "L" key
   *
   */
  const handleLocationClick = useCallback(() => {
    if (!navigator.geolocation) {
      setIsNotSupported(true);
    } else {
      setIsNotSupported(false);
      setIsLoading(true);

      getLocation()
        .then(position => {
          setIsError(false);
          setIsLoading(false);

          const latitude = Math.floor(position.coords.latitude);
          const longitude = Math.floor(position.coords.longitude);

          onClick([-longitude, -latitude]);
        })
        .catch(error => {
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [onClick]);

  /**
   * Keydown event listener
   *
   */
  useEffect(() => {
    const handleKeydown = ({ which, keyCode }) => {
      const pressedKey = which || keyCode;

      if (pressedKey === KEY_.L) {
        handleLocationClick();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleLocationClick]);

  /**
   * Create label and render icon helpers
   *
   */
  const createLabel = () => {
    let label = 'Show your location';

    if (isError) label = 'Permission required';
    if (isNotSupported) label = 'Geolocation is not supported';
    if (isLoading) label = 'Loading...';

    return label;
  };

  const renderIcon = () => {
    let icon = <LocationIcon />;
    if (isError) icon = <LocationDisabledIcon />;
    else if (isLoading) icon = <Spinner />;

    return icon;
  };

  /**
   * Snackbar message
   *
   */
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (isError || isNotSupported) setOpen(true);
  }, [isError, isNotSupported]);

  const renderMessage = () => {
    if (isError) return 'The app needs permission to use your location.';
    if (isNotSupported) return 'Geolocation is not supported by your browser.';
  };

  return (
    <>
      <ButtonBase
        id="widget-selected-country"
        label={createLabel()}
        gridArea="center"
        onClick={handleLocationClick}
        disabled={isNotSupported}
        disableShadow
      >
        {renderIcon()}
      </ButtonBase>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        onClose={handleClose}
      >
        <Alert severity="warning" onClose={handleClose}>
          {renderMessage()}
        </Alert>
      </Snackbar>
    </>
  );
};
