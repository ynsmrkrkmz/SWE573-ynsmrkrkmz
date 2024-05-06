import { Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Header from 'components/Header';
import LeftMenu from 'components/LeftMenu';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <Box sx={{ display: 'block', pt: '65px', overflow: 'hidden' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
        <Divider />
        <Stack direction={'row'} height={'100%'}>
          <Box sx={{ width: '256px' }}>
            <LeftMenu />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 1, overflow: 'overlay' }}>
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
