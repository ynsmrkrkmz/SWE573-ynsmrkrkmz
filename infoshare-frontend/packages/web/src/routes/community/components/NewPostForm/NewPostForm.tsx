import { Grid } from '@mui/material';
import NumberFieldElement from 'components/FormComponents/NumberFieldElement';
import TextFieldElement from 'components/FormComponents/TextFieldElement';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { PostTemplateField } from 'routes/community/types/postTypes';
import { FieldTypes } from 'types';

type Props = PostTemplateField & {
  isLoading: boolean;
  index: number;
};

const NewPostForm: FC<Props> = ({ fieldName, fieldType, isLoading, index }) => {
  const { control } = useFormContext();

  if (fieldType === FieldTypes.INTEGER)
    return (
      <Grid item xs={12}>
        <NumberFieldElement
          fullWidth
          label={fieldName}
          disabled={isLoading}
          control={control}
          name={`field${index}`}
        />
      </Grid>
    );

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
