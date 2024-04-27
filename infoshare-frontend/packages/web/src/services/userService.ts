import { useMutation, useQuery } from '@tanstack/react-query';
import { Apitypes, LoginFormInput, SignupFormInput } from 'types';
import api from './api';

const baseUrl = 'v1';

export const useGetUser = (options?: {}) => useQuery([`${baseUrl}/token`], options);

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
