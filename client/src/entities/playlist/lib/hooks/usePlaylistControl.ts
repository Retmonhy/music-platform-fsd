import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '@shared/hooks';
import { IPlaylistData } from '@shared/types';

import { PlaylistMode } from '../../model';
import { ICreatePlaylistResponse, PlaylistService } from './../../api';
import { usePlaylistActions } from './usePlaylistActions';
import { usePlaylistSelector } from './usePlaylistSelector';

export const usePlaylist = () => {
  //hooks
  const { info, isVisible, selectedTracks, mode } = usePlaylistSelector();
  const { setCover, setVisible, setMode } = usePlaylistActions();

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
      if (mode === PlaylistMode.Create) {
        const { data } = await PlaylistService.createPlaylist(payloadData);
        result = data;
      }
      if (mode === PlaylistMode.Edit) {
        const { data } = await PlaylistService.updatePlaylist(info.id, payloadData);
        result = data;
      }
      if (result.isSuccess) {
        dispatch(setVisible(false));
        dispatch(_playlist.fetchUserPlaylists());
      }
    },
    [mode, selectedTracks, info && info.cover]
  );
  const onSave = () => {
    handleSubmit(saveHandler, onInvalid)();
  };

  const close = () => {
    dispatch(setVisible(false));
    dispatch(setCover(null));
    reset();
  };

  const open = (mode: PlaylistMode) => {
    dispatch(setMode(mode));
    dispatch(setVisible(true));
  };

  const onUpload = async (file: File | null) => {
    if (!file) {
      dispatch(setCover(null));
    }
    if (file) {
      const { data } = await FileService.upload(UploadActionType.PlaylistCover, file);
      dispatch(setCover(data.path));
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
