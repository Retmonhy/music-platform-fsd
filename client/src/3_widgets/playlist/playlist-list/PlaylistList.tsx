import { Grid } from '@mui/material';
import { FC } from 'react';

import { IPlaylist } from '@shared/types';

import { PlaylistItem } from '../playlist-item';

interface IPlaylistListProps {
  playlists: IPlaylist[];
}

export const PlaylistList: FC<IPlaylistListProps> = ({ playlists }) => {
  return (
    <Grid container flexWrap='wrap'>
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} item={playlist} />
      ))}
    </Grid>
  );
};
