import { Box } from '@mui/material';
import React, { FC, createContext, useCallback } from 'react';

import { usePlayerActions, usePlayerControl } from '@entities/player';
import { PlaylistModalMode, PlaylistModalUtils, usePlaylistModalActions } from '@entities/playlist-modal';

import { TitleAndDescription } from '@shared/components';
import { useAppDispatch } from '@shared/hooks';
import { IPlaylist } from '@shared/types';

import { usePlaylistModal } from '../playlist-modal';
import { PlaylistImage } from './components';

interface IPlaylistItemProps {
  item: IPlaylist;
}

export const PlaylistContext = createContext<IPlaylist | null>(null);

export const PlaylistItem: FC<IPlaylistItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const _playlistActions = usePlaylistModalActions();
  const { open } = usePlaylistModal();
  const navigateToPlaylist = () => {};
  const editPlaylist = () => {
    dispatch(_playlistActions.loadState(item)).then(() => {
      open(PlaylistModalMode.Edit);
    });
  };
  const _playerActions = usePlayerActions();
  const { playControl } = usePlayerControl();
  const playPlaylist = useCallback(() => {
    const playlistTracks = PlaylistModalUtils.LoadPlaylistModalState(item.id);
    playlistTracks.then((result) => {
      const { data: tracks } = result;
      if (tracks.length > 0) {
        dispatch(_playerActions.setCurrentPlaylist({ tracks, currentTrack: tracks[0] }));
        dispatch(_playerActions.setActive(tracks[0]));
        dispatch(playControl);
      }
    });
  }, [item.id]);
  return (
    <PlaylistContext.Provider value={item}>
      <Box data-id={item.id} className='playlist'>
        <Box className='playlist__container'>
          <Box className='image'>
            <PlaylistImage
              className='image'
              source={item.cover}
              alt={`Обложка плейлиста ${item.name}`}
              handlers={{
                onEdit: editPlaylist,
                onPlay: playPlaylist,
              }}
            />
          </Box>
          <TitleAndDescription title={item.name} description={item.owner.fullname} titleClick={navigateToPlaylist} />
        </Box>
      </Box>
    </PlaylistContext.Provider>
  );
};
