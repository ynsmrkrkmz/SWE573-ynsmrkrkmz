import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useAppContext } from 'contexts/AppContext';
import { FC, useCallback, useEffect, useState } from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { TbUserEdit } from 'react-icons/tb';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useCommunityContext } from 'routes/community/contexts/CommunityContext';
import { UserCommunityRole } from 'types/userTypes';
import AddIcon from '@mui/icons-material/Add';

const CommunityInvitations: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { setPageName } = useAppContext();
  const { communityUsers, authCommunityUser } = useCommunityContext();

  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [dialogAssignRoleOpen, setDialogAssignRoleOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDialogOpen = (id: number) => () => {
    setDialogAssignRoleOpen(true);
    setSelectedUserId(id);
  };

  const handleDialogClose = () => {
    setDialogAssignRoleOpen(false);
    setSelectedUserId(-1);
  };

  // const deleteLegalEntity = useCallback(
  //   (id) => {
  //     mutate(id);
  //   },
  //   [mutate]
  // );

  const handleClose = () => {
    setSelectedUserId(-1);
    setAnchorEl(null);
  };

  const handleAssignRole = () => {
    handleClose();
  };

  const handleKickUser = () => {
    handleClose();
  };

  const handleInvite = () => {
    navigate('new-invitation');
  };

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'community.invitations' }));
  }, [intl, setPageName]);

  const owners = communityUsers?.filter((u) => u.userCommunityRole === UserCommunityRole.OWNER);

  return (
    <Stack direction={'column'} spacing={2}>
      <Stack direction={'row'}>
        <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
          {intl.formatMessage({
            id: 'community.invitations',
          })}
        </Typography>
        <Button variant="contained" onClick={handleInvite} startIcon={<AddIcon />}>
          <Typography>{intl.formatMessage({ id: 'community.newInvitation' })}</Typography>
        </Button>
      </Stack>

      <List>
        {owners &&
          owners.map((u) => (
            <ListItem divider>
              <ListItemAvatar></ListItemAvatar>
              <ListItemText primary={`${u.name} ${u.lastname}`} />
            </ListItem>
          ))}
      </List>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAssignRole}>
          <ListItemIcon>
            <TbUserEdit fontSize="large" />
          </ListItemIcon>
          {intl.formatMessage({ id: 'community.assignRole' })}
        </MenuItem>
        <MenuItem onClick={handleKickUser}>
          <ListItemIcon>
            <AiOutlineUserDelete fontSize="large" />
          </ListItemIcon>
          {intl.formatMessage({ id: 'community.kickMember' })}
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export { CommunityInvitations };
