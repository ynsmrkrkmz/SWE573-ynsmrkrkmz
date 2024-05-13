import { LoadingButton } from '@mui/lab';
import { FormControl, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import useFormResolver from 'hooks/useFormResolver';
import useNotification from 'hooks/useNotification';
import { FC, useCallback, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { MdInfo } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommunityContext } from 'routes/community/contexts/CommunityContext';
import { PostTemplateField, defaultPostTemplate } from 'routes/community/types/postTypes';
import { useInviteUser } from 'services/invitationService';
import { FieldTypes } from 'types';
import { UserCommunityRole } from 'types/userTypes';
import { generatePostZodSchema } from 'utils/generatePostZodSchema';
import Root from './CommunityNewPost.style';
import { z } from 'zod';
import { NewPostForm } from 'routes/community/components/NewPostForm';
import { useSubmitPost } from 'services/postService';
import { NewPostFormInput } from 'routes/community/types/postTypes';
import omit from 'lodash/omit';

const CommunityNewPost: FC = () => {
  const intl = useIntl();
  const formResolver = useFormResolver();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();
  const { communityId } = useParams();
  const { authCommunityUser } = useCommunityContext();
  const [selectedPostTemplate, setSelectedPostTemplate] = useState(0);

  let postTemplates: { id?: number; title: string; template: PostTemplateField[] }[] = [
    {
      title: 'Varsayılan Post',
      template: defaultPostTemplate,
    },
  ];

  const PostFormSchema = generatePostZodSchema(defaultPostTemplate);

  console.log(PostFormSchema);

  type PostForm = z.infer<typeof PostFormSchema>;

  const useFormMethods = useForm({
    resolver: formResolver(PostFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormMethods;

  const { mutate: submitPost, isLoading } = useSubmitPost({
    onSuccess: async () => {
      showSuccess(intl.formatMessage({ id: 'success.postSubmitted' }));
      navigate('../posts');
    },
  });

  const onFormSubmit: SubmitHandler<FieldValues> = useCallback(
    (values: PostForm) => {
      const postData: NewPostFormInput = {
        title: values.title,
        content: JSON.stringify(omit(values, ['title'])),
        communityId: communityId,
        postTemplateId: null,
      };

      submitPost(postData);
    },
    [selectedPostTemplate]
  );

  return (
    <Root>
      <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
        {intl.formatMessage({
          id: 'post.new',
        })}
        <IconButton size="small" sx={{ padding: 0, ml: 1, mb: 0.25 }}>
          <MdInfo color="#D8D9DC" />
        </IconButton>
      </Typography>
      <FormProvider {...useFormMethods}>
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
                  value={selectedPostTemplate}
                  label={intl.formatMessage({ id: 'post.template' })}
                  defaultValue={0}
                  onChange={(e) => setSelectedPostTemplate(parseInt(e.target.value))}
                >
                  {postTemplates.map((option, index) => (
                    <MenuItem key={index} value={index}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {postTemplates[selectedPostTemplate].template.map((t, i) => (
                <NewPostForm
                  key={i}
                  fieldName={t.fieldName}
                  fieldType={t.fieldType}
                  required={t.required}
                  isLoading={false}
                  index={i}
                />
              ))}
              <Grid item xs={12}>
                <LoadingButton
                  disabled={isLoading}
                  loading={isLoading}
                  variant="contained"
                  type="submit"
                  data-testid="invite-button"
                >
                  {intl.formatMessage({ id: 'post.submit' })}
                </LoadingButton>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </FormProvider>
    </Root>
  );
};

export { CommunityNewPost };
