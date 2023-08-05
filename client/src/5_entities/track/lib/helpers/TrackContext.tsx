import { createContext } from "react";
import { ITrack } from "@shared/types";

interface ITrackContext {
  track: ITrack;
}
export const TrackContext = createContext<ITrackContext>(null);
