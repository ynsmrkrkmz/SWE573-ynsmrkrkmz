import { PostTemplateField } from 'routes/community/types/postTypes';
import { FieldTypes } from 'types';
import { z, ZodSchema } from 'zod';

export const generatePostZodSchema = (input: PostTemplateField[]) => {
  let fields: { [key: string]: ZodSchema } = {
    title: z.string().min(1, { message: 'error.titleCantBeBlank' }),
  };

  input.reduce((acc: { [key: string]: ZodSchema }, curr, index) => {
    if (
      curr.fieldType === FieldTypes.STRING ||
      curr.fieldType === FieldTypes.INTEGER ||
      curr.fieldType === FieldTypes.FLOAT
    ) {
      if (curr.required)
        acc[`field${index}`] = z.string().min(1, { message: 'error.fieldCantBeBlank' });
      else acc[`field${index}`] = z.string().optional();
    }
    if (curr.fieldType === FieldTypes.LOCATION) {
      if (curr.required) {
        acc[`field${index}.lat`] = z.string().min(1, { message: 'error.fieldCantBeBlank' });
        acc[`field${index}.long`] = z.string().min(1, { message: 'error.fieldCantBeBlank' });
      } else {
        acc[`field${index}.lat`] = z.string().optional();
        acc[`field${index}.long`] = z.string().optional();
      }
    }

    if (curr.fieldType === FieldTypes.URL) {
      if (curr.required)
        acc[`field${index}`] = z
          .string()
          .min(1, { message: 'error.fieldCantBeBlank' })
          .url({ message: 'error.invalidUrl' });
      else acc[`field${index}`] = z.string().optional();
    }

    if (curr.fieldType === FieldTypes.DATETIME) {
      if (curr.required)
        acc[`field${index}`] = z
          .string()
          .min(1, { message: 'error.fieldCantBeBlank' })
          .datetime({ message: 'error.invalidDatetime' });
      else
        acc[`field${index}`] = z.string().datetime({ message: 'error.invalidDatetime' }).optional();
    }

    if (curr.fieldType === FieldTypes.BOOLEAN) {
      if (curr.required) acc[`field${index}`] = z.boolean({ message: 'error.fieldCantBeBlank' });
      else acc[`field${index}`] = z.boolean().optional();
    }

    return acc;
  }, fields);

  return z.object(fields);
};
