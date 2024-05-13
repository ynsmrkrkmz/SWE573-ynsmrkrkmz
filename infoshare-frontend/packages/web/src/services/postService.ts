import { useMutation, useQuery } from '@tanstack/react-query';
import { Apitypes } from 'types';
import api from './api';
import { NewPostFormInput, PostDetails } from 'routes/community/types/postTypes';

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
