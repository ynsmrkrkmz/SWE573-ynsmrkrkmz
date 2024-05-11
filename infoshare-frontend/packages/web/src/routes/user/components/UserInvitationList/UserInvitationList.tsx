import {
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { StatusChip } from 'components/StatusChip';
import { useAppContext } from 'contexts/AppContext';
import { FC, useCallback, useMemo, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { InvitationStatus } from 'routes/community/types/communityTypes';
import Root, { StyledDataGrid } from './UserInvitationList.style';
import {
  useAcceptInvitation,
  useCancelInvitation,
  useGetCommunityInvitations,
  useGetUserInvitations,
  useRejctInvitation,
} from 'services/invitationService';
import ConfirmationDialog from 'components/ComfirmationDialog';
import { useQueryClient } from '@tanstack/react-query';
import useNotification from 'hooks/useNotification';
import { useCommunityContext } from 'routes/community/contexts/CommunityContext';
import { UserCommunityRole } from 'types/userTypes';
import { MdOutlineCheckCircle } from 'react-icons/md';

const UserInvitationList: FC = () => {
  const intl = useIntl();
  const { communityId } = useParams();
  const { authCommunityUser } = useCommunityContext();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetUserInvitations();
  const { showSuccess } = useNotification();

  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>(null);
  const [dialogRejectInvitationOpen, setDialogRejectInvitationOpen] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate: acceptMutate } = useAcceptInvitation({
    onSuccess: async () => {
      showSuccess(intl.formatMessage({ id: 'success.invitationAccepted' }));
      await queryClient.invalidateQueries({
        queryKey: ['user-invitations'],
        exact: true,
      });
      await queryClient.invalidateQueries({
        queryKey: ['user-communities'],
        exact: true,
      });
    },
    onSettled: () => {
      setSelectedInvitationId(null);
      setDialogRejectInvitationOpen(false);
    },
  });
  const { mutate: rejectMutate } = useRejctInvitation({
    onSuccess: async () => {
      showSuccess(intl.formatMessage({ id: 'success.invitationRejected' }));
      await queryClient.invalidateQueries({
        queryKey: ['user-invitations'],
        exact: true,
      });
      await queryClient.invalidateQueries({
        queryKey: ['user-communities'],
        exact: true,
      });
    },
    onSettled: () => {
      setSelectedInvitationId(null);
      setDialogRejectInvitationOpen(false);
    },
  });

  const handleDialogOpen = (id: string) => () => {
    setDialogRejectInvitationOpen(true);
    setSelectedInvitationId(id);
  };

  const handleDialogClose = () => {
    setDialogRejectInvitationOpen(false);
    setSelectedInvitationId(null);
  };

  const acceptInvitation = useCallback(
    (id: string) => {
      acceptMutate(id);
    },
    [acceptMutate]
  );

  const rejectInvitation = useCallback(
    (id: string) => {
      rejectMutate(id);
    },
    [rejectMutate]
  );

  const handleConfirm = () => {
    selectedInvitationId && rejectInvitation(selectedInvitationId);
  };

  const getDate = useCallback(
    (params: GridValueFormatterParams) => {
      if (!params.value) {
        return;
      }
      return intl.formatDate(new Date(params.value as string), {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    },
    [intl]
  );

  const columns: GridColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: intl.formatMessage({
          id: 'invitation.id',
        }),
      },
      {
        field: 'communityName',
        headerName: intl.formatMessage({
          id: 'invitation.community',
        }),
        minWidth: 200,
        flex: 1,
      },
      {
        field: 'userCommunityRole',
        headerName: intl.formatMessage({ id: 'invitation.invitedRole' }),
        width: 150,
      },
      {
        field: 'invitorFullname',
        headerName: intl.formatMessage({ id: 'invitation.invitorFullname' }),
        minWidth: 200,
        valueGetter: getInvitorFullName,
        flex: 1,
      },
      {
        field: 'sentAt',
        headerName: intl.formatMessage({ id: 'invitation.sentAt' }),
        width: 150,
        valueFormatter: getDate,
      },
      {
        field: 'invitationStatus',
        headerName: intl.formatMessage({ id: 'invitation.invitationStatus' }),
        width: 150,
        renderCell: (data: GridRenderCellParams<InvitationStatus>) =>
          data?.value ? <StatusChip status={data.value} /> : null,
        flex: 1,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<MdOutlineCheckCircle style={{ fontSize: '24px' }} />}
            label={intl.formatMessage({ id: 'generic.accept' })}
            onClick={() => acceptInvitation(params.id as string)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<MdOutlineCancel style={{ fontSize: '24px' }} />}
            label={intl.formatMessage({ id: 'generic.reject' })}
            onClick={handleDialogOpen(params.id as string)}
            showInMenu
          />,
        ],
      },
    ],
    [intl]
  );

  function getInvitedUserFullName(params: GridValueGetterParams) {
    return `${params.row.username || ''} ${params.row.userLastName || ''}`;
  }

  function getInvitorFullName(params: GridValueGetterParams) {
    return `${params.row.sentByName || ''} ${params.row.sentByLastname || ''}`;
  }

  const gridData = useMemo(() => {
    if (data?.data) {
      return data?.data;
    }

    return [];
  }, [data?.data]);

  return (
    <Root>
      <StyledDataGrid
        loading={isLoading}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30]}
        pagination
        columns={columns}
        rows={gridData}
      />
      <ConfirmationDialog
        title={intl.formatMessage({ id: 'generic.areYouSure' })}
        content={intl.formatMessage({
          id: 'invitation.rejectWarnContent',
        })}
        open={dialogRejectInvitationOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirm}
        loading={isLoading}
      />
    </Root>
  );
};

export { UserInvitationList };
