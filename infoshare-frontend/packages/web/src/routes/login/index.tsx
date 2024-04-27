import React, { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppContext } from 'contexts/AppContext';
import { useIntl } from 'react-intl';
import Login from './Login';

const LoginRoute: FC = () => {
  const { setPageName } = useAppContext();
  const intl = useIntl();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'generic.login' }));
  }, [intl, setPageName]);

  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  );
};

export default LoginRoute;
