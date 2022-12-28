import * as React from 'react';

import { FC } from 'react';

import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton } from '@mui/material';
import { useRouter } from 'next/router';

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
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <CustomIconButton
        onClick={handleClose}
      >
        <CloseIcon />
      </CustomIconButton>
      <DialogContent>
        <CustomDialogContentText>
          {message}
        </CustomDialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton onClick={handleMoveCart}>
          장바구니 바로가기
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

const CustomIconButton = styled(IconButton)`
  margin: .5rem 0 0 15rem;
  width: 60px;
  color: black;
`;
const CustomDialogContentText = styled(DialogContentText)`
  font-size: 18px;
  color: black;
  line-height: 1.4em;
  text-align: center;
`;

const CustomButton = styled(Button)`
  border: 1px solid rgb(212, 212, 212);
  border-radius: 2px;
  font-size: 14px;
  color: rgb(93, 93, 93);
  line-height: 30px;
  margin: 1px auto 15px;
`;

export default AlertDialog;
