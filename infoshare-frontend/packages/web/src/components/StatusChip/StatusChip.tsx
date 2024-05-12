import { Chip, Typography } from '@mui/material';
import { FC } from 'react';
import {
  BsFillSendCheckFill,
  BsFillSendDashFill,
  BsFillSendExclamationFill,
  BsFillSendXFill,
} from 'react-icons/bs';
import { useIntl } from 'react-intl';
import { InvitationStatus } from 'routes/community/types/communityTypes';

const StatusChip: FC<{
  status: InvitationStatus;
}> = ({ status }) => {
  const intl = useIntl();

  let label = intl.formatMessage({ id: 'status.pending' });
  let color = '#ffc925';
  let iconComponent = <BsFillSendExclamationFill style={{ fontSize: '13px' }} />;

  if (status === InvitationStatus.ACCEPTED) {
    label = intl.formatMessage({ id: 'status.accepted' });
    color = '#82bc33';
    iconComponent = <BsFillSendCheckFill style={{ fontSize: '13px' }} />;
  }

  if (status === InvitationStatus.CANCELLED) {
    label = intl.formatMessage({ id: 'status.calcelled' });
    color = '#afafaf';
    iconComponent = <BsFillSendXFill style={{ fontSize: '13px' }} />;
  }

  if (status === InvitationStatus.REJECTED) {
    label = intl.formatMessage({ id: 'status.rejected' });
    color = '#FE5555';
    iconComponent = <BsFillSendDashFill style={{ fontSize: '13px' }} />;
  }

  return (
    <Chip
      variant={'outlined'}
      size={'small'}
      style={{ borderColor: color }}
      label={
        <Typography color={'text.secondary'} style={{ fontSize: '13px' }}>
          {label}
        </Typography>
      }
      icon={iconComponent}
    />
  );
};

export { StatusChip };
