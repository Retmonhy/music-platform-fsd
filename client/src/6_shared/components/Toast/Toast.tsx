import { Snackbar } from '@material-ui/core';
import { Alert, AlertColor, AlertProps, Slide, SlideProps, SnackbarCloseReason } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';

export enum ToastType {
  info = 'info',
}
interface IToastProps extends AlertProps {
  type: AlertColor;
  message: string;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction='left' />;
}

export class Toast {
  type: AlertColor;
  message: string;
  isOpened: boolean = true;
  static container: any;

  constructor(props: IToastProps) {
    if (!Toast.container) {
      Toast.container = createRoot(document.getElementById('toast-container'));
    }
    this.type = props.type;
    this.message = props.message;

    this._closeToast = this._closeToast.bind(this);
    this._renderToast.bind(this)();
  }
  private _closeToast(event, reason: SnackbarCloseReason) {
    if (reason === 'timeout') {
      this.isOpened = false;
      this._renderToast();
    }
  }
  _renderToast() {
    Toast.container.render(
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        TransitionComponent={SlideTransition}
        open={this.isOpened}
        onClick={() => console.log('close toast')}
        autoHideDuration={5000}
        onClose={this._closeToast}>
        <Alert variant='filled' severity={this.type}>
          {this.message}
        </Alert>
      </Snackbar>
    );
  }
}
