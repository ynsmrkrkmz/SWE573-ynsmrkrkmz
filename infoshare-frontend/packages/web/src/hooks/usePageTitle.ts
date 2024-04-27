import { useAppContext } from 'contexts/AppContext';
import { useEffect, useState } from 'react';

const usePageTitle = (title?: string) => {
  const [pageTitle, setPageTitle] = useState<string>(title ?? '');
  const { setPageName } = useAppContext();

  useEffect(() => {
    pageTitle && setPageName(pageTitle);
    window.document.title = `${pageTitle} | Geralt`;
  }, [setPageName, pageTitle]);

  return { setPageTitle };
};

export default usePageTitle;
