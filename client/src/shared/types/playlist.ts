export interface IPlaylistData {
  name: string;
  description: string;
}
export interface IPlaylist extends IPlaylistData {
  id: string;
  owner: User;
  numberOfTracks: number;
  lastUpdate: number;
  cover: string;
  tracks: string[];
}
