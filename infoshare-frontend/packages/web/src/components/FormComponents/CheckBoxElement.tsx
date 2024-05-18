import { Checkbox, FormControlLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export type CheckboxElementProps = {
  label?: string;
  name: string;
  control: Control;
  disabled?: boolean;
};

const CheckboxElement: React.FC<CheckboxElementProps> = ({ name, control, label, disabled }) => {
  return (
    <FormControlLabel
      control={
        <Controller
          disabled={disabled}
          name={name}
          control={control}
          defaultValue={true}
          render={({ field: props }) => (
            <Checkbox
              {...props}
              checked={props.value}
              onChange={(e) => props.onChange(e.target.checked)}
            />
          )}
        />
      }
      label={label}
    />
  );
};

export { CheckboxElement };
