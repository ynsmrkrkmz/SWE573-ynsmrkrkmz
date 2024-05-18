import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import useFormResolver from 'hooks/useFormResolver';
import useNotification from 'hooks/useNotification';
import omit from 'lodash/omit';
import { FC, useCallback } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { TemplateField } from 'routes/community/components/TemplateField';
import {
  NewTemplateRequest,
  PostTemplateField,
  PostTemplateSchema,
} from 'routes/community/types/postTypes';
import { useCreateTemplate } from 'services/postService';
import { FieldTypes } from 'types';
import Root from './CommunityNewTemplate.style';

const CommunityNewTemplate: FC = () => {
  const intl = useIntl();
  const formResolver = useFormResolver();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();
  const { communityId } = useParams();

  const defaultField: PostTemplateField = {
    fieldName: '',
    fieldType: FieldTypes.STRING,
    required: false,
  };

  const useFormMethods = useForm({
    resolver: formResolver(PostTemplateSchema),
    defaultValues: {
      template: [defaultField],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useFormMethods;

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'template', // unique name for your Field Array
  });

  const { mutate: createTemplate, isLoading } = useCreateTemplate({
    onSuccess: async () => {
      showSuccess(intl.formatMessage({ id: 'success.postTemplatedCreated' }));
      navigate('../posts/new-post');
    },
  });

  const onFormSubmit: SubmitHandler<FieldValues> = useCallback(
    (values) => {
      const templateData: NewTemplateRequest = {
        title: values.title,
        template: JSON.stringify(omit(values, ['title'])['template']),
        communityId: communityId!,
      };
      createTemplate(templateData);
    },
    [communityId, createTemplate]
  );

  return (
    <Root>
      <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
        {intl.formatMessage({
          id: 'post.newTemplate',
        })}
      </Typography>
      <FormProvider {...useFormMethods}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FormControl sx={{ display: 'flex' }} error={!!errors.email}>
            <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="title"
                  label={intl.formatMessage({ id: 'post.templateTitle' })}
                  disabled={isLoading}
                  error={!!errors.title}
                  inputProps={{
                    ...register('title'),
                  }}
                  helperText={errors.title && `* ${errors.title.message}`}
                />
              </Grid>
              {fields.map((item, index) => (
                <TemplateField
                  key={item.id}
                  index={index}
                  isLoading={isLoading}
                  onDeleteClick={fields.length > 1 ? () => remove(index) : undefined}
                />
              ))}
              <Grid container item xs={12} justifyContent={'center'}>
                <Button onClick={() => append(defaultField)} variant="outlined">
                  {intl.formatMessage({ id: 'post.addNewField' })}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  disabled={isLoading}
                  loading={isLoading}
                  variant="contained"
                  type="submit"
                  data-testid="invite-button"
                >
                  {intl.formatMessage({ id: 'post.createTemplate' })}
                </LoadingButton>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </FormProvider>
    </Root>
  );
};

export { CommunityNewTemplate };
