import { PostTemplateField } from 'routes/community/types/communityTypes';
import { FieldTypes } from 'types';
import { AnyZodObject, z, ZodObject, ZodSchema } from 'zod';

export const generatePostZodSchema = (input: PostTemplateField[]) => {
  let fields: { [key: string]: ZodSchema } = {
    title: z.string().min(1, { message: 'error.titleCantBeBlank' }),
  };

  input.reduce((acc: { [key: string]: ZodSchema }, curr, index) => {
    if (
      curr.fieldType === FieldTypes.STRING ||
      curr.fieldType === FieldTypes.INTEGER ||
      curr.fieldType === FieldTypes.TEXTAREA
    ) {
      if (curr.required)
        acc[`field${index}`] = z.string().min(1, { message: 'error.fieldCantBeBlank' });
      else acc[`field${index}`] = z.string().optional();
    }

    return acc;
  }, fields);

  return z.object(fields);
};
