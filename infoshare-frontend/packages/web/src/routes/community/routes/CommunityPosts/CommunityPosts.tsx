import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import ContentLoading from 'components/ContentLoading';
import { useAppContext } from 'contexts/AppContext';
import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { PostCard } from 'routes/community/components/PostCard';
import { useGetCommunityPosts } from 'services/postService';
import omit from 'lodash/omit';

const CommunityPosts: FC = () => {
  const intl = useIntl();
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { setPageName } = useAppContext();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'community.posts' }));
  }, [intl, setPageName]);

  const { data, isLoading } = useGetCommunityPosts(communityId);

  const postData = data?.data;

  const handleNewPost = () => {
    navigate('new-post');
  };

  return isLoading ? (
    <ContentLoading />
  ) : (
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
      <Box>
        {postData &&
          postData.map((p) => <PostCard key={p.id} postDetails={omit(p, ['communityName'])} />)}
      </Box>
    </>
  );
};

export { CommunityPosts };
