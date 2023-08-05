import { Box, Grid } from '@mui/material';
import React, { FC } from 'react';

import { PlaylistTrack } from '@entities/playlist-modal';

import { PltTrack } from '../PltTrack';

interface IPlaylistMusicControlProps {
  tracks: PlaylistTrack[];
}

export const PlaylistMusicControl: FC<IPlaylistMusicControlProps> = ({ tracks }) => {
  return (
    <Box className='playlist-modal__control'>
      <Grid container flexDirection='column'>
        {tracks.map((track) => {
          return <PltTrack key={track.track._id} track={track} />;
        })}
      </Grid>
    </Box>
  );
};
