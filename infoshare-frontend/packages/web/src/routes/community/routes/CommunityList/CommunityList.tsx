import { Grid, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useAppContext } from 'contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import useFormResolver from 'hooks/useFormResolver';
import useNotification from 'hooks/useNotification';
import Root from './CommunityList.style';
import { MdInfo } from 'react-icons/md';
import { useAllCommunities } from 'services/communityService';
import { useQueryClient } from '@tanstack/react-query';
import CommunityCard from 'routes/community/components/CommunityCard';
import ContentLoading from 'components/ContentLoading';

const Communitylist: FC = () => {
  const intl = useIntl();
  const { language } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSuccess } = useNotification();
  const formResolver = useFormResolver();

  const { data, isLoading } = useAllCommunities();

  return (
    <Root>
      <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
        {intl.formatMessage({
          id: 'generic.communities',
        })}
        <IconButton size="small" sx={{ padding: 0, ml: 1, mb: 0.25 }}>
          <MdInfo color="#D8D9DC" />
        </IconButton>
      </Typography>
      {isLoading ? (
        <ContentLoading />
      ) : (
        <Grid container spacing={1}>
          {data &&
            data.data?.map((c) => (
              <Grid key={c.id} item>
                <CommunityCard
                  id={c.id}
                  name={c.name}
                  memberCount={c.memberCount}
                  imageUrl={c.imageUrl}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </Root>
  );
};

export default Communitylist;
