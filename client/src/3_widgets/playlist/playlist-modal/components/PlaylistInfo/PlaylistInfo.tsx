// libraries
import { Box } from '@mui/material';
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
    <Box padding={3}>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
        <Uploader onUpload={onUpload} />
        <PlaylistForm control={control} />
      </Box>
    </Box>
  );
};
