import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import { usePlaylistActions, usePlaylistSelector } from '@entities/playlist';

import { Intersect, PlaylistListSkeleton } from '@shared/components';
import { useIntersect } from '@shared/hooks';

import { PlaylistList } from './PlaylistList';

const pageSize = 8;

export const PlaylistListWidget = () => {
  const { playlists, isAllPlaylistLoading } = usePlaylistSelector();
  const _playlistActions = usePlaylistActions();
  const { onIntersect: fetchPlaylists } = useIntersect(_playlistActions.fetchAllPlaylists, pageSize);
  const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
  useEffect(() => {
    fetchPlaylists().finally(() => {
      setIsFirstRequest(false);
    });
  }, []);
  return (
    <Grid container flexWrap='wrap'>
      {isFirstRequest ? (
        <PlaylistListSkeleton amount={10} />
      ) : (
        <Intersect id='playlist_intersection' isFetching={isAllPlaylistLoading} onIntersect={fetchPlaylists}>
          <PlaylistList playlists={playlists} />
        </Intersect>
      )}
    </Grid>
  );
};
