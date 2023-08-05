import { FC } from 'react';

import { usePlayerSelector } from '@entities/player';
import { TrackItem as Track } from '@entities/track';

import { ITrack } from '@shared/types';

import { TrackActionRow } from './components';

interface ITrackItemProps {
  track: ITrack;
  isActive: boolean;
  onClick: () => void;
}
export const TrackItem: FC<ITrackItemProps> = ({ track, isActive, onClick }) => {
  const player = usePlayerSelector();

  return (
    <Track
      key={track._id}
      track={track}
      onClick={onClick}
      playerState={isActive ? player : null}
      ActionsSlot={(track) => (
        <TrackActionRow
          isActive={isActive}
          // isExistInUserMusic={user?.tracks.some(i => i === track._id)}
          isExistInUserMusic={true}
        />
      )}
    />
  );
};
