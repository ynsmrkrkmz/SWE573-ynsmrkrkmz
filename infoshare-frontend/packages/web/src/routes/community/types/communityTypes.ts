import { BaseEntity } from 'types';
import { User, UserCommunityRole } from '../../../types/userTypes';
import { z } from 'zod';

export type Community = {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  isPrivate: boolean;
  isJoined: boolean;
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

export const InviteNewUserFormInputSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'error.emailCantBeBlank' })
    .email({ message: 'error.invalidEmail' }),
  userCommunityRole: z.enum([
    UserCommunityRole.OWNER,
    UserCommunityRole.MODERATOR,
    UserCommunityRole.MEMBER,
  ]),
});

export type InviteNewUserFormInput = z.infer<typeof InviteNewUserFormInputSchema> & {
  communityId: string | undefined;
};
