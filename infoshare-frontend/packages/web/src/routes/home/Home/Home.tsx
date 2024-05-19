import { Divider, Stack, Typography } from '@mui/material';
import ContentLoading from 'components/ContentLoading';
import { useAppContext } from 'contexts/AppContext';
import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { PostCard } from 'routes/community/components/PostCard';
import { useGetUserCommunityPosts } from 'services/postService';

const Home: FC = () => {
  const intl = useIntl();
  const { setPageName } = useAppContext();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'generic.home' }));
  }, [intl, setPageName]);

  const { data, isLoading } = useGetUserCommunityPosts();

  const postData = data?.data;

  return isLoading ? (
    <ContentLoading />
  ) : (
    <>
      <Stack direction={'row'}>
        <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
          {intl.formatMessage({
            id: 'generic.home',
          })}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction={'column'} spacing={1}>
        {postData && postData.map((p) => <PostCard key={p.id} postDetails={p} />)}
      </Stack>
    </>
  );
};

export { Home };
