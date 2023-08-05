// libraries
import { Grid, Link } from '@mui/material';
import React, { FC, MouseEvent } from 'react';

import { PlaylistUtils, usePlaylistActions } from '@entities/playlist';
import { usePlaylistModalSelector } from '@entities/playlist-modal';

//hooks
// components
import { ButtonEl, Toast } from '@shared/components';
import { Local } from '@shared/const';
import { useAppDispatch } from '@shared/hooks';

import { usePlaylistModal } from '../../lib';

interface IPlaylistFooterProps {
  title: string;
  onClick: () => void;
}
export const PlaylistFooter: FC<IPlaylistFooterProps> = ({ title, onClick }) => {
  const { close } = usePlaylistModal();
  const dispatch = useAppDispatch();
  const { mode, info } = usePlaylistModalSelector();
  // const { user } = useTypedSelector((i) => i.account);
  const _playlist = usePlaylistActions();
  const isCanDeleted = true;
  // const isCanDeleted = mode === PlaylistModalMode.Edit && info.owner.id === user.id;
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick();
  };
  const handleDelete = async () => {
    PlaylistUtils.DeletePlaylistById(info.id)
      .then(({ data }) => {
        if (data.isSuccess) {
          dispatch(_playlist.fetchUserPlaylists());
          close();
        }
      })
      .catch((error) => new Toast({ type: 'error', message: 'Ошибка при удалении плейлиста' }));
  };
  return (
    <Grid container justifyContent={isCanDeleted ? 'space-between' : 'flex-end'} className='playlist-modal__footer' padding='12px 24px'>
      {isCanDeleted ? (
        <Link href='#' color={'rgb(120,120,120)'} underline='always' onClick={handleDelete}>
          {Local.Playlists.Modal.Delete}
        </Link>
      ) : null}
      <ButtonEl onClick={handleClick}>{title}</ButtonEl>
    </Grid>
  );
};
