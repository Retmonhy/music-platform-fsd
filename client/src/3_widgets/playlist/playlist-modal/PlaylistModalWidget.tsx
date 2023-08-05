// libraries
import { Modal } from '@material-ui/core';
import { Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';

import { usePlaylistModalActions, usePlaylistModalSelector } from '@entities/playlist-modal';

import { Local } from '@shared/const';
import { useAppDispatch } from '@shared/hooks';

// components
import { PlaylistFooter, PlaylistHeader, PlaylistInfo, PlaylistMusicControl } from './components';
import { usePlaylistModal } from './lib';

interface IPlaylistModalProps {
  isVisible: boolean;
}

const PlaylistModalWidget: FC<IPlaylistModalProps> = ({ isVisible }) => {
  const _playlistModalActions = usePlaylistModal();
  const { selectedTracks } = usePlaylistModalSelector();
  const _playlist = usePlaylistModalActions();
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => dispatch(_playlist.resetModalState());
  }, []);
  return (
    <Modal open={isVisible} className='playlist-modal'>
      <Grid container direction='column' className='playlist-modal__grid'>
        <PlaylistHeader title={Local.Playlists.Modal.CreationTitle} onClose={_playlistModalActions.close} />
        <PlaylistInfo control={_playlistModalActions.control} onUpload={_playlistModalActions.onUpload} />
        <PlaylistMusicControl tracks={selectedTracks} />
        <PlaylistFooter title={Local.General.Save} onClick={_playlistModalActions.onSave} />
      </Grid>
    </Modal>
  );
};
export default PlaylistModalWidget;
export { PlaylistModalWidget };
