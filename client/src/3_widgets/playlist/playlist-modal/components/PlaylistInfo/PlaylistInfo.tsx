// libraries
import { Box, Grid } from '@mui/material';
import React, { FC } from 'react';
//hooks
import { Control } from 'react-hook-form';

import { IPlaylistData } from '@shared/types';

import { PlaylistForm } from '../PlaylistForm';
// components
import { Uploader } from '../Uploader';

interface IPlaylistInfoProps {
  control: Control<IPlaylistData>;
  onUpload: (file: File | null) => Promise<void>;
}

export const PlaylistInfo: FC<IPlaylistInfoProps> = ({ onUpload, control }) => {
  return (
    <Box padding='24px'>
      <Grid container direction='row' flexWrap='nowrap'>
        <Uploader onUpload={onUpload} />
        <PlaylistForm control={control} />
      </Grid>
    </Box>
  );
};
