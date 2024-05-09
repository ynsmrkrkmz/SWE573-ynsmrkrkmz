import { useAppContext } from 'contexts/AppContext';
import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Navigate, Route, Routes } from 'react-router-dom';
import CommunityDetailsRoot from './components/CommunityDetailsRoot';
import { CommunityProvider } from './contexts/CommunityContext';
import CommunityAbout from './routes/CommunityAbout';
import CommunityInvitations from './routes/CommunityInvitations';
import CommunityList from './routes/CommunityList';
import CommunityNewInvitation from './routes/CommunityNewInvitation';
import CommunityUsers from './routes/CommunityUsers';
import CreateCommunity from './routes/CreateCommunity';

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
          <Route path="posts" element={<CommunityAbout />} />
          <Route path="members" element={<CommunityUsers />} />
          <Route path="invitations" element={<CommunityInvitations />} />
          <Route path="invitations/new-invitation" element={<CommunityNewInvitation />} />
          <Route path="settings" element={<CommunityAbout />} />
        </Route>
      </Routes>
    </CommunityProvider>
  );
};

export default CommunityRoute;
