import { GetServerSidePropsContext } from "next/types";
import React, { useEffect, useState } from "react";

import { TrackList, useTrackActions } from "@entities/track";
import { Intersect } from "@shared/components";
import { H1, TrackListSkeleton } from "@shared/components";
import { Local } from "@shared/const";
import { useTypedSelector } from "@shared/hooks";
import { useAppDispatch, useIntersect } from "@shared/hooks";
import { getIsSsrMobile } from "@shared/lib";
import { PageTrackList } from "./components";
const pageSize = 10;
// const DynamicPlaylistModal = dynamic(() => import('../../widgets/PlaylistModal/PlaylistModal'), { loading: () => <p>Loading...</p> });

const TrackPage: React.FC = () => {
  const _trackActions = useTrackActions();
  const { tracks, searchedTracks, error, isLoading, isSearching } = useTypedSelector((st) => st.track);
  const { onIntersect: fetchTracks } = useIntersect(_trackActions.fetchTracks, pageSize);
  const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
  useEffect(() => {
    fetchTracks().finally(() => {
      setIsFirstRequest(false);
    });
  }, []);
  // const playlist = usePlaylist();
  const dispatch = useAppDispatch();
  const searchHandler = (query: string) => {
    dispatch(_trackActions.searchTracks({ query }));
  };
  return (
    <>
      <H1>{Local.Tracks.PageTitle}</H1>
      {error ? <H1>{error}</H1> : null}
      {/* <SearchInput isSearching={isSearching} searchHandler={searchHandler} /> */}
      {isFirstRequest ? (
        <TrackListSkeleton amount={10} />
      ) : searchedTracks && searchedTracks.length ? (
        <PageTrackList tracks={searchedTracks} />
      ) : (
        <Intersect onIntersect={fetchTracks} id='track_intersection' isFetching={isLoading}>
          <PageTrackList tracks={tracks} />
        </Intersect>
      )}
      {/* {playlist.isVisible && (
				<DynamicPlaylistModal
					isVisible={playlist.isVisible}
					control={playlist.control}
					handlers={{
						onClose: playlist.close,
						onSave: playlist.onSave,
						onUpload: playlist.onUpload,
					}}
				/>
			)} */}
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
