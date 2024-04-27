import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Header from 'components/Header';
import { useAppContext } from 'contexts/AppContext';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const DefaultLayout = () => {
  const { pageName } = useAppContext();

  return (
    <Box sx={{ display: 'flex', pt: 5, pl: 2 }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Divider />
        <Typography variant={'h1'} color="primary" sx={{ flexGrow: 1, mt: 2 }}>
          {pageName || (
            <Box sx={{ height: 29, display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
              <CircularProgress size={20} />
            </Box>
          )}
        </Typography>
        <Box sx={{ my: 2 }}>
          <Breadcrumbs />
        </Box>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
