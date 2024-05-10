import { useMutation, useQuery } from '@tanstack/react-query';
import { Apitypes } from 'types';
import api from './api';
import { User } from 'types/userTypes';
import {
  Community,
  CommunityForList,
  CommunityInvitation,
  CreateCommunityFormInput,
  InviteNewUserFormInput,
} from 'routes/community/types/communityTypes';

const baseUrl = 'v1/invitations';

export const useInviteUser = (options = {}) =>
  useMutation(
    async (data: InviteNewUserFormInput) => {
      return api.fetch({
        method: Apitypes.POST,
        url: `${baseUrl}/invite-user`,
        data,
      });
    },
    {
      ...options,
    }
  );

export const useGetCommunityInvitations = (communityId: string | undefined, enabled = true) =>
  useQuery(
    ['community-invitations', communityId],
    async () => {
      return api.fetch<CommunityInvitation[]>({
        url: `${baseUrl}?communityId=${communityId}`,
      });
    },
    {
      enabled,
    }
  );

export const useCancelInvitation = (options = {}) =>
  useMutation(
    async (invitationId: string | undefined) => {
      return api.fetch({
        method: Apitypes.PUT,
        url: `${baseUrl}/${invitationId}/cancel-invitation`,
      });
    },
    {
      ...options,
    }
  );

export const useAcceptInvitation = (options = {}) =>
  useMutation(
    async (invitationId: string) => {
      return api.fetch({
        method: Apitypes.PUT,
        url: `${baseUrl}/${invitationId}/accept-invitation`,
      });
    },
    {
      ...options,
    }
  );

export const useRejctInvitation = (options = {}) =>
  useMutation(
    async (invitationId: string) => {
      return api.fetch({
        method: Apitypes.PUT,
        url: `${baseUrl}/${invitationId}/reject-invitation`,
      });
    },
    {
      ...options,
    }
  );
