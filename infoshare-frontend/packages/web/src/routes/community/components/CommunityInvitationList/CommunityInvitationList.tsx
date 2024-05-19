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
import { StyledDataGrid } from './CommunityInvitationList.style';
import { useCancelInvitation, useGetCommunityInvitations } from 'services/invitationService';
import ConfirmationDialog from 'components/ComfirmationDialog';
import { useQueryClient } from '@tanstack/react-query';
import useNotification from 'hooks/useNotification';
import { useCommunityContext } from 'routes/community/contexts/CommunityContext';
import { UserCommunityRole } from 'types/userTypes';

const CommunityInvitationList: FC = () => {
  const intl = useIntl();
  const { communityId } = useParams();
  const { authCommunityUser } = useCommunityContext();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetCommunityInvitations(communityId);
  const { showSuccess } = useNotification();
  const { mutate } = useCancelInvitation({
    onSuccess: async () => {
      showSuccess(intl.formatMessage({ id: 'success.invitationCancelled' }));
      await queryClient.invalidateQueries({
        queryKey: ['community-invitations', communityId],
        exact: true,
      });
    },
  });

  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>(null);
  const [dialogCancelInvitationOpen, setDialogCancelInvitationOpen] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDialogOpen = (id: string) => () => {
    setDialogCancelInvitationOpen(true);
    setSelectedInvitationId(id);
  };

  const handleDialogClose = () => {
    setDialogCancelInvitationOpen(false);
    setSelectedInvitationId(null);
  };

  const cancelInvitation = useCallback(
    (id: string) => {
      mutate(id);
    },
    [mutate]
  );

  const handleConfirm = () => {
    selectedInvitationId && cancelInvitation(selectedInvitationId);
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
        field: 'fullname',
        headerName: intl.formatMessage({
          id: 'invitation.invitedUserFullname',
        }),
        minWidth: 150,
        valueGetter: getInvitedUserFullName,
        flex: 1,
      },
      {
        field: 'userEmail',
        headerName: intl.formatMessage({
          id: 'invitation.invitedUserEmail',
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
            key={params.id}
            disabled={
              (params.row.invitationStatus as InvitationStatus) !== InvitationStatus.PENDING ||
              authCommunityUser?.userCommunityRole === UserCommunityRole.MEMBER ||
              (authCommunityUser?.userCommunityRole === UserCommunityRole.MODERATOR &&
                (params.row.userCommunityRole as UserCommunityRole) !== UserCommunityRole.MEMBER) ||
              false
            }
            icon={<MdOutlineCancel style={{ fontSize: '24px' }} />}
            label={intl.formatMessage({ id: 'generic.cancel' })}
            onClick={handleDialogOpen(params.id as string)}
            showInMenu
          />,
        ],
      },
    ],
    [authCommunityUser?.userCommunityRole, getDate, intl]
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
    <>
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
          id: 'invitation.cancelWarnContent',
        })}
        open={dialogCancelInvitationOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirm}
        loading={isLoading}
      />
    </>
  );
};

export { CommunityInvitationList };
