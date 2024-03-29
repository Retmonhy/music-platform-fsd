import { GetServerSidePropsContext } from 'next/types';
import React from 'react';

import { TrackListWidget } from '@widgets/track/TrackList';

import { SearchTracks } from '@features/track';

import { useTrackSelector } from '@entities/track';

import { H1 } from '@shared/components';
import { Local } from '@shared/const';
import { getIsSsrMobile } from '@shared/lib';

const TrackPage: React.FC = () => {
  const { error } = useTrackSelector();
  return (
    <>
      <H1>{error ? error : Local.Tracks.PageTitle}</H1>
      <SearchTracks />
      <TrackListWidget />
    </>
  );
};

export default TrackPage;

// export const getServerSideProps = wrapper.getServerSideProps(
// 	store => async () => {
// 		const dispatch = store.dispatch as NextThunkDispatch;
// 		const { _track } = useAction();
// 		dispatch(_track.fetchTracks());
// 		//добавлено чтобы не было ошибки TS
// 		return {
// 			props: {},
// 		};
// 	},
// );

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      isSsrMobile: getIsSsrMobile(context),
    },
  };
}
