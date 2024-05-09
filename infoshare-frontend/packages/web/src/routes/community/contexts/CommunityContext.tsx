import React, { FC, ReactNode, useContext, useMemo, useState } from 'react';
import { User } from 'types/userTypes';

type CommunityContextProps = {
  communityId?: string;
  setCommunityId: (value: string | undefined) => void;
  description: string;
  setDescription: (value: string) => void;
  authCommunityUser: User | null;
  setAuthCommunityUser: (value: User | null) => void;
  communityUsers: User[] | null;
  setCommunityUsers: (value: User[] | null) => void;
};

const CommunityContext = React.createContext<CommunityContextProps>({
  communityId: undefined,
  setCommunityId: () => {},
  description: '',
  setDescription: (value: string) => {},
  authCommunityUser: null,
  setAuthCommunityUser: (value: User | null) => {},
  communityUsers: null,
  setCommunityUsers: (value: User[] | null) => {},
});

CommunityContext.displayName = 'CommunityContext';

export const useCommunityContext = () => useContext(CommunityContext);

type Props = {
  children: ReactNode;
};

export const CommunityProvider: FC<Props> = ({ children }) => {
  const [communityId, setCommunityId] = useState<string | undefined>();
  const [description, setDescription] = useState<string>('');
  const [authCommunityUser, setAuthCommunityUser] = useState<User | null>(null);
  const [communityUsers, setCommunityUsers] = useState<User[] | null>(null);

  const contextValue: CommunityContextProps = useMemo(
    () => ({
      communityId,
      setCommunityId,
      description,
      setDescription,
      authCommunityUser,
      setAuthCommunityUser,
      communityUsers,
      setCommunityUsers,
    }),
    [description, communityId, authCommunityUser, communityUsers]
  );

  return <CommunityContext.Provider value={contextValue}>{children}</CommunityContext.Provider>;
};
