import React, { FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import cookies from 'js-cookie';
import { IntlProvider } from 'react-intl';
import { COOKIE_KEYS } from '@infoshare/utils/constants';
import i18n, { Languages } from '@infoshare/i18n';
import detectLanguage from 'utils/detectLanguage';
import api from 'services/api';

const initialLanguage = detectLanguage();

document.documentElement.lang = initialLanguage;

interface IAppContext {
  language: Languages.TR_TR | Languages.EN_UK | Languages.EN_US;
  setLanguage(lang: string): void;
  pageName?: string;
  setPageName(pageName: string): void;
  refNumbers?: { [uuid: string]: string };
  addRefNumber(refNumber: object): void;
}

const AppContext = React.createContext<IAppContext>({
  language: (process.env.REACT_APP_DEFAULT_LANGUAGE as Languages) || Languages.TR_TR,
  setLanguage() {},
  pageName: '',
  setPageName() {},
  refNumbers: {},
  addRefNumber() {},
});

AppContext.displayName = 'AppContext';

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Languages>(initialLanguage as Languages);
  const [pageName, _setPageName] = useState('');
  const [refNumbers, setRefNumbers] = useState({});
  const translations = useMemo(() => {
    return i18n.translations[language] as Record<string, string>;
  }, [language]);

  const handleLanguageChange = useCallback((lang: Languages) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    cookies.set(COOKIE_KEYS.LANGUAGE, lang, { expires: 365 });
  }, []);

  // Set Api language
  useEffect(() => {
    api.language = language;
  }, [language]);

  useEffect(() => {
    window.document.title = `infoshare | ${pageName}`;
  }, [pageName]);

  const addRefNumber = useCallback((refNumber: { [uuid: string]: string }) => {
    setRefNumbers((prev: object) => ({
      ...prev,
      ...refNumber,
    }));
  }, []);

  const setPageName = useCallback((name: string) => {
    _setPageName('');
    name && name !== 'undefined' && _setPageName(name);
  }, []);

  const contextValue = useMemo(() => {
    return {
      language,
      setLanguage: handleLanguageChange,
      pageName,
      setPageName,
      refNumbers,
      addRefNumber,
    };
  }, [language, handleLanguageChange, pageName, setPageName, refNumbers, addRefNumber]);

  return (
    <AppContext.Provider value={contextValue}>
      <IntlProvider
        messages={translations}
        locale={language}
        defaultLocale={process.env.REACT_APP_DEFAULT_LANGUAGE}
      >
        {children}
      </IntlProvider>
    </AppContext.Provider>
  );
};
