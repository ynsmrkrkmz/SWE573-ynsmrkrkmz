import zxcvbn from 'zxcvbn';

const REQUIRED_PASSWORD_STRENGTH = 4;

const refinePasswordStrength: [(data: { password: string }) => boolean, object] = [
  (data) => zxcvbn(data.password).score === REQUIRED_PASSWORD_STRENGTH,
  {
    message: 'error.passwordStrengthError',
    path: ['password'], // path of error
  },
];

export default refinePasswordStrength;
