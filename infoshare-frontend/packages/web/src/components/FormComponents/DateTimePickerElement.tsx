import { TextField, TextFieldProps } from '@mui/material';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import { Control, Controller } from 'react-hook-form';

export type DateTimePickerElementProps<TInputDate = unknown, TDate = Date> = Omit<
  DateTimePickerProps<TInputDate, TDate>,
  'value' | 'onChange' | 'renderInput'
> & {
  name: string;
  control: Control;
  textFieldProps?: TextFieldProps;
  onChange?: (value: TDate | null) => void;
  parseDate?: (date: string) => string;
  helperText?: TextFieldProps['helperText'];
};

export default function DateTimePickerElement({
  name,
  parseDate,
  textFieldProps,
  control,
  ...rest
}: DateTimePickerElementProps): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
        <DateTimePicker
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
