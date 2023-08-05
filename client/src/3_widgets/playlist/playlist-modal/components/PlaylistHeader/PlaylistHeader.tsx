// libraries
import { CloseRounded } from '@material-ui/icons';
import { Box, Grid, Typography } from '@mui/material';
import React, { FC, MouseEvent } from 'react';

interface IPlaylistHeaderProps {
  title: string;
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
}
export const PlaylistHeader: FC<IPlaylistHeaderProps> = ({ title, onClose }) => {
  return (
    <Box className='playlist-modal__header'>
      <Grid container direction={'row'} justifyContent='space-between'>
        <Box padding={'12px 24px'}>
          <Typography>{title}</Typography>
        </Box>
        <Box padding={'12px 24px'} onClick={onClose} className='playlist-modal__close'>
          <CloseRounded />
        </Box>
      </Grid>
    </Box>
  );
};
