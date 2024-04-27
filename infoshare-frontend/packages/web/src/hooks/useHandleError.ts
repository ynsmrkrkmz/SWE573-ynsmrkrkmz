import logger from '@infoshare/utils/logger';
import { useIntl } from 'react-intl';
import useNotification from './useNotification';

const useHandleError = () => {
  const { showError } = useNotification();
  const intl = useIntl();

  return (
    error: unknown,
    { shouldLog, showNotification } = {
      shouldLog: true,
      showNotification: true,
    }
  ) => {
    const message =
      error instanceof Error
        ? error.message
        : intl.formatMessage({
            id: 'error.unexpectedError',
          });

    if (showNotification) {
      showError(message);
    }

    if (shouldLog) {
      logger.log(error);
    }
  };
};

export default useHandleError;
