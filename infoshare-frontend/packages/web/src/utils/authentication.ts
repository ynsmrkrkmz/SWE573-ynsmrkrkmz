import { isExpired, decodeToken } from 'react-jwt';
import { User } from 'types/userTypes';

export const getAuth = (): string | null => {
  const token = getToken();

  if (!token) return null;
  if (isExpired(token)) return null;
  return token;
};

export const setToken = (token: string) => localStorage.setItem('access_token', token);

export const getUserFromToken = (token: string): User | null => decodeToken<User>(token);

export const getToken = () => localStorage.getItem('access_token');

export const deleteToken = () => localStorage.removeItem('access_token');
