// libraries
import { Box, Grid } from '@mui/material';
import React, { FC } from 'react';
//hooks
import { Control } from 'react-hook-form';

import { usePlaylistModalSelector } from '@entities/playlist-modal';

import { ControlledInput } from '@shared/components';
// components
import { Local } from '@shared/const';
import { IPlaylistData } from '@shared/types';

interface IPlaylistForm {
  control: Control<IPlaylistData>;
}
export const PlaylistForm: FC<IPlaylistForm> = ({ control }) => {
  const { info } = usePlaylistModalSelector();
  return (
    <Box width={'100%'}>
      <Grid container direction='column'>
        <ControlledInput
          controllerProps={{
            defaultValue: info ? info.name : '',
            control,
            rules: { required: 'Обязательное поле' },
            name: 'name',
          }}
          label={Local.Playlists.Modal.PlaylistName}
        />
        <ControlledInput
          controllerProps={{
            defaultValue: info ? info.description : '',
            control,
            rules: { required: 'Обязательное поле' },
            name: 'description',
          }}
          label={Local.Playlists.Modal.PlaylistDescription}
        />
      </Grid>
    </Box>
  );
};
