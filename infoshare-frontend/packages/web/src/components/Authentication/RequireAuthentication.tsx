import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';

const RequireAuthentication = () => {
  const location = useLocation();
  const { isSignedIn } = useAuthContext();

  return !isSignedIn ? <Navigate to="/login" state={{ from: location }} replace /> : <Outlet />;
};

export default RequireAuthentication;
