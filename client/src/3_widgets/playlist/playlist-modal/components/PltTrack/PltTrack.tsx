import { Typography } from '@material-ui/core';
import { PlayArrowRounded } from '@material-ui/icons';
import { Box, Checkbox, IconButton } from '@mui/material';
import React, { FC } from 'react';

import { PlaylistTrack, usePlaylistModalActions } from '@entities/playlist-modal';

import { useAppDispatch } from '@shared/hooks';
import { timeConverter } from '@shared/lib';

interface IPltTrackProps {
  track: PlaylistTrack;
}

export const PltTrack: FC<IPltTrackProps> = ({ track }) => {
  const trackInfo = track.track;
  const dispatch = useAppDispatch();
  const _pModal = usePlaylistModalActions();
  const toggle = () => dispatch(_pModal.toggleCheckbox(track.track._id));
  return (
    <Box className='playlist-track'>
      <Box className='playlist-track__container'>
        <Box className='playlist-track__info'>
          <Box className='circle_button_wrap'>
            <IconButton className='circle_button'>
              <PlayArrowRounded htmlColor='#fff' fontSize='small' />
            </IconButton>
          </Box>
          <Box>
            <Typography>
              {trackInfo.artist} &ndash; {trackInfo.name}
            </Typography>
          </Box>
        </Box>
        <Box className='track__time-container'>
          {/* тут плохо. Не должно зависеть от класса трека*/}
          <span className='gray'>{false ? timeConverter(0) : timeConverter(trackInfo.duration)}</span>
        </Box>
      </Box>
      <Box>
        <Checkbox checked={track.isChecked} onChange={toggle} />
      </Box>
    </Box>
  );
};
