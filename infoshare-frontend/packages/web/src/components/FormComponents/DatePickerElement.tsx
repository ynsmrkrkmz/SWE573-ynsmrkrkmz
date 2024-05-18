import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

export type DatePickerElementProps<TInputDate = unknown, TDate = Date> = Omit<
  DatePickerProps<TInputDate, TDate>,
  'value' | 'onChange' | 'renderInput'
> & {
  name: string;
  control: Control;
  textFieldProps?: TextFieldProps;
  onChange?: (value: TDate | null) => void;
  parseDate?: (date: string) => string;
  helperText?: TextFieldProps['helperText'];
};

export default function DatePickerElement({
  name,
  parseDate,
  textFieldProps,
  control,
  ...rest
}: DatePickerElementProps): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
        <DatePicker
          {...rest}
          value={value === null ? null : value || ''}
          onChange={(date) => {
            onChange(date?.toISOString());
            if (typeof rest.onChange === 'function') {
              rest.onChange(date);
            }
          }}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              {...textFieldProps}
              error={invalid}
              helperText={error ? `* ${error.message}` : rest.helperText}
            />
          )}
        />
      )}
    />
  );
}
