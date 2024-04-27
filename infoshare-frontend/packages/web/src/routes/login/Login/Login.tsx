import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PasswordField from 'components/PasswordField';
import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useAppContext } from 'contexts/AppContext';
import { useAuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import useFormResolver from 'hooks/useFormResolver';
import { FieldValues, useForm } from 'react-hook-form';
import { LoginFormInputSchema } from 'types';
import Root from './Login.style';
import { useLogin } from 'services/userService';
import useHandleError from 'hooks/useHandleError';

const Login: FC = () => {
  const intl = useIntl();
  const { language } = useAppContext();
  const { signIn, isSignedIn, isLoading: isAuthLoading } = useAuthContext();
  const navigate = useNavigate();
  const formResolver = useFormResolver();
  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: formResolver(LoginFormInputSchema),
  });

  useEffect(() => {
    if (isSignedIn && !isLoading && !isAuthLoading) {
      navigate('/');
    }
  }, [isLoading, navigate, isSignedIn, isAuthLoading]);

  const onSubmit = async ({ email, password }: FieldValues) => {
    await signIn({ email, password });
  };

  return (
    <Stack spacing={2} alignItems={'center'}>
      <Card>
        <CardContent>
          <CardHeader
            align="center"
            title={intl.formatMessage({
              id: 'loginForm.title',
            })}
            subheader={intl.formatMessage({
              id: 'loginForm.subTitle',
            })}
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.email}>
                  <TextField
                    id="email"
                    label={intl.formatMessage({ id: 'generic.email' })}
                    disabled={isLoading}
                    error={!!errors.email}
                    inputProps={{
                      ...register('email'),
                      'data-testid': 'email-field',
                    }}
                    helperText={errors.email && `* ${errors.email.message}`}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <PasswordField
                  fullWidth
                  label={intl.formatMessage({ id: 'generic.password' })}
                  disabled={isLoading}
                  error={!!errors.password}
                  inputProps={register('password')}
                  helperText={errors.password && `* ${errors.password.message}`}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  fullWidth
                  disabled={isLoading}
                  loading={isLoading}
                  variant="contained"
                  type="submit"
                  data-testid="sign-in-button"
                >
                  {intl.formatMessage({ id: 'generic.login' })}
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Box width={'100%'} paddingX={1}>
        <Divider />
      </Box>
      <Stack direction={'row'} spacing={1}>
        {intl.formatMessage({
          id: 'loginform.dontHaveAccount',
        })}
        <Link
          onClick={() => {
            navigate('/sign-up');
          }}
        >
          <Typography>
            {intl.formatMessage({
              id: 'generic.signup',
            })}
          </Typography>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Login;
