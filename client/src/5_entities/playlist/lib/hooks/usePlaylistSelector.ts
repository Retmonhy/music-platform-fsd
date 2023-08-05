import { useTypedSelector } from '@shared/hooks';

export const usePlaylistSelector = () => useTypedSelector((state) => state.playlist);
