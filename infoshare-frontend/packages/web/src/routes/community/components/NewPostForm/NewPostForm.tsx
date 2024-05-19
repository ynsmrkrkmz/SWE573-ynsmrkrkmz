import { Grid } from '@mui/material';
import { CheckboxElement } from 'components/FormComponents/CheckBoxElement';
import DateTimePickerElement from 'components/FormComponents/DateTimePickerElement';
import NumberFieldElement from 'components/FormComponents/NumberFieldElement';
import TextFieldElement from 'components/FormComponents/TextFieldElement';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { PostTemplateField } from 'routes/community/types/postTypes';
import { FieldTypes } from 'types';

type Props = PostTemplateField & {
  isLoading: boolean;
  index: number;
};

const NewPostForm: FC<Props> = ({ fieldName, fieldType, isLoading, index }) => {
  const { control } = useFormContext();
  const intl = useIntl();

  if (fieldType === FieldTypes.INTEGER || fieldType === FieldTypes.FLOAT)
    return (
      <Grid item xs={12}>
        <NumberFieldElement
          fullWidth
          label={fieldName}
          disabled={isLoading}
          control={control}
          name={`field${index}`}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
      </Grid>
    );

  if (fieldType === FieldTypes.LOCATION) {
    return (
      <Grid item xs={12}>
        <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
          <Grid item xs={6}>
            <NumberFieldElement
              fullWidth
              label={`${fieldName} Enlem`}
              disabled={isLoading}
              control={control}
              name={`field${index}lat`}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
          <Grid item xs={6}>
            <NumberFieldElement
              fullWidth
              label={`${fieldName} Boylam`}
              disabled={isLoading}
              control={control}
              name={`field${index}long`}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  if (fieldType === FieldTypes.DATETIME) {
    return (
      <Grid item xs={12}>
        <DateTimePickerElement
          label={fieldName}
          name={`field${index}`}
          control={control}
          disabled={isLoading}
        />
      </Grid>
    );
  }

  if (fieldType === FieldTypes.BOOLEAN) {
    return (
      <Grid item xs={2} alignContent={'center'}>
        <CheckboxElement
          label={fieldName}
          disabled={isLoading}
          control={control}
          name={`field${index}`}
        />
      </Grid>
    );
  }

  if (fieldType === FieldTypes.URL) {
    return (
      <Grid item xs={12}>
        <TextFieldElement
          fullWidth
          label={fieldName}
          disabled={isLoading}
          control={control}
          name={`field${index}`}
          inputProps={{ inputMode: 'url' }}
        />
      </Grid>
    );
  }

  if (fieldType === FieldTypes.IMAGE) {
    return (
      <Grid item xs={12}>
        <TextFieldElement
          fullWidth
          label={fieldName}
          disabled={isLoading}
          control={control}
          name={`field${index}`}
          inputProps={{ inputMode: 'url' }}
          placeholder={intl.formatMessage({ id: 'info.imageFieldPlaceholder' })}
        />
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      <TextFieldElement
        fullWidth
        multiline
        label={fieldName}
        disabled={isLoading}
        control={control}
        name={`field${index}`}
      />
    </Grid>
  );
};

export { NewPostForm };
