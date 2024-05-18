import { Grid } from '@mui/material';
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

  if (fieldType === FieldTypes.TEXTAREA)
    return (
      <Grid item xs={12}>
        <TextFieldElement
          fullWidth
          multiline
          minRows={5}
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
        label={fieldName}
        disabled={isLoading}
        control={control}
        name={`field${index}`}
      />
    </Grid>
  );
};

export { NewPostForm };
