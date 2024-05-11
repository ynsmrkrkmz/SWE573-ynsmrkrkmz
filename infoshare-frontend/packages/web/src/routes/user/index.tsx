import { useAppContext } from 'contexts/AppContext';
import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import { UserInvitations } from './routes/UserInvitations';

const UserRoute: FC = () => {
  const { setPageName } = useAppContext();
  const intl = useIntl();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'user.profile' }));
  }, [intl, setPageName]);

  return (
    <Routes>
      <Route path="profile" element={'profile'} />
      <Route path="invitations" element={<UserInvitations />} />
    </Routes>
  );
};

export { UserRoute };
