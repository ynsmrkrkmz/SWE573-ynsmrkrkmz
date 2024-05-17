import { FC } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { PostDetails, defaultPostTemplate } from 'routes/community/types/postTypes';
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

  const template = postTemplate ?? defaultPostTemplate;

  const contentObj: { [key: string]: string } = JSON.parse(content);

  return (
    <Card>
      <CardHeader
        sx={{ padding: 2 }}
        avatar={<Avatar alt="User Avatar" {...stringAvatar(communityName ?? createdByName)} />}
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
          <Typography variant="body2" fontSize={8}>
            {communityName && createdByName}
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
          {template.map((t, index) => {
            return (
              <PostField key={index} fieldTemplate={t} content={Object.values(contentObj)[index]} />
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export { PostCard };
