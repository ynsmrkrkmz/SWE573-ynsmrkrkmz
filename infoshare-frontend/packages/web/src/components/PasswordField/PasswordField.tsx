import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import PasswordStrength from 'components/PasswordStrength';

import React, { FC, useState } from 'react';
import { ZXCVBNScore } from 'zxcvbn';

type PasswordFieldProps = TextFieldProps & {
  showStrengthBar?: boolean;
  strengthScore?: ZXCVBNScore;
};

const PasswordField: FC<PasswordFieldProps> = ({ showStrengthBar, strengthScore, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <TextField
        {...rest}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{ cursor: 'pointer' }}>
              {showPassword ? (
                <Visibility onClick={handleClickShowPassword} />
              ) : (
                <VisibilityOff onClick={handleClickShowPassword} />
              )}
            </InputAdornment>
          ),
        }}
      />
      {showStrengthBar && <PasswordStrength score={strengthScore} />}
    </>
  );
};

export default PasswordField;
