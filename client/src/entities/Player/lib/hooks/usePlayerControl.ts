import { useAppDispatch } from "@shared/hooks";
import { audio } from "@shared/lib";
import { usePlayerActions } from "./usePlayerActions";
import { usePlayerSelector } from "./usePlayerSelector";
export const usePlayerControl = () => {
  const _player = usePlayerActions();
  const { pause } = usePlayerSelector();
  const dispatch = useAppDispatch();

  const playControl = () => {
    if (pause) {
      dispatch(_player.playTrack());
      audio.play();
    } else {
      dispatch(_player.pauseTrack());
      audio.pause();
    }
  };
  const playTrack = () => {
    dispatch(_player.playTrack());
    audio.play();
  };
  const pauseTrack = () => {
    dispatch(_player.pauseTrack());
    audio.pause();
  };
  const nextTrack = () => {
    dispatch(_player.startNext());
  };
  const prevTrack = () => {
    dispatch(_player.startPrev());
    audio.currentTime = 0;
  };

  return {
    playControl,
    nextTrack,
    prevTrack,
    playTrack,
    pauseTrack,
  };
};
