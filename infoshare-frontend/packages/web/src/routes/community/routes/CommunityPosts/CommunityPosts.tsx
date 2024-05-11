import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useAppContext } from 'contexts/AppContext';
import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const CommunityPosts: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { setPageName } = useAppContext();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'community.invitations' }));
  }, [intl, setPageName]);

  const handleNewPost = () => {
    navigate('new-post');
  };

  return (
    <>
      <Stack direction={'row'}>
        <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
          {intl.formatMessage({
            id: 'community.posts',
          })}
        </Typography>
        <Button variant="contained" onClick={handleNewPost} startIcon={<AddIcon />}>
          <Typography>{intl.formatMessage({ id: 'post.new' })}</Typography>
        </Button>
      </Stack>
      <Divider />
      <Box></Box>
    </>
  );
};

export { CommunityPosts };
