import { Box, FormLabel, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { PostTemplateField } from 'routes/community/types/postTypes';
import { FieldTypes } from 'types';

type Props = {
  fieldTemplate: PostTemplateField;
  content: string;
};

const PostField: FC<Props> = ({ fieldTemplate, content }) => {
  // if (fieldTemplate.fieldType === FieldTypes.TEXTAREA) return <Grid item xs={12}></Grid>;

  return (
    <Grid item xs={12}>
      <Box borderRadius={2} component="fieldset">
        <legend>{fieldTemplate.fieldName}</legend>
        <Typography whiteSpace="pre-wrap">{content}</Typography>
      </Box>
    </Grid>
  );
};

export { PostField };
