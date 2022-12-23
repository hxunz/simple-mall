import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export type AlertDialogProps = {
  open: boolean;
  onClose: VoidFunction;
  message: string;
};

const AlertDialog: FC<AlertDialogProps> = ({ open, onClose, message }) => {
  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  const handleMoveCart = () => {
    router.push('/cart');
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <IconButton onClick={handleClose} sx={{ width: '40px' }}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleMoveCart}>장바구니 바로가기</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
