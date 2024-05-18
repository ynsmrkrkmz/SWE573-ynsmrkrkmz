import { z } from 'zod';
import { RouteProps } from 'react-router-dom';
import { ROLES } from '@infoshare/utils/constants';
import refinePasswordStrength from '@infoshare/utils/refinePasswordStrength';

export enum Apitypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export interface AppRouteProps extends RouteProps {
  roles?: ROLES[];
}

export type ResponseMeta = {
  status: number;
  message: string;
};

export type ApiRequest<T> = {
  apiType: Apitypes;
  apiUrl: string;
  body: T;
  accessToken: string;
};

export type ApiResponseBody<T> = { data?: T; meta?: ResponseMeta };

export type ApiResponse<T> = Promise<ApiResponseBody<T>>;

export const ResetPasswordFormInputSchema = z
  .object({
    password: z.string().min(1, { message: 'error.passwordCantBeBlank' }),
    confirm: z.string(),
  })
  .refine((data: { password: string; confirm: string }) => data.password === data.confirm, {
    message: 'error.passwordsNotMatch',
    path: ['confirm'], // path of error
  })
  .refine(...refinePasswordStrength);

export type ResetPasswordFormInput = z.infer<typeof ResetPasswordFormInputSchema>;

export type ReactQueryError = {
  response: {
    data: {
      meta: {
        status: string;
        message: string;
      };
    };
  };
};

export type CountryType = {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
};

export const CommentSchema = z.object({
  content: z.string().min(1, { message: 'error.commentCantBeBlank' }),
});

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

export type BaseEntity = {
  createdBy: number;
  createdAt: string;
  updatedBy?: number;
  updatedAt?: string;
  deleted: boolean;
};

export enum FieldTypes {
  STRING = 'string',
  INTEGER = 'integer',
  FLOAT = 'float',
  LOCATION = 'location',
  DATETIME = 'datetime',
  BOOLEAN = 'boolean',
  URL = 'url',
}
