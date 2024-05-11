import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useAppContext } from 'contexts/AppContext';
import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { UserInvitationList } from 'routes/user/components/UserInvitationList';

const UserInvitations: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { setPageName } = useAppContext();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'user.invitations' }));
  }, [intl, setPageName]);

  const handleInvite = () => {
    navigate('new-invitation');
  };

  return (
    <Stack direction={'column'} spacing={2}>
      <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
        {intl.formatMessage({
          id: 'user.invitations',
        })}
      </Typography>

      <Divider />
      <Box>
        <UserInvitationList />
      </Box>
    </Stack>
  );
};

export { UserInvitations };
