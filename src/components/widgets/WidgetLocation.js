import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonBase } from './ButtonBase';
import {
  MyLocation as LocationIcon,
  HourglassEmpty as HourglassEmptyIcon,
  LocationDisabled as LocationDisabledIcon,
} from '@material-ui/icons';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import KEY_ from '../../utils/keyCodes';

export const WidgetLocation = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNotSupported, setIsNotSupported] = useState(false);
  const buttonRef = useRef();
  const handleLocationClick = useCallback(() => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      setIsNotSupported(true);
    } else {
      setIsNotSupported(false);

      // getLocation()
      navigator.geolocation.getCurrentPosition(
        position => {
          setIsLoading(false);
          setIsError(false);

          const latitude = Math.floor(position.coords.latitude);
          const longitude = Math.floor(position.coords.longitude);

          onClick([-longitude, -latitude]);
          buttonRef.current.blur();
        },
        error => {
          setIsLoading(false);
          setIsError(true);
        },
      );
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
    if (isError) return <LocationDisabledIcon />;
    else if (isLoading) return <HourglassEmptyIcon />;

    return <LocationIcon />;
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
        ref={buttonRef}
        id="widget-location"
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
