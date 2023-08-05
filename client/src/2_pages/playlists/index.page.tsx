import React, { FC } from 'react';

import { PlaylistListWidget } from '@widgets/playlist/playlist-list/PlaylistListWidget';

import { H1 } from '@shared/components';
import { Local } from '@shared/const';

interface IPlaylistPageProps {}

const pageSize = 8;
const PlaylistPage: FC<IPlaylistPageProps> = () => {
  // const { playlists, isAllPlaylistLoading } = usePlaylistSelector();
  // const _playlistActions = usePlaylistActions();
  // const { onIntersect: fetchPlaylists } = useIntersect(_playlistActions.fetchAllPlaylists, pageSize);
  // const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
  // useEffect(() => {
  //   fetchPlaylists().finally(() => {
  //     setIsFirstRequest(false);
  //   });
  // }, []);
  return (
    <>
      <H1>{Local.Playlists.PageTitle}</H1>
      <PlaylistListWidget />
    </>
  );
};
export default PlaylistPage;

// interface IPlaylistsPageListProps {
//   playlists: IPlaylist[];
// }

// export const PlaylistsPageList: FC<IPlaylistsPageListProps> = ({ playlists }) => {
//   const { close, isVisible, onSave, onUpload, control } = usePlaylistModal();
//   return playlists.length === 0 ? (
//     <Grid container justifyContent='center' alignItems='center'>
//       <Typography variant='h5' align='center'>
//         Список плейлистов пуст
//       </Typography>
//     </Grid>
//   ) : (
//     <>
//       <PlaylistList playlists={playlists} />
//       <PlaylistModalWidget isVisible={isVisible} />
//     </>
//   );
// };
