import { ITrack } from "./track";
export interface PlayerState {
  active: ITrack | null;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  isHidrated: boolean;
  queueStack: ITrack[];
  listenedTracks: ITrack[];
}
