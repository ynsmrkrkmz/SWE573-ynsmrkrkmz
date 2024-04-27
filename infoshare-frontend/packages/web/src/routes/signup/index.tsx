import React, { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppContext } from 'contexts/AppContext';
import { useIntl } from 'react-intl';
import Signup from './Signup';

const SignupRoute: FC = () => {
  const { setPageName } = useAppContext();
  const intl = useIntl();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'generic.signup' }));
  }, [intl, setPageName]);

  return (
    <Routes>
      <Route index element={<Signup />} />
    </Routes>
  );
};

export default SignupRoute;
