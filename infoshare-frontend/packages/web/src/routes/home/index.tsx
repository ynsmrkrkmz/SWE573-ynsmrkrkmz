import React, { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppContext } from 'contexts/AppContext';
import { useIntl } from 'react-intl';
import { Home } from './Home';

const HomeRoute: FC = () => {
  const { setPageName } = useAppContext();
  const intl = useIntl();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'generic.signup' }));
  }, [intl, setPageName]);

  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
};

export { HomeRoute };
