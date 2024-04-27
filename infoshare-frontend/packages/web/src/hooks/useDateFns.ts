/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppContext } from 'contexts/AppContext';
import { LocaleMap } from '@infoshare/utils/constants';
import { default as dateFnsFormat } from 'date-fns/format';
import { default as dateFnsFormatDistance } from 'date-fns/formatDistance';

const useDateFns = () => {
  const { language } = useAppContext();

  const format = (date: number | Date, format: string, options?: any): string => {
    return dateFnsFormat(date, format, { ...options, locale: LocaleMap[language] });
  };

  const formatDistance = (date: number | Date, baseDate: number | Date, options?: any): string => {
    return dateFnsFormatDistance(date, baseDate, { ...options, locale: LocaleMap[language] });
  };

  return { format, formatDistance };
};

export default useDateFns;
