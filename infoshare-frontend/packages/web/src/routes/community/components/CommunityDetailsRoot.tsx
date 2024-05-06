import { FC, useEffect } from 'react';
import { Avatar, Button, Card, CardActions, CardHeader, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { deepOrange } from '@mui/material/colors';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import {
  useGetCommunityDetailsById,
  useJoinCommunity,
  useLeaveCommunity,
} from 'services/communityService';
import { useCommunityContext } from '../contexts/CommunityContext';
import { useQueryClient } from '@tanstack/react-query';
import useNotification from 'hooks/useNotification';
import { LoadingButton } from '@mui/lab';

const CommunityDetailsRoot: FC = () => {
  const intl = useIntl();
  const { communityId } = useParams();
  const queryClient = useQueryClient();
  const { setDescription, setCommunityId } = useCommunityContext();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();

  const { data } = useGetCommunityDetailsById(communityId);
  const { mutateAsync: joinCommunityMutate, isLoading: joinIsLoading } = useJoinCommunity({
    onSuccess: () => {
      showSuccess(intl.formatMessage({ id: 'success.joinedCommunity' }));
      navigate('.');
    },
  });

  const { mutateAsync: leaveCommunityMutate, isLoading: leaveIsLoading } = useLeaveCommunity({
    onSuccess: () => {
      showSuccess(intl.formatMessage({ id: 'success.leftCommunity' }));
      queryClient.invalidateQueries({ queryKey: [`community-details-${communityId}`] });
    },
  });

  const communityData = data?.data;

  useEffect(() => {
    communityData && setDescription(communityData.description);
  }, [setDescription, communityData]);

  useEffect(() => {
    communityId && setCommunityId(communityId);
  }, [communityId, setCommunityId]);

  const handleJoin = async () => {
    await joinCommunityMutate({ communityId: communityId });
  };

  const handleLeave = async () => {
    await leaveCommunityMutate({ communityId: communityId });
  };

  return (
    <Stack direction={'column'} spacing={2} padding={5}>
      <Card>
        <CardHeader
          titleTypographyProps={{ fontSize: 18 }}
          avatar={
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              alt="Community Image"
              src={communityData?.imageUrl !== null ? communityData?.imageUrl : undefined}
            >
              C
            </Avatar>
          }
          title={communityData?.name}
          subheader={intl.formatMessage(
            { id: 'community.memberCount' },
            { memberCount: communityData?.memberCount }
          )}
          action={
            communityData && communityData.joined ? (
              <LoadingButton loading={leaveIsLoading} onClick={handleLeave}>
                <Typography>{intl.formatMessage({ id: 'community.leave' })}</Typography>
              </LoadingButton>
            ) : (
              <LoadingButton loading={joinIsLoading} onClick={handleJoin}>
                <Typography>{intl.formatMessage({ id: 'community.join' })}</Typography>
              </LoadingButton>
            )
          }
        />
        <CardActions disableSpacing>
          <Button onClick={() => navigate(`./about`)}>
            <Typography>{intl.formatMessage({ id: 'community.about' })}</Typography>
          </Button>
        </CardActions>
      </Card>
      <Outlet />
    </Stack>
  );
};

export default CommunityDetailsRoot;
