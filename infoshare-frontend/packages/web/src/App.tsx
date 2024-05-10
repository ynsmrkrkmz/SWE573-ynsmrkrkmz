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
import GlobalStyles, { AppLoaderWrapper } from './App.style';
import LoginRoute from 'routes/login';
import SignupRoute from 'routes/signup';
import CommunityRoute from 'routes/community';

const App: FC = () => {
  const { isLoading } = useAuthContext();
  document.body.style.overflow = 'hidden';
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
              <Route path="/*" element={<h3>default</h3>} />
              <Route path="/communities/*" element={<CommunityRoute />} />
            </Route>
          </Route>

          {/* All Centered Layout */}
          <Route element={<AllCenteredLayout />}>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/sign-up" element={<SignupRoute />} />
          </Route>

          <Route element={<AgreementsLayout />}>
            {/* <Route path="/notifications/*" element={<Notifications />} /> */}
          </Route>

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
