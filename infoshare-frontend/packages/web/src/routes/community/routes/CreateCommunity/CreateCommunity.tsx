import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { useIntl } from 'react-intl';
import { useAppContext } from 'contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import useFormResolver from 'hooks/useFormResolver';
import { FieldValues, useForm } from 'react-hook-form';
import useNotification from 'hooks/useNotification';
import Root from './CreateCommunity.style';
import { MdInfo } from 'react-icons/md';
import { LoadingButton } from '@mui/lab';
import { CreateCommunityFormInputSchema } from 'routes/community/types/communityTypes';
import { useCreateCommunity } from 'services/communityService';
import { useQueryClient } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';

const CreateCommunity: FC = () => {
  const intl = useIntl();
  const { language } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSuccess } = useNotification();
  const formResolver = useFormResolver();
  const [isPrivate, setIsPrivate] = useState(true);
  const mdStr = `# Create your community about page`;
  const [markdown, setMarkdown] = useState<string | undefined>(mdStr);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: formResolver(CreateCommunityFormInputSchema),
  });

  const {
    mutateAsync: createCommunityMutate,
    isLoading,
    isSuccess,
  } = useCreateCommunity({
    onSuccess: () => {
      showSuccess(intl.formatMessage({ id: 'success.communityCreated' }));
      queryClient.invalidateQueries({ queryKey: ['user-communities'] });
      navigate('/');
    },
  });

  const handleChange = () => {
    setIsPrivate((checked) => !checked);
  };

  const onFormSubmit = async ({ communityName }: FieldValues) => {
    const { meta } = await createCommunityMutate({
      name: communityName,
      description: markdown ?? '',
      imageUrl: null,
      isPrivate: isPrivate,
    });
    console.log({
      name: communityName,
      description: markdown ?? '',
      imageUrl: null,
      isPrivate: isPrivate,
    });
  };

  return (
    <Root>
      <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
        {intl.formatMessage({
          id: 'community.createCommunity',
        })}
        <IconButton size="small" sx={{ padding: 0, ml: 1, mb: 0.25 }}>
          <MdInfo color="#D8D9DC" />
        </IconButton>
      </Typography>

      <form id="information-form" onSubmit={handleSubmit(onFormSubmit)}>
        <FormControl sx={{ marginTop: 4 }} fullWidth>
          <Grid container spacing={1} columns={{ xs: 6, sm: 6, md: 12 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="communityName"
                label={intl.formatMessage({ id: 'community.name' })}
                disabled={isLoading}
                error={!!errors.communityName}
                helperText={errors.communityName && `* ${errors.communityName.message}`}
                inputProps={{
                  ...register('communityName'),
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                id="communityImage"
                label={intl.formatMessage({ id: 'community.image' })}
                disabled={isLoading}
                error={!!errors.communityImage}
                helperText={errors.communityImage && `* ${errors.communityImage.message}`}
                inputProps={{
                  ...register('communityImage'),
                }}
              />
            </Grid> */}
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox checked={isPrivate} onChange={handleChange} disabled={isLoading} />
                }
                label={intl.formatMessage({ id: 'generic.private' })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {intl.formatMessage({
                  id: 'community.description',
                })}
              </Typography>
              <div data-color-mode="light">
                <MDEditor value={markdown} onChange={(value, event) => setMarkdown(value)} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                disabled={isLoading}
                loading={isLoading}
                variant="contained"
                type="submit"
                data-testid="sign-in-button"
              >
                {intl.formatMessage({ id: 'community.createCommunity' })}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </Root>
  );
};

export { CreateCommunity };
