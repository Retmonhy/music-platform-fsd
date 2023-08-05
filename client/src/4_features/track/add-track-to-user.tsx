import { AddRounded } from '@material-ui/icons';
import { MouseEvent } from 'react';

import { useTrackContext } from '@entities/track';

import { PopoverButton } from '@shared/components';
import { Local } from '@shared/const';

export const AddTrackToUser = () => {
  const { track } = useTrackContext();
  const handleAdd = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // dispatch(_account.addTrackIntoMyMusic(track._id));
  };
  return (
    <PopoverButton text={Local.Tracks.AddToMyMusic} onClick={handleAdd}>
      <AddRounded className='icon-button' />
    </PopoverButton>
  );
};
