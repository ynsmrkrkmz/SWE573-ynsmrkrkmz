import { useMutation } from '@tanstack/react-query';
import { Apitypes } from 'types';
import api from './api';
import { NewPostFormInput } from 'routes/community/types/postTypes';

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
