import { useMutation, useQuery } from '@tanstack/react-query';
import { Apitypes } from 'types';
import api from './api';
import { LoginFormInput, SignupFormInput, User } from 'types/userTypes';

const baseUrl = 'v1';

export const useLogin = () =>
  useMutation(async (data: LoginFormInput) => {
    return api.fetch<{ token: string }>({
      method: Apitypes.POST,
      url: `${baseUrl}/auth/login`,
      data,
      useAuthorizationHeader: false,
    });
  });

export const useSignup = () =>
  useMutation(async (data: SignupFormInput) => {
    return api.fetch({
      method: Apitypes.POST,
      url: `${baseUrl}/auth/sign-up`,
      data,
      useAuthorizationHeader: false,
    });
  });

export const useGetUser = (enabled = true) =>
  useQuery(
    ['user.me'],
    async () => {
      return api.fetch<User>({
        url: `${baseUrl}/users/me`,
      });
    },
    {
      enabled,
    }
  );

export const useGetUserById = (userId: string | undefined, enabled = true) =>
  useQuery(
    [`user-${userId}`, userId],
    async () => {
      if (!userId) return;

      return api.fetch<User>({
        url: `${baseUrl}/users/${userId}`,
      });
    },
    {
      enabled,
    }
  );
