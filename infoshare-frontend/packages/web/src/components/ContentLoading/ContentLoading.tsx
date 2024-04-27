import React, { FC } from 'react';
import Root from './ContentLoading.style';
import CircularProgress from '@mui/material/CircularProgress';

const ContentLoading: FC<{
  height?: number;
}> = ({ height = 300 }) => {
  return (
    <Root $height={height}>
      <CircularProgress />
    </Root>
  );
};

export default ContentLoading;
