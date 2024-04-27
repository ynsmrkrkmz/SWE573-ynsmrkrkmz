import { useIntl } from 'react-intl';
import { AnyZodObject, ZodEffects } from 'zod';

const useFormResolver = () => {
  const intl = useIntl();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, max-len
  return (schema: AnyZodObject | ZodEffects<any>) => async (values: { [property: string]: any }) => {
    const result = await schema.safeParseAsync(values);
    const errors: { [property: string]: { message: string } } = {};

    if (!result.success) {
      result.error.issues.reduce((acc: { [property: string]: { message: string } }, curr) => {
        acc[curr.path.join('.')] = {
          message: intl.formatMessage({ id: curr.message }),
        };

        return acc;
      }, errors);
    }

    return {
      values,
      errors,
    };
  };
};

export default useFormResolver;
