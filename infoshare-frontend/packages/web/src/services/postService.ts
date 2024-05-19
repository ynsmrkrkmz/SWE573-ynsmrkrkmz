import { useMutation, useQuery } from '@tanstack/react-query';
import { Apitypes } from 'types';
import api from './api';
import {
  NewPostFormInput,
  NewTemplateRequest,
  PostDetails,
  PostTemplate,
  PostTemplateResponse,
} from 'routes/community/types/postTypes';

const baseUrl = 'v1/posts';

export const useSubmitPost = (options = {}) =>
  useMutation(
    async (data: NewPostFormInput) => {
      return api.fetch({
        method: Apitypes.POST,
        url: `${baseUrl}`,
        data,
      });
    },
    {
      ...options,
    }
  );

export const useGetCommunityPosts = (communityId: string | undefined, enabled = true) =>
  useQuery(
    ['community-posts', communityId],
    async () => {
      return api.fetch<PostDetails[]>({
        url: `${baseUrl}?communityId=${communityId}`,
      });
    },
    {
      enabled,
    }
  );

export const useGetUserCommunityPosts = (enabled = true) =>
  useQuery(
    ['user-community-posts'],
    async () => {
      return api.fetch<PostDetails[]>({
        url: `${baseUrl}`,
      });
    },
    {
      enabled,
    }
  );

export const useCreateTemplate = (options = {}) =>
  useMutation(
    async (data: NewTemplateRequest) => {
      return api.fetch({
        method: Apitypes.POST,
        url: `${baseUrl}/new-template`,
        data,
      });
    },
    {
      ...options,
    }
  );

export const useGetCommunityTemplates = (communityId: string | undefined, enabled = true) =>
  useQuery(
    ['community-templates', communityId],
    async () => {
      return api.fetch<PostTemplateResponse[]>({
        url: `${baseUrl}/templates?communityId=${communityId}`,
      });
    },
    {
      enabled,
    }
  );
