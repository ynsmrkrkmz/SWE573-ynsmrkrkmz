import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export type TextFieldElementProps = Omit<TextFieldProps, 'name'> & {
  name: string;
  control: Control;
};

export default function TextFieldElement({
  name,
  control,
  ...rest
}: TextFieldElementProps): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
        <TextField
          fullWidth
          {...rest}
          name={name}
          value={value || ''}
          onChange={(event) => {
            onChange(event);
            if (typeof rest.onChange === 'function') {
              rest.onChange(event);
            }
          }}
          type="number"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onBlur={onBlur}
          inputRef={ref}
          error={invalid}
          helperText={error ? `* ${error.message}` : rest.helperText}
        />
      )}
    />
  );
}
