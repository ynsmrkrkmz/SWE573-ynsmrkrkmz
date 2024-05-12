import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldError } from 'react-hook-form';
import React from 'react';

export type TextFieldElementProps = Omit<TextFieldProps, 'name'> & {
  name: string;
  control: Control;
  error: FieldError;
};

export default function TextFieldElement({
  name,
  control,
  error,
  ...rest
}: TextFieldElementProps): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, ref } }) => (
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
          error={!!error}
          helperText={error ? `* ${error.message}` : rest.helperText}
        />
      )}
    />
  );
}
