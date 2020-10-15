import React from 'react';
import clsx from 'clsx';
import { makeStyles, Button } from '@material-ui/core/';
import { MyLocation as LocationIcon } from '@material-ui/icons';
import {
  IoIosArrowUp as IconUp,
  IoIosArrowDown as IconDown,
  IoIosArrowBack as IconLeft,
  IoIosArrowForward as IconRight,
} from 'react-icons/io';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(({ widgets: { button } }) => ({
  widgetRotation: {
    display: 'grid',
    gridTemplateColumns: `repeat(3, auto)`,
    gridTemplateRows: `repeat(3, auto)`,
    gridTemplateAreas: `
      '. up .'
      'left center right'
      '. down .'`,
  },
  button: {
    ...button.base,
  },
  shadow: {
    boxShadow: button.boxShadow,
    '&:hover': {
      boxShadow: button.boxShadow,
    },
  },
  /* Remove shadow because it overlap neighbor buttons */
  disableShadow: {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  up: {
    gridArea: 'up',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  down: {
    gridArea: 'down',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  left: {
    gridArea: 'left',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  right: {
    gridArea: 'right',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  center: {
    gridArea: 'center',
    borderRadius: 0,
    boxShadow: 'none',
    border: button.base.border,
  },
  /* Used for two divs that are beneath the buttons to avoid overlapping */
  shadowHelper: {
    borderRadius: button.base.borderRadius,
    backgroundColor: 'transparent',
    boxShadow: button.boxShadow,
  },
  shadowHorizontal: {
    gridColumn: '1 / span 3',
    gridRow: '2 / span 1',
  },
  shadowVertical: {
    gridColumn: '2 / span 1',
    gridRow: '2 / span 3',
  },
}));

export const WidgetButton = ({
  className,
  disableShadow = false,
  shadow = false,
  ...other
}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      classes={{
        root: classes.button,
      }}
      className={clsx(className, {
        [classes.disableShadow]: disableShadow,
        [classes.shadow]: shadow,
      })}
      {...other}
    />
  );
};

const useZoomStyles = makeStyles(({ widgets: { button } }) => ({
  root: {
    borderRadius: button.base.borderRadius,
    boxShadow: button.boxShadow,
  },
  button: {
    ...button.base,
  },
}));

export const WidgetZoom = () => {
  const classes = useZoomStyles();

  return (
    <ButtonGroup
      className={classes.root}
      orientation="vertical"
      variant="contained"
      color="primary"
    >
      <WidgetButton shadow>
        <AddIcon />
      </WidgetButton>

      <WidgetButton shadow>
        <RemoveIcon />
      </WidgetButton>
    </ButtonGroup>
  );
};

export const WidgetRandom = () => {
  const classes = useStyles();

  return (
    <WidgetButton shadow>
      <GiPerspectiveDiceSixFacesRandom />
    </WidgetButton>
  );
};

export const WidgetRotation = ({ className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.widgetRotation)}>
      <WidgetButton disableShadow className={classes.up}>
        <IconUp />
      </WidgetButton>
      <WidgetButton disableShadow className={classes.down}>
        <IconDown />
      </WidgetButton>
      <WidgetButton disableShadow className={classes.center}>
        <LocationIcon fontSize="inherit" />
      </WidgetButton>
      <WidgetButton disableShadow className={classes.left}>
        <IconLeft />
      </WidgetButton>
      <WidgetButton disableShadow className={classes.right}>
        <IconRight />
      </WidgetButton>
      <div className={clsx(classes.shadowHorizontal, classes.shadowHelper)} />
      <div className={clsx(classes.shadowVertical, classes.shadowHelper)} />
    </div>
  );
};
