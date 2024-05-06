import React, { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from 'contexts/AppContext';
import { useIntl } from 'react-intl';
import Signup from './routes/CreateCommunity';
import CreateCommunity from './routes/CreateCommunity';
import CommunityAbout from './routes/CommunityAbout';
import CommunityList from './routes/CommunityList';
import CommunityDetailsRoot from './components/CommunityDetailsRoot';
import { CommunityProvider } from './contexts/CommunityContext';

const CommunityRoute: FC = () => {
  const { setPageName } = useAppContext();
  const intl = useIntl();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'generic.communities' }));
  }, [intl, setPageName]);

  return (
    <CommunityProvider>
      <Routes>
        <Route index element={<CommunityList />} />
        <Route path="create-community" element={<CreateCommunity />} />
        <Route path=":communityId" element={<CommunityDetailsRoot />}>
          <Route index element={<Navigate to="about" replace />} />
          <Route path="about" element={<CommunityAbout />} />
        </Route>
      </Routes>
    </CommunityProvider>
  );
};

export default CommunityRoute;
