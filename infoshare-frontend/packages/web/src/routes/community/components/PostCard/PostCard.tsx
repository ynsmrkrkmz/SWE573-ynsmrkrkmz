import { Avatar, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import {
  defaultPostTemplate,
  PostDetails,
  PostTemplateField,
} from 'routes/community/types/postTypes';
import { stringAvatar } from 'utils/generateAvatarFromName';
import { PostField } from '../PostField';

type Props = {
  postDetails: PostDetails;
};

const PostCard: FC<Props> = ({ postDetails }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const {
    id,
    title,
    communityName,
    content,
    createdAt,
    communityId,
    postTemplate,
    voteCount,
    createdById,
    createdByName,
  } = postDetails;

  const template: PostTemplateField[] = postTemplate
    ? JSON.parse(postTemplate)
    : defaultPostTemplate;

  const contentObj: { [key: string]: string } = JSON.parse(content);

  return (
    <Card>
      <CardHeader
        sx={{ padding: 2 }}
        avatar={
          communityName ? (
            <Avatar sx={{ bgcolor: deepOrange[500] }} alt="Community Image">
              C
            </Avatar>
          ) : (
            <Avatar alt="User Avatar" {...stringAvatar(communityName ?? createdByName)} />
          )
        }
        title={
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Typography variant="h3" fontSize={16}>
              {communityName ?? createdByName}
            </Typography>
            <Typography>
              {intl.formatDate(new Date(createdAt), {
                year: 'numeric',
                month: '2-digit',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Typography>
          </Stack>
        }
        subheader={
          <Typography variant="body1" fontSize={12}>
            {communityName && createdByName}
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
          <Grid item xs={12}>
            <Typography variant="h1" whiteSpace="pre-wrap">
              {title}
            </Typography>
          </Grid>
          {template.map((t, index) => {
            return (
              <PostField key={t.fieldName} fieldTemplate={t} content={contentObj} index={index} />
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export { PostCard };
