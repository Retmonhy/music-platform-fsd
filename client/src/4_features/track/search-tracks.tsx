import { useTrackActions, useTrackSelector } from '@entities/track';

import { SearchInput } from '@shared/components';
import { Local } from '@shared/const';
import { useAppDispatch } from '@shared/hooks';

export const SearchTracks = () => {
  const dispatch = useAppDispatch();
  const { isSearching } = useTrackSelector();
  const _trackActions = useTrackActions();
  const searchHandler = (query: string) => {
    dispatch(_trackActions.searchTracks({ query }));
  };
  return <SearchInput isSearching={isSearching} searchHandler={searchHandler} label={Local.Tracks.SearchMusic} />;
};
