import useHandleError from 'hooks/useHandleError';
import React, { FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { LoginFormInput, User } from 'types/userTypes';
import { deleteToken, getAuth, getToken, getUserFromToken, setToken } from 'utils/authentication';
import { useAppContext } from './AppContext';
import { useGetUser, useLogin } from 'services/userService';

type AuthContextProps = {
  user: User | undefined;
  userClaims: any | undefined;
  isSignedIn: boolean;
  isSigninLoading: boolean;
  isLoading: boolean;
  signIn: (props: LoginFormInput) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextProps>({
  user: undefined,
  userClaims: undefined,
  isSignedIn: false,
  isSigninLoading: false,
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
  const [isSigninLoading, setSigninIsLoading] = useState(false);
  const [idToken, setIdToken] = useState<string | null>(null);

  const auth = useMemo(() => {
    const token = getAuth();

    return token;
  }, [idToken]);

  const { refetch: getUser } = useGetUser(false);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }

    const subscribe = async () => {
      const { data } = await getUser();
      setUser(data?.data);
      setIsSignedIn(!!data?.data);
      setIsLoading(false);
    };

    subscribe();
  }, [auth, getUser]);

  const { mutateAsync: signInMutate } = useLogin();

  const signIn = useCallback(
    async ({ email, password }: LoginFormInput) => {
      setSigninIsLoading(true);
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
      setSigninIsLoading(false);
      setToken(data.token);
      setIdToken(data.token);
    },
    [handleError, intl, signInMutate]
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    setUser(undefined);
    setIsSignedIn(false);
    setUserClaims(undefined);
    setIsLoading(false);
    deleteToken();
  }, []);

  const contextValue = useMemo(() => {
    const values: AuthContextProps = {
      user,
      userClaims,
      isSignedIn,
      isLoading,
      isSigninLoading,
      signIn,
      signOut,
    };

    return values;
  }, [user, userClaims, isSignedIn, isLoading, isSigninLoading, signIn, signOut]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
