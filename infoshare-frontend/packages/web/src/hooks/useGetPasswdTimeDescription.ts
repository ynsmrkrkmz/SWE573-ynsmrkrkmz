import { useIntl } from 'react-intl';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInWeeks,
} from 'date-fns';

const useGetPasswdTimeDescription = () => {
  const intl = useIntl();

  return (previousDate: Date, currentDate = new Date()): string => {
    const weeks = differenceInWeeks(currentDate, previousDate);

    if (weeks > 0) {
      return intl.formatMessage({ id: 'generic.weeksAgo' }, { weeks });
    }

    const days = differenceInDays(currentDate, previousDate);

    if (days > 0) {
      return intl.formatMessage({ id: 'generic.daysAgo' }, { days });
    }

    const hours = differenceInHours(currentDate, previousDate) % 24;

    if (hours > 0) {
      return intl.formatMessage({ id: 'generic.hoursAgo' }, { hours });
    }

    const minutes = differenceInMinutes(currentDate, previousDate) % 60;

    if (minutes > 0) {
      return intl.formatMessage({ id: 'generic.minutesAgo' }, { minutes });
    }

    const seconds = differenceInSeconds(currentDate, previousDate) % 60;

    return intl.formatMessage({ id: 'generic.secondsAgo' }, { seconds });
  };
};

export default useGetPasswdTimeDescription;
