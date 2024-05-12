import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

type SelectElementProps = Omit<TextFieldProps, 'name'> & {
  name: string;
  control: Control;
  options: Option[] | undefined;
};

const SelectElement: React.FC<SelectElementProps> = ({ name, control, options, ...rest }) => {
  return options && options.length > 0 ? (
    <Controller
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => {
        return (
          <TextField
            fullWidth
            {...rest}
            select
            name={name}
            value={value || ''}
            onChange={(event) => {
              onChange(event);
              if (typeof rest.onChange === 'function') {
                rest.onChange(event);
              }
            }}
            onBlur={onBlur}
            inputRef={ref}
            error={rest.error ?? invalid}
            helperText={error ? `* ${error.message}` : rest.helperText}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
      name={name}
      control={control}
    />
  ) : (
    <TextField fullWidth {...rest} disabled name={name}></TextField>
  );
};

export default SelectElement;
