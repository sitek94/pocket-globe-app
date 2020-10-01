import React, { memo } from 'react';

import { Details } from './Details';
import { Photos } from './Photos';
import { WikiEntry } from './WikiEntry';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  infoBox: {
    height: '200',
    display: 'grid',
    gridTemplateColumns: '5.5fr 4.5fr',
    columnGap: 10,
  }
})

export const Country = memo(({ countryProps: { name, alphaCode } }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.infoBox}>
        <WikiEntry term={name} />
        <Details alphaCode={alphaCode} />
      </div>
      <Photos terms={[name, 'travel']} columns={3} />
    </div>
  );
});
