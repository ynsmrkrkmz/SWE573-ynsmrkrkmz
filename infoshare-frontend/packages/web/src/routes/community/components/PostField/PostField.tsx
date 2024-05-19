import { Box, Checkbox, FormControlLabel, Grid, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { PostTemplateField } from 'routes/community/types/postTypes';
import { FieldTypes } from 'types';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { MdOutlineCancel } from 'react-icons/md';

type Props = {
  fieldTemplate: PostTemplateField;
  content: {
    [key: string]: string;
  };
  index: number;
};

const PostField: FC<Props> = ({ fieldTemplate, content, index }) => {
  const intl = useIntl();

  if (fieldTemplate.fieldType === FieldTypes.DATETIME)
    return (
      <Grid item xs={12}>
        <Box borderRadius={2} component="fieldset">
          <legend>{fieldTemplate.fieldName}</legend>
          <Typography whiteSpace="pre-wrap">
            {intl.formatDate(new Date(content[`field${index}`]), {
              year: 'numeric',
              month: '2-digit',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </Typography>
        </Box>
      </Grid>
    );

  if (fieldTemplate.fieldType === FieldTypes.LOCATION)
    return (
      <Grid item xs={12}>
        <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
          <Grid item xs={6}>
            <Box borderRadius={2} component="fieldset">
              <legend>{`${fieldTemplate.fieldName} Enlem`}</legend>
              <Typography whiteSpace="pre-wrap">{content[`field${index}lat`]}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box borderRadius={2} component="fieldset">
              <legend>{`${fieldTemplate.fieldName} Boylam`}</legend>
              <Typography whiteSpace="pre-wrap">{content[`field${index}long`]}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );

  if (fieldTemplate.fieldType === FieldTypes.URL)
    return (
      <Grid item xs={12}>
        <Box borderRadius={2} component="fieldset">
          <legend>{fieldTemplate.fieldName}</legend>
          <Link underline="always" href={content[`field${index}`]}>
            {content[`field${index}`]}
          </Link>
        </Box>
      </Grid>
    );

  if (fieldTemplate.fieldType === FieldTypes.IMAGE)
    return (
      <Grid item xs={12}>
        <Box borderRadius={2} component="fieldset" display={'flex'} justifyContent={'center'}>
          <legend>{fieldTemplate.fieldName}</legend>
          <Box
            component="img"
            src={content[`field${index}`]}
            alt={fieldTemplate.fieldName}
            sx={{ height: '256px', width: 'auto' }}
          />
        </Box>
      </Grid>
    );

  if (fieldTemplate.fieldType === FieldTypes.BOOLEAN) {
    return (
      <Grid item xs={12} alignContent={'center'}>
        <FormControlLabel
          control={<Checkbox checked={!!content[`field${index}`]} />}
          label={fieldTemplate.fieldName}
        />
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      <Box borderRadius={2} component="fieldset">
        <legend>{fieldTemplate.fieldName}</legend>
        <Typography whiteSpace="pre-wrap">{content[`field${index}`]}</Typography>
      </Box>
    </Grid>
  );
};

export { PostField };
