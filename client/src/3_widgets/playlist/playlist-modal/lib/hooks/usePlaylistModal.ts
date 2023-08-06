import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { FileUtils, UploadActionType } from '@entities/file';
import { ICreatePlaylistResponse, PlaylistUtils, usePlaylistActions } from '@entities/playlist';
import { PlaylistModalMode, usePlaylistModalActions, usePlaylistModalSelector } from '@entities/playlist-modal';

import { Toast } from '@shared/components';
import { useAppDispatch } from '@shared/hooks';
import { IPlaylistData } from '@shared/types';

export const usePlaylistModal = () => {
  //hooks
  const { info, isVisible, selectedTracks, mode } = usePlaylistModalSelector();
  //actions от редакса по управлению плейлистами
  const _playlist = usePlaylistActions();
  //actions от редакса по управлению модалкой плейлиста
  const _pModal = usePlaylistModalActions();

  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<IPlaylistData>({
    mode: 'onSubmit',
  });

  //handlers
  const onInvalid = () => console.log('inValid');

  const saveHandler = useCallback(
    async (payload: IPlaylistData) => {
      const payloadData = {
        cover: info?.cover ?? null,
        tracks: selectedTracks.filter((i) => i.isChecked).map((i) => i.track._id),
        ...payload,
      };
      let result: ICreatePlaylistResponse | null = null;
      if (mode === PlaylistModalMode.Create) {
        PlaylistUtils.CreatePlaylist(payloadData)
          .then(({ data }) => (result = data))
          .catch((error) => {
            new Toast({ type: 'error', message: 'Не удалось создать плейлист' });
          });
      }
      if (mode === PlaylistModalMode.Edit) {
        PlaylistUtils.UpdatePlaylist(info.id, payloadData)
          .then(({ data }) => (result = data))
          .catch((error) => {
            new Toast({ type: 'error', message: 'Не удалось обновить плейлист' });
          });
      }
      if (result?.isSuccess) {
        dispatch(_pModal.setVisible(false));
        dispatch(_playlist.fetchUserPlaylists());
      }
    },
    [mode, selectedTracks, info && info.cover]
  );
  const onSave = () => {
    handleSubmit(saveHandler, onInvalid)();
  };

  const close = () => {
    dispatch(_pModal.setVisible(false));
    dispatch(_pModal.setCover(null));
    reset();
  };

  const open = (mode: PlaylistModalMode) => {
    dispatch(_pModal.setMode(mode));
    dispatch(_pModal.setVisible(true));
  };

  const onUpload = async (file: File | null) => {
    if (!file) {
      dispatch(_pModal.setCover(null));
    }
    if (file) {
      const { data } = await FileUtils.UploadFile(UploadActionType.PlaylistCover, file);
      dispatch(_pModal.setCover(data.path));
    }
  };

  return {
    isVisible,
    control,
    open,
    close,
    onUpload,
    onSave,
  };
};
