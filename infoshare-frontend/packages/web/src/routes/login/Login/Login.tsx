import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PasswordField from 'components/PasswordField';
import { useAuthContext } from 'contexts/AuthContext';
import useFormResolver from 'hooks/useFormResolver';
import { FC, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { LoginFormInputSchema } from 'types/userTypes';

const Login: FC = () => {
  const intl = useIntl();
  const { signIn, isSignedIn, isLoading: isAuthLoading, isSigninLoading } = useAuthContext();
  const navigate = useNavigate();
  const formResolver = useFormResolver();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: formResolver(LoginFormInputSchema),
  });

  useEffect(() => {
    if (isSignedIn && !isAuthLoading) {
      navigate('/');
    }
  }, [navigate, isSignedIn, isAuthLoading]);

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
                    disabled={isSigninLoading}
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
                  disabled={isSigninLoading}
                  error={!!errors.password}
                  inputProps={register('password')}
                  helperText={errors.password && `* ${errors.password.message}`}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  fullWidth
                  disabled={isSigninLoading}
                  loading={isSigninLoading}
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
