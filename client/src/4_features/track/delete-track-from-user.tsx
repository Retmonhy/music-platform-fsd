import { CloseRounded } from '@material-ui/icons';
import { MouseEvent } from 'react';

import { useTrackContext } from '@entities/track';

import { PopoverButton } from '@shared/components';
import { Local } from '@shared/const';

export const DeleteTrackFromUser = () => {
  const { track } = useTrackContext();
  const handleDelete = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // dispatch(_account.removeTrackFromMyMusic(track._id));
  };
  return (
    <PopoverButton text={Local.Tracks.DeleteFromCurrentPlaylist} onClick={handleDelete}>
      <CloseRounded className='icon-button' />
    </PopoverButton>
  );
};
