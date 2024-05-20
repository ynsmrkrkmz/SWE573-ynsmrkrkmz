import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import FontFace from 'assets/fonts/fontFace.style';
import RequireAuthentication from 'components/Authentication/RequireAuthentication';
import ContentLoading from 'components/ContentLoading';
import { useAuthContext } from 'contexts/AuthContext';
import AgreementsLayout from 'layouts/AgreementsLayout';
import AllCenteredLayout from 'layouts/AllCenteredLayout';
import DefaultLayout from 'layouts/DefaultLayout';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import CommunityRoute from 'routes/community';
import { HomeRoute } from 'routes/home';
import LoginRoute from 'routes/login';
import SignupRoute from 'routes/signup';
import { UserRoute } from 'routes/user';
import GlobalStyles, { AppLoaderWrapper } from './App.style';

const App: FC = () => {
  const { isLoading } = useAuthContext();
  return (
    <>
      <CssBaseline />
      <Global styles={GlobalStyles} />
      <Global styles={FontFace} />

      {isLoading && (
        <AppLoaderWrapper>
          <ContentLoading />
        </AppLoaderWrapper>
      )}

      {!isLoading && (
        <Routes>
          {/* Default Layout */}
          <Route element={<RequireAuthentication />}>
            <Route element={<DefaultLayout />}>
              <Route path="/*" element={<HomeRoute />} />
              <Route path="/communities/*" element={<CommunityRoute />} />
              <Route path="/user/*" element={<UserRoute />} />
            </Route>
          </Route>

          {/* All Centered Layout */}
          <Route element={<AllCenteredLayout />}>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/sign-up" element={<SignupRoute />} />
          </Route>

          {/* <Route element={<AgreementsLayout />}> */}
          {/* <Route path="/notifications/*" element={<Notifications />} /> */}
          {/* </Route> */}

          {/* No Layout */}
          {/* <Route path="/not-found" element={<Http404Page />} />
          <Route path="*" element={<Http404Page />} /> */}
        </Routes>
      )}
    </>
  );
};

App.propTypes = {
  children: PropTypes.any,
};

App.defaultProps = {
  children: null,
};

export default App;
