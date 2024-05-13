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

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    const splitted = name.split(' ');
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: '36px',
        height: '36px',
      },
      children: `${splitted[0][0]}${name.split(' ')[splitted.length - 1][0]}`,
    };
  }

  return (
    <Card>
      <CardHeader
        sx={{ padding: 2 }}
        avatar={<Avatar alt="Community Image" {...stringAvatar(communityName ?? createdByName)} />}
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
          {template.map((t) => {
            return <Box></Box>;
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export { PostCard };
