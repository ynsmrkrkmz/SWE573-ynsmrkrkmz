// import { PermissionInfo } from '@geralt/backend/src/components/user/userEntities';
import { useLocation, useNavigate } from 'react-router-dom';
import useCheckPermission from './useCheckPermission';

type Props = {
  to?: string;
};

const useRoutePermission = ({ name, access_code, to = '/not-found' }: any): void => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasAccess = useCheckPermission({ name, access_code });

  if (!hasAccess) {
    navigate(to, { state: { from: location }, replace: true });
  }
};

export default useRoutePermission;
