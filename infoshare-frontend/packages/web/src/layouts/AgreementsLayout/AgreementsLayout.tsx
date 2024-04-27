import React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Root from './AgreementsLayout.style';

const AgreementsLayout = () => {
  return (
    <Root>
      <Grid container spacing={2} justifyContent="center" textAlign={'center'}>
        <Grid item xs={12} sm={8} md={10} lg={10} xl={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Root>
  );
};

export default AgreementsLayout;
