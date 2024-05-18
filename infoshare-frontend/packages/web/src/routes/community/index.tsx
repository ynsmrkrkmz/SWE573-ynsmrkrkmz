import { useAppContext } from 'contexts/AppContext';
import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CommunityDetailsRoot } from './components/CommunityDetailsRoot';
import { CommunityProvider } from './contexts/CommunityContext';
import { CommunityInvitations } from './routes/CommunityInvitations';
import { CommunityUsers } from './routes/CommunityUsers';
import { CreateCommunity } from './routes/CreateCommunity';
import { CommunityList } from './routes/CommunityList';
import { CommunityAbout } from './routes/CommunityAbout';
import { CommunityNewInvitation } from './routes/CommunityNewInvitation';
import { CommunityPosts } from './routes/CommunityPosts';
import { CommunityNewPost } from './routes/CommunityNewPost';
import { CommunityNewTemplate } from './routes/CommunityNewTemplate';

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
          <Route path="posts" element={<CommunityPosts />} />
          <Route path="posts/new-post" element={<CommunityNewPost />} />
          <Route path="posts/new-template" element={<CommunityNewTemplate />} />
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
