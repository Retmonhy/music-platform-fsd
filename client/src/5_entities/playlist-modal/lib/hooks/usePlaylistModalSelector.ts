import { useTypedSelector } from '@shared/hooks';

export const usePlaylistModalSelector = () => useTypedSelector((state) => state.playlistModal);
