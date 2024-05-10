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
import ContentLoading from 'components/ContentLoading';
import { useAuthContext } from 'contexts/AuthContext';
import { UserCommunityRole } from 'types/userTypes';

const CommunityDetailsRoot: FC = () => {
  const intl = useIntl();
  const { communityId } = useParams();
  const queryClient = useQueryClient();
  const {
    authCommunityUser,
    setDescription,
    setCommunityId,
    setAuthCommunityUser,
    setCommunityUsers,
  } = useCommunityContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();

  const { data, isLoading } = useGetCommunityDetailsById(communityId);

  const { mutateAsync: joinCommunityMutate, isLoading: joinIsLoading } = useJoinCommunity({
    onSuccess: async () => {
      showSuccess(intl.formatMessage({ id: 'success.joinedCommunity' }));
      await queryClient.invalidateQueries({
        queryKey: ['community-details', communityId],
        exact: true,
      });
      await queryClient.invalidateQueries({
        queryKey: ['user-communities'],
        exact: true,
      });
    },
  });

  const { mutateAsync: leaveCommunityMutate, isLoading: leaveIsLoading } = useLeaveCommunity({
    onSuccess: async () => {
      showSuccess(intl.formatMessage({ id: 'success.leftCommunity' }));
      await queryClient.invalidateQueries({
        queryKey: ['community-details', communityId],
        exact: true,
      });
      await queryClient.invalidateQueries({
        queryKey: ['user-communities'],
        exact: true,
      });
    },
  });

  const communityData = data?.data;

  useEffect(() => {
    if (communityData) {
      setDescription(communityData.description);
      setCommunityUsers(communityData.users);

      let authCommunityUser = communityData.users?.find((u) => u.id === user?.id) ?? null;

      setAuthCommunityUser(authCommunityUser);
    }
  }, [setDescription, data]);

  useEffect(() => {
    communityId && setCommunityId(communityId);
  }, [communityId, setCommunityId]);

  const handleJoin = async () => {
    await joinCommunityMutate({ communityId: communityId });
  };

  const handleLeave = async () => {
    await leaveCommunityMutate({ communityId: communityId });
  };

  const visible =
    (authCommunityUser && authCommunityUser.userCommunityRole in UserCommunityRole) ?? false;

  let communityMenuItems = [
    {
      label: 'community.about',
      link: 'about',
      visible: true,
    },
    {
      label: 'community.posts',
      link: 'posts',
      visible: visible,
    },
    {
      label: 'community.members',
      link: 'members',
      visible: visible,
    },
    {
      label: 'community.invitations',
      link: 'invitations',
      visible:
        (authCommunityUser && authCommunityUser.userCommunityRole !== UserCommunityRole.MEMBER) ??
        false,
    },
    {
      label: 'community.settings',
      link: 'settings',
      visible:
        (authCommunityUser && authCommunityUser.userCommunityRole !== UserCommunityRole.MEMBER) ??
        false,
    },
  ];

  return isLoading ? (
    <ContentLoading />
  ) : (
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
            communityData &&
            (communityData.isJoined ? (
              <LoadingButton variant="contained" loading={leaveIsLoading} onClick={handleLeave}>
                <Typography>{intl.formatMessage({ id: 'community.leave' })}</Typography>
              </LoadingButton>
            ) : !communityData.isPrivate ? (
              <LoadingButton loading={joinIsLoading} onClick={handleJoin}>
                <Typography>{intl.formatMessage({ id: 'community.join' })}</Typography>
              </LoadingButton>
            ) : null)
          }
        />
        <CardActions>
          {communityMenuItems.map((menuItem, index) =>
            menuItem.visible ? (
              <Button
                key={index}
                variant="outlined"
                sx={{ minWidth: 100 }}
                onClick={() => navigate(`./${menuItem.link}`)}
              >
                <Typography>{intl.formatMessage({ id: `${menuItem.label}` })}</Typography>
              </Button>
            ) : null
          )}
        </CardActions>
      </Card>
      <Outlet />
    </Stack>
  );
};

export { CommunityDetailsRoot };
