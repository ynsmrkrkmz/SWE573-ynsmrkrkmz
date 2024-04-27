import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useTabRoute = (routes: { [path: string]: number | undefined }) => {
  const location = useLocation();
  const paths = location.pathname.split('/');
  const path = paths[paths.length - 1];
  const [tabIndex, setTabIndex] = useState(routes[path] ?? 0);

  useEffect(() => {
    setTabIndex(routes[path] ?? 0);
  }, [path, routes]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return { tabIndex, handleTabChange };
};

export default useTabRoute;
