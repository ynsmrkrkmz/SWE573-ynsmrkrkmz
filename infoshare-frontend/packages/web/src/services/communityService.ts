import { useMutation, useQuery } from '@tanstack/react-query';
import { Apitypes } from 'types';
import api from './api';
import { User } from 'types/userTypes';
import {
  Community,
  CommunityForList,
  CreateCommunityFormInput,
} from 'routes/community/types/communityTypes';

const baseUrl = 'v1/communities';

export const useCreateCommunity = (options = {}) =>
  useMutation(
    async (data: CreateCommunityFormInput) => {
      return api.fetch({
        method: Apitypes.POST,
        url: `${baseUrl}/create-community`,
        data,
      });
    },
    {
      ...options,
    }
  );

export const useGetUserCommunities = (enabled = true) =>
  useQuery(
    ['user-communities'],
    async () => {
      return api.fetch<CommunityForList[]>({
        url: `${baseUrl}/mine`,
      });
    },
    {
      enabled,
    }
  );

export const useAllCommunities = (enabled = true) =>
  useQuery(
    ['all-communities'],
    async () => {
      return api.fetch<CommunityForList[]>({
        url: `${baseUrl}/all`,
      });
    },
    {
      enabled,
    }
  );

export const useGetCommunityDetailsById = (communityId: string | undefined, enabled = true) =>
  useQuery(
    [`community-details-${communityId}`],
    async () => {
      return api.fetch<Community>({
        url: `${baseUrl}/${communityId}`,
      });
    },
    {
      enabled,
    }
  );

export const useJoinCommunity = (options = {}) =>
  useMutation(
    async ({ communityId }: { communityId: string | undefined }) => {
      return api.fetch({
        method: Apitypes.POST,
        url: `${baseUrl}/join-community?communityId=${communityId}`,
      });
    },
    {
      ...options,
    }
  );

export const useLeaveCommunity = (options = {}) =>
  useMutation(
    async ({ communityId }: { communityId: string | undefined }) => {
      return api.fetch({
        method: Apitypes.PUT,
        url: `${baseUrl}/leave-community?communityId=${communityId}`,
      });
    },
    {
      ...options,
    }
  );
