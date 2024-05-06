import { BaseEntity } from 'types';
import { User } from '../../../types/userTypes';
import { z } from 'zod';

export type Community = {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  private: boolean;
  joined: boolean;
  memberCount: number;
  users: User[] | null;
};

export type CommunityForList = {
  id: number;
  name: string;
  imageUrl?: string | null;
  memberCount: number;
};

export const CreateCommunityFormInputSchema = z.object({
  communityName: z.string().min(1, { message: 'error.nameCantBeBlank' }),
});

export type CreateCommunityFormInput = {
  name: string;
  description: string;
  imageUrl: string | null;
  isPrivate: boolean;
};
