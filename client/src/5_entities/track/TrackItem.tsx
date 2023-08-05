//external-libs
import { MoreVert } from "@mui/icons-material";
import { IconButton, Box } from "@mui/material";
// import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { memo, MouseEvent, useState } from "react";
//entities
import { usePlayerActions } from "@entities/player";
//shared
// import { Loader } from "@shared/components";
import { useIsMobile, useAppDispatch } from "@shared/hooks";
import { merge } from "@shared/lib";
import { ITrack, PlayerState } from "@shared/types";
//siblings
import { TrackTime, TrackImage, TrackInfo } from "./components";
import { TrackContext } from "./lib";

// const DynamicTrackBottomSheet = dynamic(() => import("./components/TrackBottomSheet/TrackBottomSheet"), { loading: () => <Loader /> });
interface TrackItemProps {
  track: ITrack;
  playerState?: PlayerState;
  onClick: () => void;
  ActionsSlot: (track: ITrack) => JSX.Element;
}
const TrackItemComp: React.FC<TrackItemProps> = ({ track, playerState, onClick, ActionsSlot }) => {
  const isMobile = useIsMobile();
  const [isHovered, setHovered] = useState<boolean>(false);
  // const { user, accessToken } = useTypedSelector(i => i.account);
  //проверка делаеется уровнем выше,  plaerState не будет передаваться неактивному
  const isActive = playerState ? true : false;
  const router = useRouter();
  // const { _account } = useAction();
  const _player = usePlayerActions();
  const dispatch = useAppDispatch();

  const play = (event: MouseEvent<HTMLDivElement>) => {
    console.log("click trackitem");
    event.stopPropagation();
    onClick();
  };
  const handleNavigateToTrack = () => {
    router.push("/tracks/" + track._id);
  };
  const navigateToTrackPage = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    handleNavigateToTrack();
  };
  const handleDeleteTrack = () => {
    // dispatch(_account.removeTrackFromMyMusic(track._id));
  };
  const handleAddTrack = () => {
    // dispatch(_account.addTrackIntoMyMusic(track._id));
  };
  const handleAddToQueue = () => {
    dispatch(_player.addTrackInQueue(track));
  };
  const handleHoverOn = () => setHovered(true);
  const handleHoverOff = () => setHovered(false);
  //forMobile
  const [isBSOpened, setBSOpened] = useState<boolean>(false);
  const openBSHandler = (e) => {
    console.log("openBS");
    e.stopPropagation();
    e.preventDefault();
    setBSOpened(true);
  };
  const closeBS = () => setBSOpened(false);
  return (
    <TrackContext.Provider value={{ track: track }}>
      <Box className={merge("track track_item", isActive ? "track_active" : "")} onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff} onClick={play}>
        <TrackImage source={track.picture} alt={track.text} isHover={isHovered} />
        <TrackInfo className='track__info' title={track.name} description={track.artist} titleClick={navigateToTrackPage} />
        {isMobile ? (
          <Box className='track__time'>
            <IconButton onClick={openBSHandler} aria-label='show more trackcontrols'>
              <MoreVert className='icon-button' />
            </IconButton>
            {isBSOpened && (
              <></>
              // <DynamicTrackBottomSheet
              //   open={isBSOpened}
              //   onClose={closeBS}
              //   // isExistInUserMusic={user?.tracks.some(i => i === track._id)}
              //   isExistInUserMusic={true}
              //   handlers={{
              //     addHandler: handleAddTrack,
              //     deleteHandler: handleDeleteTrack,
              //     queueAddHandler: handleAddToQueue,
              //     navigateToTrackPage: handleNavigateToTrack,
              //   }}
              // />
            )}
          </Box>
        ) : (
          <Box className='track__time'>
            {isHovered ? ActionsSlot(track) : <TrackTime isActive={isActive} currentTime={playerState?.currentTime} duration={track.duration} />}
          </Box>
        )}
      </Box>
    </TrackContext.Provider>
  );
};
export const TrackItem = memo(TrackItemComp);
export default TrackItem;

{
  /* <ActionRow
                isActive={isActive}
                // isExistInUserMusic={user?.tracks.some(i => i === track._id)}
                isExistInUserMusic={true}
                handlers={{
                  addHandler: handleAddTrack,
                  deleteHandler: handleDeleteTrack,
                  queueAddHandler: handleAddToQueue,
                }}
              /> */
}
