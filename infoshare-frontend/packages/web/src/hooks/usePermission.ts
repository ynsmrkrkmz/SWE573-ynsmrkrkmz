import { useAuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const usePermission = () => {
  const { userClaims, isLoading, isSignedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isSignedIn || !userClaims?.custom || userClaims.custom.isMfaRequired) {
      navigate('/sign-in');
    }
  }, [isLoading, isSignedIn, navigate, userClaims]);
};

export default usePermission;
