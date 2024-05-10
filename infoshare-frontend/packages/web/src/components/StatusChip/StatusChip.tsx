import Cached from '@mui/icons-material/Cached';
import Check from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import InboxIcon from '@mui/icons-material/Inbox';
import Info from '@mui/icons-material/Info';
import { Chip, Typography } from '@mui/material';
import Icon from '@mui/material/Icon';
import { useAuthContext } from 'contexts/AuthContext';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { InvitationStatus } from 'routes/community/types/communityTypes';
import { getTranslationKeyByOrganizationType } from 'utils/translation';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import PendingIcon from '@mui/icons-material/Pending';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { BsFillSendCheckFill } from 'react-icons/bs';
import { BsFillSendDashFill } from 'react-icons/bs';
import { BsFillSendExclamationFill } from 'react-icons/bs';
import { BsFillSendXFill } from 'react-icons/bs';

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
