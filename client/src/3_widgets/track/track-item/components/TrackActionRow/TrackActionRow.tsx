//libs
import { Grid } from '@material-ui/core';
import React, { FC } from 'react';

import { AddTrackToQueue, AddTrackToUser, DeleteTrackFromUser } from '@features/track';

import { ActionMenu } from '../ActionMenu';

interface ITrackActionRowProps {
  isActive: boolean;
  isExistInUserMusic: boolean;
}

export const TrackActionRow: FC<ITrackActionRowProps> = ({ isActive, isExistInUserMusic }) => {
  return (
    <Grid container direction='row' wrap='nowrap'>
      {!isActive && <AddTrackToQueue />}
      {isExistInUserMusic ? <DeleteTrackFromUser /> : <AddTrackToUser />}
      <ActionMenu />
    </Grid>
  );
};
