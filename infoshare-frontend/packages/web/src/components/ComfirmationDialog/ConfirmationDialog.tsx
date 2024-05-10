import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';

type Props = {
  title: string;
  content: string | ReactNode;
  open: boolean;
  loading: boolean;
  agreeButtonText?: string;
  disagreeButtonText?: string;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationDialog: FC<Props> = ({
  title,
  content,
  open,
  onConfirm,
  onClose,
  loading,
  agreeButtonText,
  disagreeButtonText,
}) => {
  const intl = useIntl();
  return (
    <Dialog
      open={open}
      onClose={() => {
        !loading && onClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {disagreeButtonText ?? intl.formatMessage({ id: 'generic.cancel' })}
        </Button>
        <LoadingButton onClick={onConfirm} loading={loading}>
          {agreeButtonText ?? intl.formatMessage({ id: 'generic.ok' })}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
