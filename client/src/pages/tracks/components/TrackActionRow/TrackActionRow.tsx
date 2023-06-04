//libs
import { Grid } from "@material-ui/core";
import { AddRounded, CloseRounded, PlaylistAddRounded } from "@material-ui/icons";
import React, { FC, MouseEvent } from "react";
//components
import { PopoverButton } from "@shared/components";
import { Local } from "@shared/const/Localization";
import { ActionMenu } from "../ActionMenu";

interface ITrackActionRowHandlers {
  deleteHandler: () => void;
  addHandler: () => void;
  queueAddHandler: () => void;
}
interface ITrackActionRowProps {
  isActive: boolean;
  isExistInUserMusic: boolean;
  handlers: ITrackActionRowHandlers;
}

export const TrackActionRow: FC<ITrackActionRowProps> = ({ isActive, isExistInUserMusic, handlers }) => {
  const { addHandler, deleteHandler, queueAddHandler } = handlers;
  return (
    <Grid container direction='row' wrap='nowrap'>
      {!isActive && <QueueAdd onClick={queueAddHandler} />}
      {isExistInUserMusic ? <DeleteTrack onClick={deleteHandler} /> : <AddTrack onClick={addHandler} />}
      <ActionMenu />
    </Grid>
  );
};

interface IPopoverButtonProps {
  onClick: () => void;
}
export const QueueAdd: FC<IPopoverButtonProps> = ({ onClick }) => {
  const handleAddToQueue = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <PopoverButton text={Local.Tracks.PlayNext} onClick={handleAddToQueue}>
      <PlaylistAddRounded className='icon-button' />
    </PopoverButton>
  );
};

export const AddTrack: FC<IPopoverButtonProps> = ({ onClick }) => {
  const handleAdd = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <PopoverButton text={Local.Tracks.AddToMyMusic} onClick={handleAdd}>
      <AddRounded className='icon-button' />
    </PopoverButton>
  );
};

export const DeleteTrack: FC<IPopoverButtonProps> = ({ onClick }) => {
  const handleDelete = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <PopoverButton text={Local.Tracks.DeleteFromCurrentPlaylist} onClick={handleDelete}>
      <CloseRounded className='icon-button' />
    </PopoverButton>
  );
};
