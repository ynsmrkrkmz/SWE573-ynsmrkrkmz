import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useAuthContext } from 'contexts/AuthContext';
import useFormResolver from 'hooks/useFormResolver';
import useNotification from 'hooks/useNotification';
import omit from 'lodash/omit';
import { FC, useCallback, useMemo, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { NewPostForm } from 'routes/community/components/NewPostForm';
import { useCommunityContext } from 'routes/community/contexts/CommunityContext';
import {
  defaultPostTemplate,
  NewPostFormInput,
  PostTemplate,
  PostTemplateField,
} from 'routes/community/types/postTypes';
import { useGetCommunityTemplates, useSubmitPost } from 'services/postService';
import { UserCommunityRole } from 'types/userTypes';
import { generatePostZodSchema } from 'utils/generatePostZodSchema';
import { z } from 'zod';
import Root from './CommunityNewPost.style';

const CommunityNewPost: FC = () => {
  const intl = useIntl();
  const formResolver = useFormResolver();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();
  const { communityId } = useParams();
  const { authCommunityUser } = useCommunityContext();
  const [selectedPostTemplate, setSelectedPostTemplate] = useState(0);

  const { data } = useGetCommunityTemplates(communityId);

  const postTemplates = useMemo(() => {
    const defaultTemplate: PostTemplate = {
      id: 0,
      title: 'Varsayılan Gönderi',
      template: defaultPostTemplate,
    };
    if (data?.data) {
      let templates: PostTemplate[] = [];

      data.data.reduce((acc: PostTemplate[], curr) => {
        const template: PostTemplate = {
          id: curr.id,
          title: curr.title,
          template: JSON.parse(curr.template),
        };

        acc.push(template);

        return acc;
      }, templates);

      return [defaultTemplate, ...templates];
    }

    return [defaultTemplate];
  }, [data]);

  const PostFormSchema = generatePostZodSchema(postTemplates[selectedPostTemplate].template);

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
        postTemplateId: selectedPostTemplate === 0 ? null : postTemplates[selectedPostTemplate].id,
      };

      submitPost(postData);
    },
    [communityId, postTemplates, selectedPostTemplate, submitPost]
  );

  const handleNewTemplate = () => {
    navigate('../posts/new-template');
  };

  return (
    <Root>
      <Stack direction={'row'}>
        <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
          {intl.formatMessage({
            id: 'post.new',
          })}
        </Typography>
        {authCommunityUser?.userCommunityRole === UserCommunityRole.OWNER ? (
          <Button variant="contained" onClick={handleNewTemplate} startIcon={<AddIcon />}>
            <Typography>{intl.formatMessage({ id: 'post.newTemplate' })}</Typography>
          </Button>
        ) : null}
      </Stack>
      <FormProvider {...useFormMethods}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FormControl sx={{ display: 'flex' }}>
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
                    <MenuItem key={option.id} value={index}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {postTemplates[selectedPostTemplate].template.map((t, i) => (
                <NewPostForm
                  key={t.fieldName}
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
