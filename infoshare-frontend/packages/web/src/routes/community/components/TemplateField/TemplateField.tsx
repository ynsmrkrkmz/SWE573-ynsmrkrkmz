import { Box, Grid, IconButton, useTheme } from '@mui/material';
import { CheckboxElement } from 'components/FormComponents/CheckBoxElement';
import SelectElement from 'components/FormComponents/SelectElement';
import TextFieldElement from 'components/FormComponents/TextFieldElement';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { FieldTypes } from 'types';

type Props = {
  index: number;
  isLoading: boolean;
  onDeleteClick?: () => void;
};

const TemplateField: FC<Props> = ({ index, isLoading, onDeleteClick }) => {
  const intl = useIntl();
  const theme = useTheme();
  const { control } = useFormContext();

  const options = Object.keys(FieldTypes).map((key) => ({
    label: key,
    value: FieldTypes[key as keyof typeof FieldTypes],
  }));

  return (
    <Grid item xs={12}>
      <Box borderRadius={2} component="fieldset">
        <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
          <Grid item xs={6}>
            <TextFieldElement
              fullWidth
              label={intl.formatMessage({
                id: 'post.fieldName',
              })}
              disabled={isLoading}
              control={control}
              name={`template.${index}.fieldName`}
            />
          </Grid>
          <Grid item xs={3}>
            <SelectElement
              options={options}
              fullWidth
              label={intl.formatMessage({
                id: 'post.fieldType',
              })}
              disabled={isLoading}
              control={control}
              name={`template.${index}.fieldType`}
            />
          </Grid>
          <Grid item xs={2} alignContent={'center'}>
            <CheckboxElement
              label={intl.formatMessage({
                id: 'post.required',
              })}
              disabled={isLoading}
              control={control}
              name={`template.${index}.required`}
            />
          </Grid>
          {onDeleteClick && (
            <Grid item xs={1} alignContent={'center'}>
              <IconButton
                onClick={onDeleteClick}
                children={<MdDelete color={theme.palette.primary.main} />}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};

export { TemplateField };
