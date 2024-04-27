import React, { FC } from 'react';
import { ZXCVBNScore } from 'zxcvbn';
import Grid from '@mui/material/Grid';
import Root, { StrengthBarItem } from './PasswordStrength.style';

const PasswordStrength: FC<{
  score?: ZXCVBNScore;
}> = ({ score }) => {
  const defaultColor = '#898989';

  const calculateColor = (barIndex: number) => {
    if (!score) {
      return defaultColor;
    }

    if (score <= 1 && barIndex <= score) {
      return '#ffc400';
    }

    if (score <= 2 && barIndex <= score) {
      return '#ff9100';
    }

    if (score <= 3 && barIndex <= score) {
      return '#5393ff';
    }

    if (score <= 4 && barIndex <= score) {
      return '#00a152';
    }

    return defaultColor;
  };

  return (
    <Root>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <StrengthBarItem color={calculateColor(1)} />
        </Grid>
        <Grid item xs={3}>
          <StrengthBarItem color={calculateColor(2)} />
        </Grid>
        <Grid item xs={3}>
          <StrengthBarItem color={calculateColor(3)} />
        </Grid>
        <Grid item xs={3}>
          <StrengthBarItem color={calculateColor(4)} />
        </Grid>
      </Grid>
    </Root>
  );
};

export default PasswordStrength;
