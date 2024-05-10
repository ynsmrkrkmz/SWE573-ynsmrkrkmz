import { LoadingButton } from '@mui/lab';
import { FormControl, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import useFormResolver from 'hooks/useFormResolver';
import useNotification from 'hooks/useNotification';
import { FC, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { MdInfo } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommunityContext } from 'routes/community/contexts/CommunityContext';
import { InviteNewUserFormInputSchema } from 'routes/community/types/communityTypes';
import { useInviteUser } from 'services/communityService';
import { UserCommunityRole } from 'types/userTypes';
import Root from './CommunityNewInvitation.style';

const CommunityNewInvitation: FC = () => {
  const intl = useIntl();
  const formResolver = useFormResolver();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();
  const { communityId } = useParams();
  const { authCommunityUser } = useCommunityContext();
  const [userRole, setUserRole] = useState<UserCommunityRole>(UserCommunityRole.MEMBER);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: formResolver(InviteNewUserFormInputSchema),
  });

  const { mutateAsync: inviteMutate, isLoading } = useInviteUser({
    onSuccess: async () => {
      showSuccess(intl.formatMessage({ id: 'success.userInvited' }));
      navigate('../invitations');
    },
  });

  const onFormSubmit: SubmitHandler<FieldValues> = async ({ email, userCommunityRole }, e) => {
    await inviteMutate({ communityId: communityId, email, userCommunityRole });
  };

  return (
    <Root>
      <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
        {intl.formatMessage({
          id: 'community.newInvitation',
        })}
        <IconButton size="small" sx={{ padding: 0, ml: 1, mb: 0.25 }}>
          <MdInfo color="#D8D9DC" />
        </IconButton>
      </Typography>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormControl error={!!errors.email}>
          <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label={intl.formatMessage({ id: 'generic.email' })}
                disabled={isLoading}
                error={!!errors.email}
                inputProps={{
                  ...register('email'),
                }}
                helperText={errors.email && `* ${errors.email.message}`}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="user-community-role"
                select
                value={userRole}
                label={intl.formatMessage({ id: 'community.role' })}
                defaultValue={UserCommunityRole.MEMBER}
                onChange={(e) => setUserRole(e.target.value as UserCommunityRole)}
                inputProps={{
                  ...register('userCommunityRole'),
                }}
              >
                {Object.keys(UserCommunityRole).map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    disabled={
                      authCommunityUser?.userCommunityRole === UserCommunityRole.OWNER ||
                      (authCommunityUser?.userCommunityRole === UserCommunityRole.MODERATOR &&
                        option === UserCommunityRole.MEMBER)
                        ? false
                        : true
                    }
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                disabled={isLoading}
                loading={isLoading}
                variant="contained"
                type="submit"
                data-testid="invite-button"
              >
                {intl.formatMessage({ id: 'community.invite' })}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </Root>
  );
};

export { CommunityNewInvitation };
