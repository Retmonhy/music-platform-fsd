import React, { useEffect, useState } from "react";
import { useTypedSelector } from "@shared/hooks/useTypedSelector";

// import { SearchInput } from "@entities/track/components";
import { TrackList } from "@entities/track";
import { H1 } from "@shared/components";
import { getIsSsrMobile } from "@shared/lib";
import { useAction, useIntersect } from "@shared/hooks";
import { Intersect } from "@shared/components";
import { TrackListSkeleton } from "@shared/components/Skeletons";
import { Local } from "@shared/const/Localization";
import { GetServerSidePropsContext } from "next/types";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@shared/store";
const pageSize = 10;
// const DynamicPlaylistModal = dynamic(() => import('../../widgets/PlaylistModal/PlaylistModal'), { loading: () => <p>Loading...</p> });

const TrackPage: React.FC = () => {
  const { _track } = useAction();
  const { tracks, searchedTracks, error, isLoading, isSearching } = useTypedSelector((st) => st.track);
  const { onIntersect: fetchTracks } = useIntersect(_track.fetchTracks, pageSize);
  const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
  useEffect(() => {
    fetchTracks().finally(() => {
      setIsFirstRequest(false);
    });
  }, []);
  // const playlist = usePlaylist();
  const dispatch = useAppDispatch();
  const searchHandler = (query: string) => {
    dispatch(_track.searchTracks({ query }));
  };
  return (
    <>
      <H1>{Local.Tracks.PageTitle}</H1>
      {error ? <H1>{error}</H1> : null}
      {/* <SearchInput isSearching={isSearching} searchHandler={searchHandler} /> */}
      {isFirstRequest ? (
        <TrackListSkeleton amount={10} />
      ) : searchedTracks && searchedTracks.length ? (
        <TrackList tracks={searchedTracks} />
      ) : (
        <Intersect onIntersect={fetchTracks} id='track_intersection' isFetching={isLoading}>
          <TrackList tracks={tracks} />
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
