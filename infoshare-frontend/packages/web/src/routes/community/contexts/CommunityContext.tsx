import React, { FC, ReactNode, useContext, useMemo, useState } from 'react';

type CommunityContextProps = {
  communityId?: string;
  setCommunityId: (value: string | undefined) => void;
  description: string;
  setDescription: (value: string) => void;
};

const CommunityContext = React.createContext<CommunityContextProps>({
  communityId: undefined,
  setCommunityId: () => {},
  description: '',
  setDescription: (value: string) => {},
});

CommunityContext.displayName = 'CommunityContext';

export const useCommunityContext = () => useContext(CommunityContext);

type Props = {
  children: ReactNode;
};

export const CommunityProvider: FC<Props> = ({ children }) => {
  const [communityId, setCommunityId] = useState<string | undefined>();
  const [description, setDescription] = useState<string>('');

  const contextValue: CommunityContextProps = useMemo(
    () => ({
      communityId,
      setCommunityId,
      description,
      setDescription,
    }),
    [description, communityId]
  );

  return <CommunityContext.Provider value={contextValue}>{children}</CommunityContext.Provider>;
};
