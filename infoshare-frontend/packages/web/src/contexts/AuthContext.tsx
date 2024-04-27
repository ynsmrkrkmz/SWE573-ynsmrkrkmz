import useHandleError from 'hooks/useHandleError';
import React, { FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { User } from 'types/userTypes';
import { getAuth, getUserFromToken, setToken } from 'utils/authentication';
import { useAppContext } from './AppContext';
import { LoginFormInput } from 'types';
import { useLogin } from 'services/userService';

type AuthContextProps = {
  user: User | undefined;
  userClaims: any | undefined;
  isSignedIn: boolean;
  isLoading: boolean;
  signIn: (props: LoginFormInput) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextProps>({
  user: undefined,
  userClaims: undefined,
  isSignedIn: false,
  isLoading: true,
  signIn: () => {
    throw Error('not defined');
  },
  signOut: () => {
    throw Error('not defined');
  },
});

AuthContext.displayName = 'AuthContext';

export const useAuthContext = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const intl = useIntl();
  const handleError = useHandleError();
  const { language } = useAppContext();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User>();
  const [userClaims, setUserClaims] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);

  const auth = useMemo(() => {
    const _auth = getAuth();

    return _auth;
  }, [language]);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }

    const subscribe = () => {
      setUserClaims(auth.claims);
      setUser(auth);
      setIsSignedIn(true);
      setIsLoading(false);
    };

    return () => subscribe();
  }, [auth]);

  const { mutateAsync: signInMutate } = useLogin();

  const signIn = useCallback(
    async ({ email, password }: LoginFormInput) => {
      const { data } = await signInMutate({
        email,
        password,
      });

      if (!data) {
        handleError(new Error('Could not get "token"'));
        throw new Error(
          intl.formatMessage({
            id: 'error.unexpectedError',
          })
        );
      }

      const user = getUserFromToken(data.token);

      if (!user) {
        handleError(new Error('Could not get "user".'));
        throw new Error(
          intl.formatMessage({
            id: 'error.unexpectedError',
          })
        );
      }

      setToken(data.token);
      setUserClaims(user.claims);
      setUser(user);
      setIsSignedIn(true);
    },
    [handleError, intl, signInMutate]
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    setUser(undefined);
    setIsSignedIn(false);
    setUserClaims(undefined);
    setIsLoading(false);
  }, []);

  const contextValue = useMemo(() => {
    const values: AuthContextProps = {
      user,
      userClaims,
      isSignedIn,
      isLoading,
      signIn,
      signOut,
    };

    return values;
  }, [user, userClaims, isSignedIn, isLoading, signIn, signOut]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
