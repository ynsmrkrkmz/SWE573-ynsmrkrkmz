import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useAppContext } from 'contexts/AppContext';
import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { CommunityInvitationList } from 'routes/community/components/CommunityInvitationList';

const CommunityInvitations: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { setPageName } = useAppContext();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'community.invitations' }));
  }, [intl, setPageName]);

  const handleInvite = () => {
    navigate('new-invitation');
  };

  return (
    <>
      <Stack direction={'row'}>
        <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
          {intl.formatMessage({
            id: 'community.invitations',
          })}
        </Typography>
        <Button variant="contained" onClick={handleInvite} startIcon={<AddIcon />}>
          <Typography>{intl.formatMessage({ id: 'community.newInvitation' })}</Typography>
        </Button>
      </Stack>
      <Divider />
      <Box>
        <CommunityInvitationList />
      </Box>
    </>
  );
};

export { CommunityInvitations };
