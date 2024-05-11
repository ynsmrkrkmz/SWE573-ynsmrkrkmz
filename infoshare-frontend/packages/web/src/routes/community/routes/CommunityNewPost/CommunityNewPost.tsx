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
import {
  InviteNewUserFormInputSchema,
  PostTemplateField,
} from 'routes/community/types/communityTypes';
import { useInviteUser } from 'services/invitationService';
import { UserCommunityRole } from 'types/userTypes';
import Root from './CommunityNewPost.style';
import { jsonSchemaToZod } from 'json-schema-to-zod';

const CommunityNewPost: FC = () => {
  const intl = useIntl();
  const formResolver = useFormResolver();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();
  const { communityId } = useParams();
  const { authCommunityUser } = useCommunityContext();
  const [postTemplate, setPostTemplate] = useState(0);

  const defaultPostTemplate: PostTemplateField[] = [
    {
      fieldName: 'Content',
      fieldType: 'string',
      isRequired: true,
    },
  ];

  const postTemplates: { title: string; template: string }[] = [
    {
      title: 'Varsayılan Post',
      template: JSON.stringify(defaultPostTemplate),
    },
  ];

  console.log(JSON.parse(postTemplates[postTemplate].template));

  console.log(jsonSchemaToZod(JSON.parse(postTemplates[postTemplate].template)));

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
        <FormControl sx={{ display: 'flex' }} error={!!errors.email}>
          <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="title"
                label={intl.formatMessage({ id: 'post.title' })}
                disabled={isLoading}
                error={!!errors.title}
                inputProps={{
                  ...register('title'),
                }}
                helperText={errors.title && `* ${errors.title.message}`}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="post-template"
                select
                value={postTemplate}
                label={intl.formatMessage({ id: 'post.template' })}
                defaultValue={UserCommunityRole.MEMBER}
                onChange={(e) => setPostTemplate(parseInt(e.target.value))}
                inputProps={{
                  ...register('postTemplate'),
                }}
              >
                {postTemplates.map((option, index) => (
                  <MenuItem key={index} value={index}>
                    {option.title}
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

export { CommunityNewPost };
