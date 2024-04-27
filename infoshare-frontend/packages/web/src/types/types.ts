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

export const LoginFormInputSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'error.emailCantBeBlank' })
    .email({ message: 'error.invalidEmail' }),
  password: z.string().min(1, { message: 'error.passwordCantBeBlank' }),
});

export type LoginFormInput = z.infer<typeof LoginFormInputSchema>;

export const SignupFormInputSchema = z
  .object({
    name: z.string().min(1, { message: 'error.nameCantBeBlank' }),
    lastname: z.string().min(1, { message: 'error.lastnameCantBeBlank' }),
    email: z
      .string()
      .min(1, { message: 'error.emailCantBeBlank' })
      .email({ message: 'error.invalidEmail' }),
    password: z.string().min(1, { message: 'error.passwordCantBeBlank' }),
    confirm: z.string(),
  })
  .refine((data: { password: string; confirm: string }) => data.password === data.confirm, {
    message: 'error.passwordsNotMatch',
    path: ['confirm'], // path of error
  })
  .refine(...refinePasswordStrength);

export type SignupFormInput = z.infer<typeof SignupFormInputSchema>;

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
  recordState?: number;
  updateTime?: string;
  insertTime?: string;
  insertUserId?: string;
  updateUserId?: string;
};
