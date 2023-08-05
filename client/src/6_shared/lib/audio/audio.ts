export let audio: HTMLAudioElement | null = null;
export const setAudioInstance = (newAudio: HTMLAudioElement) => {
  audio = newAudio;
  audio.muted = true;
  audio.autoplay = false;
};
