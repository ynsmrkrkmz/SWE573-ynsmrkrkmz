import { FieldTypes } from 'types';
import { z } from 'zod';

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

const PostTemplateFieldSchema = z.object({
  fieldName: z.string().min(1, { message: 'error.fieldNameCantBeBlank' }),
  fieldType: z.enum([
    FieldTypes.INTEGER,
    FieldTypes.STRING,
    FieldTypes.BOOLEAN,
    FieldTypes.FLOAT,
    FieldTypes.DATETIME,
    FieldTypes.LOCATION,
    FieldTypes.URL,
  ]),
  required: z.boolean(),
});

export type PostTemplateField = z.infer<typeof PostTemplateFieldSchema>;

export const defaultPostTemplate: PostTemplateField[] = [
  {
    fieldName: 'İçerik',
    fieldType: FieldTypes.STRING,
    required: true,
  },
];

export const PostTemplateSchema = z.object({
  title: z.string().min(1, { message: 'error.titleCantBeBlank' }),
  template: z.array(PostTemplateFieldSchema).nonempty(),
});

export type Template = z.infer<typeof PostTemplateSchema>['template'][number];

const PostTemplateOmitted = PostTemplateSchema.omit({ template: true });

export type PostTemplate = z.infer<typeof PostTemplateOmitted> & {
  template: Template[];
};

export type NewTemplateRequest = {
  title: string;
  template: string;
  communityId: string;
};
