import { useTypedSelector } from '@shared/hooks';

export const useTrackSelector = () => useTypedSelector((state) => state.track);
