// import { checkPermission } from '@geralt/backend/src/utils/permission';
// import { PermissionInfo } from '@geralt/backend/src/components/user/userEntities';
import { useAuthContext } from '../contexts/AuthContext';
import { useMemo } from 'react';

const useCheckPermission = ({ name, access_code }: any): boolean => {
  const { user } = useAuthContext();

  return useMemo(() => {
    if (!user) {
      return false;
    }

    return true; //checkPermission(user, { name, access_code });
  }, [user]);
};

export default useCheckPermission;
