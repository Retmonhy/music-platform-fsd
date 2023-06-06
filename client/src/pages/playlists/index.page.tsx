import { Grid, Typography } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';

import { usePlaylistActions, usePlaylistSelector } from '@entities/playlist';

import { H1, Intersect, PlaylistListSkeleton } from '@shared/components';
import { Local } from '@shared/const';
import { useAppDispatch, useIntersect } from '@shared/hooks';
import { IPlaylist } from '@shared/types';

interface IPlaylistPageProps {}

const pageSize = 8;
const PlaylistPage: FC<IPlaylistPageProps> = () => {
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
    <>
      <H1>{Local.Playlists.PageTitle}</H1>
      {isFirstRequest ? (
        <PlaylistListSkeleton amount={10} />
      ) : (
        <Intersect id="playlist_intersection" isFetching={isAllPlaylistLoading} onIntersect={fetchPlaylists}>
          <PlaylistsPageList playlists={playlists} />
        </Intersect>
      )}
    </>
  );
};
export default PlaylistPage;

interface IPlaylistsPageListProps {
  playlists: IPlaylist[];
}

export const PlaylistsPageList: FC<IPlaylistsPageListProps> = ({ playlists }) => {
  const { close, isVisible, onSave, onUpload, control } = usePlaylistControl();
  return playlists.length === 0 ? (
    <Grid container justifyContent="center" alignItems="center">
      <Typography variant="h5" align="center">
        Список плейлистов пуст
      </Typography>
    </Grid>
  ) : (
    <>
      <PlaylistList playlists={playlists} />
      <PlaylistModal
        control={control}
        isVisible={isVisible}
        handlers={{
          onClose: close,
          onUpload,
          onSave,
        }}
      />
    </>
  );
};
