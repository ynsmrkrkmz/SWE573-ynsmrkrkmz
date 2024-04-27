import { Languages } from '@infoshare/i18n';
import enLocale from 'date-fns/locale/en-US';
import ukLocale from 'date-fns/locale/en-GB';
import trLocale from 'date-fns/locale/tr';

export const COOKIE_KEYS = {
  LANGUAGE: `${process.env.REACT_APP_COOKIE_KEYS_PREFIX}_language`,
};

export enum ROLES {
  ADMIN = 'admin',
}

// region Date / DateTime Formats
export const LocaleMap = {
  [Languages.TR_TR]: trLocale,
  [Languages.EN_US]: enLocale,
  [Languages.EN_UK]: ukLocale,
};

export const DisplayDateFormats = {
  [Languages.TR_TR]: 'dd.MM.yyyy',
  [Languages.EN_US]: 'dd/MM/yyyy',
  [Languages.EN_UK]: 'dd/MM/yyyy',
};

export const DisplayDateTimeFormats = {
  [Languages.TR_TR]: 'dd.MM.yyyy HH:mm',
  [Languages.EN_US]: 'dd/MM/yyyy HH:mm',
  [Languages.EN_UK]: 'dd/MM/yyyy HH:mm',
};

export const DbDateFormat = 'yyyy-MM-dd';

export const DbDateTimeFormat = 'yyyy-MM-dd HH:mm:ss xxx';
// endregion

export const CrudTypes = {
  LIST: 1,
  VIEW: 2,
  CREATE: 4,
  UPDATE: 8,
  DELETE: 16,
};
