import { PlaylistAddRounded } from '@material-ui/icons';
import { MouseEvent } from 'react';

import { usePlayerActions } from '@entities/player';
import { useTrackContext } from '@entities/track';

import { PopoverButton } from '@shared/components';
import { Local } from '@shared/const';
import { useAppDispatch } from '@shared/hooks';

export const AddTrackToQueue = () => {
  const { track } = useTrackContext();
  const dispatch = useAppDispatch();
  const _playerActions = usePlayerActions();
  const handleAddToQueue = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(_playerActions.addTrackInQueue(track));
  };
  return (
    <PopoverButton text={Local.Tracks.PlayNext} onClick={handleAddToQueue}>
      <PlaylistAddRounded className='icon-button' />
    </PopoverButton>
  );
};
