import { Grid } from '@material-ui/core';
import { useCallback } from 'react';

import { usePlayerActions, usePlayerControl } from '@entities/player';

import { useAppDispatch, useTypedSelector } from '@shared/hooks';
import { ITrack } from '@shared/types';

import { TrackItem } from '../../track-item';

interface ITrackListProps {
  tracks: ITrack[];
}
export const TrackListInternal: React.FC<ITrackListProps> = ({ tracks }) => {
  //в строчке снизу при клике на плашку, чтобы запустить трек. Меняется стейт преера и перерисовывается компонент.
  //сделать запуск музыки как в вк
  const dispatch = useAppDispatch();
  const player = useTypedSelector((st) => st.player);
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

  return (
    <Grid container direction='column' className='relative'>
      {tracks.map((track) => {
        const isActive = player.active?._id === track._id;
        const onClick = () => {
          clickHandler(track, isActive);
        };
        return <TrackItem key={track._id} isActive={isActive} onClick={onClick} track={track} />;
      })}
    </Grid>
  );
};
