import React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Root from './AllCenteredLayout.style';

const AllCenteredLayout = () => {
  return (
    <Root>
      <Grid container spacing={2} justifyContent="center" textAlign={'center'}>
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
          <Typography marginBottom={'1.875rem'} variant={'h1'} color="primary" align="center">
            Infoshare
          </Typography>
          <Outlet />
        </Grid>
      </Grid>
    </Root>
  );
};

export default AllCenteredLayout;
