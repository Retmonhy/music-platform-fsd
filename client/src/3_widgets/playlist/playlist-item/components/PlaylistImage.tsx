//libraties
import { CheckRounded, EditOutlined, PlayArrowRounded, SubjectRounded } from '@material-ui/icons';
import { AddRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { FC, HTMLAttributes, MouseEvent, useContext, useState } from 'react';

import { usePlaylistActions, usePlaylistSelector } from '@entities/playlist';

//conponents
import { SquareDiv } from '@shared/components';
import { useAppDispatch } from '@shared/hooks';
import { generateUrl, merge } from '@shared/lib';

import { PlaylistContext } from '../PlaylistItem';

const imageSize = 70;
interface IPlaylistImageHandlers {
  onPlay: () => void;
  onEdit: () => void;
}
interface IPlaylistProps extends HTMLAttributes<HTMLDivElement> {
  source: string;
  alt: string;
  handlers: IPlaylistImageHandlers;
}
export const PlaylistImage: FC<IPlaylistProps> = ({ source, alt, handlers, ...props }) => {
  const dispatch = useAppDispatch();
  const _playlistActions = usePlaylistActions();
  // const { user } = useTypedSelector((i) => i.account);
  const { playlistsToDelete } = usePlaylistSelector();

  const [isHover, setHover] = useState<boolean>(false);
  const playlist = useContext(PlaylistContext);
  // const isUserOwner = playlist.owner.id === (user && user.id);
  const isUserOwner = true; //затычка. Удалить когда будет ентитя для юзера

  //handlers
  const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setHover(true);
  };
  const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setHover(false);
  };
  const handleManagePlaylistsToDelete = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(_playlistActions.managePlaylistToDeleteFromUser(playlist.id));
  };
  return (
    <div className='relative'>
      <Box className={props.className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <img src={generateUrl(source)} alt={alt} className={merge(props.className, 'br8')} />

        {isHover ? (
          <Box className={merge(props.className, 'backdrop', 'br8')}>
            <Box className='action_buttons_wrap'>
              <Box className='action_buttons'>
                {isUserOwner ? (
                  <SquareDiv size={60} className='pli-btn pli-edit_btn' onClick={handlers.onEdit}>
                    <EditOutlined fontSize='inherit' color='inherit' />
                  </SquareDiv>
                ) : (
                  <SquareDiv size={60} className='pli-btn pli-edit_btn flex' onClick={handleManagePlaylistsToDelete}>
                    <SquareDiv size={30} className='relative overflow'>
                      <AddRounded
                        className={merge('default_icon', 'top_icon', playlistsToDelete.includes(playlist.id) ? 'hidden' : '')}
                        fontSize='inherit'
                        color='inherit'
                      />
                      <CheckRounded
                        className={merge('default_icon', 'bot_icon', playlistsToDelete.includes(playlist.id) ? '' : 'hidden')}
                        fontSize='inherit'
                        color='inherit'
                      />
                    </SquareDiv>
                  </SquareDiv>
                )}

                <SquareDiv size={60} className='pli-btn pli-play_btn' onClick={handlers.onPlay}>
                  <PlayArrowRounded fontSize='inherit' color='inherit' />
                </SquareDiv>

                <SquareDiv size={60} className='pli-btn'>
                  {}
                </SquareDiv>
              </Box>

              <Box className='pli-btn playlist_stats'>
                <SubjectRounded fontSize='inherit' color='inherit' />
                <Typography>{playlist.numberOfTracks}</Typography>
              </Box>
            </Box>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};
