import { useCallback } from 'react';
import { OptionsObject, SnackbarMessage, useSnackbar } from 'notistack';

const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showDefault = useCallback(
    (message: SnackbarMessage, options?: OptionsObject) => {
      enqueueSnackbar(message, { variant: 'default', ...options });
    },
    [enqueueSnackbar]
  );

  const showSuccess = useCallback(
    (message: SnackbarMessage, options?: OptionsObject) => {
      enqueueSnackbar(message, { variant: 'success', ...options });
    },
    [enqueueSnackbar]
  );

  const showError = useCallback(
    (message: SnackbarMessage, options?: OptionsObject) => {
      enqueueSnackbar(message, { variant: 'error', ...options });
    },
    [enqueueSnackbar]
  );

  const showWarning = useCallback(
    (message: SnackbarMessage, options?: OptionsObject) => {
      enqueueSnackbar(message, { variant: 'warning', ...options });
    },
    [enqueueSnackbar]
  );

  const showInfo = useCallback(
    (message: SnackbarMessage, options?: OptionsObject) => {
      enqueueSnackbar(message, { variant: 'info', ...options });
    },
    [enqueueSnackbar]
  );

  return {
    showDefault,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hide: closeSnackbar,
  };
};

export default useNotification;
