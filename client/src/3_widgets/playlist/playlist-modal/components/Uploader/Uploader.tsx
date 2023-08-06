// libraries
import { AddRounded, CloseRounded } from '@material-ui/icons';
import { Box, Grid, Icon, Typography } from '@mui/material';
import React, { FC, useState } from 'react';

import { usePlaylistModalSelector } from '@entities/playlist-modal';

import { FileUpload, Loader, SquareDiv } from '@shared/components';
//hooks
// components
import { Local } from '@shared/const';
import { generateUrl } from '@shared/lib';

interface IUploaderProps {
  onUpload: (file: File) => Promise<void>;
}
const typoTheme = {
  '&.MuiTypography-body1': { fontSize: 13 },
};
export const Uploader: FC<IUploaderProps> = ({ onUpload }) => {
  const [isShowed, setShowed] = useState<boolean>(false);
  const { info } = usePlaylistModalSelector();
  console.log('info = ', info);
  const showRemoveBtn = () => setShowed(true);
  const hideRemoveBtn = () => setShowed(false);
  const resetFile = () => onUpload(null);
  const [isUploading, setUploading] = useState<boolean>(false);
  const uploadFile = (file: File) => {
    setUploading(() => true);
    onUpload(file);
    setUploading(() => false);
  };
  const changeEvent = (e: File[]) => {
    uploadFile(e[0]);
  };
  return isUploading ? (
    <Box paddingRight={4}>
      <SquareDiv size={80}>
        <Loader />
      </SquareDiv>
    </Box>
  ) : (
    <Box paddingRight={3} className='plm-uploader'>
      {info?.cover ? (
        <Box className='plm-uploader__container relative'>
          <SquareDiv
            onMouseEnter={showRemoveBtn}
            onMouseLeave={hideRemoveBtn}
            size={80}
            style={{
              background: `center / contain url(${generateUrl(info.cover)})`,
            }}>
            {isShowed ? (
              <Icon aria-label='remove' className='pointer plm-uploader__remove' onClick={resetFile} fontSize='small'>
                <CloseRounded viewBox='0 0 30 30' />
              </Icon>
            ) : null}
          </SquareDiv>
        </Box>
      ) : (
        <FileUpload accept='image/*' setFile={changeEvent}>
          <Box className='plm-uploader__container pointer'>
            <SquareDiv size={80}>
              <Grid container className='plm-uploader__grid'>
                <AddRounded className='plm-uploader__plus' />
                <Typography component='span' sx={typoTheme} className='plm-uploader__text'>
                  {Local.Playlists.Modal.Cover}
                </Typography>
              </Grid>
            </SquareDiv>
          </Box>
        </FileUpload>
      )}
    </Box>
  );
};
