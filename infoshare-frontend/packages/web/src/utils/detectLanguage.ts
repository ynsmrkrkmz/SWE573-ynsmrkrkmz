import { COOKIE_KEYS } from '@infoshare/utils/constants';
import cookies from 'js-cookie';

const detectLanguage = () => {
  // const availableLanguages = (process.env.REACT_APP_AVAILABLE_LANGUAGES ?? 'tr-TR').split(',');
  const selectedLanguage = cookies.get(COOKIE_KEYS.LANGUAGE);

  // let browserLanguage = window.navigator?.language.replace('_', '-');

  // if (availableLanguages.indexOf(browserLanguage) < 0) {
  //   browserLanguage = availableLanguages[0].trim();
  // }

  const language = selectedLanguage ?? 'tr-TR';

  cookies.set(COOKIE_KEYS.LANGUAGE, language, { expires: 365 });

  return language;
};

export default detectLanguage;
