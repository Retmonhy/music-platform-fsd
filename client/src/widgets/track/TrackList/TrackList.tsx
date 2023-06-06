import { Grid } from '@material-ui/core';
import { useCallback } from 'react';

import { usePlayerActions, usePlayerControl } from '@entities/player';
import { TrackItem } from '@entities/track';

import { useAppDispatch, useTypedSelector } from '@shared/hooks';
import { ITrack } from '@shared/types';

import { TrackActionRow } from './components';

interface ITrackListProps {
  tracks: ITrack[];
}
export const TrackList: React.FC<ITrackListProps> = ({ tracks }) => {
  //в строчке снизу при клике на плашку, чтобы запустить трек. Меняется стейт преера и перерисовывается компонент.
  //сделать запуск музыки как в вк
  const dispatch = useAppDispatch();
  const player = useTypedSelector((st) => st.player);
  const { isLoading } = useTypedSelector((i) => i.track);
  const _playerActions = usePlayerActions();
  const { playControl } = usePlayerControl();
  const clickHandler = useCallback(
    (track: ITrack, isActive: boolean) => {
      if (isActive) {
        playControl();
      }
      if (!isActive) {
        dispatch(_playerActions.setCurrentPlaylist({ tracks, currentTrack: track }));
        dispatch(_playerActions.setActive(track));
        playControl();
      }
    },
    [tracks, playControl]
  );

  const handleDeleteTrack = (track: ITrack) => {
    // dispatch(_account.removeTrackFromMyMusic(track._id));
  };
  const handleAddTrack = (track: ITrack) => {
    // dispatch(_account.addTrackIntoMyMusic(track._id));
  };
  const handleAddToQueue = (track: ITrack) => {
    dispatch(_playerActions.addTrackInQueue(track));
  };
  return (
    <Grid container direction='column' className='relative'>
      {tracks.map((track) => {
        const isActive = player.active?._id === track._id;
        const onClick = () => {
          clickHandler(track, isActive);
        };
        return isActive ? (
          <TrackItem
            key={track._id}
            track={track}
            onClick={onClick}
            playerState={player}
            ActionsSlot={(track) => (
              <TrackActionRow
                isActive={isActive}
                // isExistInUserMusic={user?.tracks.some(i => i === track._id)}
                isExistInUserMusic={true}
                handlers={{
                  addHandler: () => handleAddTrack(track),
                  deleteHandler: () => handleDeleteTrack(track),
                  queueAddHandler: () => handleAddToQueue(track),
                }}
              />
            )}
          />
        ) : (
          <TrackItem
            key={track._id}
            track={track}
            onClick={onClick}
            ActionsSlot={(track) => (
              <TrackActionRow
                isActive={isActive}
                // isExistInUserMusic={user?.tracks.some(i => i === track._id)}
                isExistInUserMusic={true}
                handlers={{
                  addHandler: () => handleAddTrack(track),
                  deleteHandler: () => handleDeleteTrack(track),
                  queueAddHandler: () => handleAddToQueue(track),
                }}
              />
            )}
          />
        );
      })}
    </Grid>
  );
};
