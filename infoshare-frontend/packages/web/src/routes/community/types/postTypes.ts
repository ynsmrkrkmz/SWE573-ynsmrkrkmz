import { FieldTypes } from 'types';

export type NewPostFormInput = {
  title: string;
  content: string;
  communityId: string | undefined;
  postTemplateId: number | null;
};

export type PostDetails = {
  id: number;
  title: string;
  content: string;
  communityId: number;
  communityName?: string;
  voteCount: number | null;
  createdById: number;
  createdByName: string;
  createdAt: string;
  postTemplate: PostTemplateField[] | null;
};

export type PostTemplateField = {
  fieldName: string;
  fieldType: FieldTypes;
  required: boolean;
};

export const defaultPostTemplate: PostTemplateField[] = [
  {
    fieldName: 'İçerik',
    fieldType: FieldTypes.TEXTAREA,
    required: true,
  },
];
