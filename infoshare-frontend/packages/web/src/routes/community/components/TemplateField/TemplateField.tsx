import { DeleteOutline } from '@mui/icons-material';
import { Box, FormLabel, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { CheckboxElement } from 'components/FormComponents/CheckBoxElement';
import SelectElement from 'components/FormComponents/SelectElement';
import TextFieldElement from 'components/FormComponents/TextFieldElement';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { PostTemplateField } from 'routes/community/types/postTypes';
import { FieldTypes } from 'types';
import { MdDelete } from 'react-icons/md';

type Props = {
  index: number;
  isLoading: boolean;
  onDeleteClick?: () => void;
};

const TemplateField: FC<Props> = ({ index, isLoading, onDeleteClick }) => {
  const intl = useIntl();
  const theme = useTheme();
  const { control } = useFormContext();

  const options = [
    {
      label: FieldTypes.INTEGER,
      value: FieldTypes.INTEGER,
    },
    {
      label: FieldTypes.STRING,
      value: FieldTypes.STRING,
    },
    {
      label: FieldTypes.TEXTAREA,
      value: FieldTypes.TEXTAREA,
    },
  ];

  return (
    <Grid item xs={12}>
      <Box borderRadius={2} component="fieldset">
        {/* <legend>{''}</legend> */}
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
