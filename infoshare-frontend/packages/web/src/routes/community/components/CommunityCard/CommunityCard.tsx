import { FC } from 'react';
import { Avatar, Button, Card, CardActions, CardHeader, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

type Props = {
  id: number;
  name: string;
  memberCount: number;
  imageUrl?: string | null;
};

const CommunityCard: FC<Props> = ({ id, name, memberCount, imageUrl }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 296 }}>
      <CardHeader
        titleTypographyProps={{ fontSize: 18 }}
        avatar={
          <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            alt="Community Image"
            src={imageUrl !== null ? imageUrl : undefined}
          >
            C
          </Avatar>
        }
        title={name}
        subheader={intl.formatMessage(
          { id: 'community.memberCount' },
          { memberCount: memberCount }
        )}
      />
      <CardActions disableSpacing>
        <Button onClick={() => navigate(`${id}`)}>
          <Typography>{intl.formatMessage({ id: 'community.viewCommunity' })}</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CommunityCard;
