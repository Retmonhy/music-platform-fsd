import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { useTrackActions } from '@entities/track';

import { Intersect, TrackListSkeleton } from '@shared/components';
import { useIntersect, useTypedSelector } from '@shared/hooks';

import { TrackListInternal } from './components';

const pageSize = 10;

export const TrackListWidget = () => {
  //в строчке снизу при клике на плашку, чтобы запустить трек. Меняется стейт преера и перерисовывается компонент.
  //сделать запуск музыки как в вк
  const _trackActions = useTrackActions();
  const { tracks, searchedTracks, isLoading } = useTypedSelector((st) => st.track);
  const { onIntersect: fetchTracks } = useIntersect(_trackActions.fetchTracks, pageSize);
  const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
  useEffect(() => {
    fetchTracks().finally(() => {
      setIsFirstRequest(false);
    });
  }, []);

  return (
    <Grid container direction='column' className='relative'>
      {isFirstRequest ? (
        <TrackListSkeleton amount={10} />
      ) : searchedTracks && searchedTracks.length ? (
        <TrackListInternal tracks={searchedTracks} />
      ) : (
        <Intersect onIntersect={fetchTracks} id='track_intersection' isFetching={isLoading}>
          <TrackListInternal tracks={tracks} />
        </Intersect>
      )}
    </Grid>
  );
};
