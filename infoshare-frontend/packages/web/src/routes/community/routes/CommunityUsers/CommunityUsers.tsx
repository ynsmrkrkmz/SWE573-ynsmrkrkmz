import { ExpandLess, ExpandMore, MoreVertRounded } from '@mui/icons-material';
import {
  Avatar,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useAppContext } from 'contexts/AppContext';
import { FC, useEffect, useState } from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { BiShieldAlt2 } from 'react-icons/bi';
import { GrGroup } from 'react-icons/gr';
import { LuCrown } from 'react-icons/lu';
import { TbUserEdit } from 'react-icons/tb';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useCommunityContext } from 'routes/community/contexts/CommunityContext';
import { UserCommunityRole } from 'types/userTypes';

const CommunityUsers: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { setPageName } = useAppContext();
  const { communityUsers, authCommunityUser } = useCommunityContext();

  const [ownersOpen, setOwnersOpen] = useState(true);
  const [moderatorsOpen, setModeratorsOpen] = useState(true);
  const [membersOpen, setMembersOpen] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(-1);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOwnersClick = () => {
    setOwnersOpen(!ownersOpen);
  };
  const handleModeratorsClick = () => {
    setModeratorsOpen(!moderatorsOpen);
  };
  const handleMembersClick = () => {
    setMembersOpen(!membersOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setSelectedUserId(userId);
    setAnchorEl(event.currentTarget);
  };
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

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'community.members' }));
  }, [intl, setPageName]);

  const owners = communityUsers?.filter((u) => u.userCommunityRole === UserCommunityRole.OWNER);
  const moderators = communityUsers?.filter(
    (u) => u.userCommunityRole === UserCommunityRole.MODERATOR
  );
  const members = communityUsers?.filter((u) => u.userCommunityRole === UserCommunityRole.MEMBER);

  return (
    <Stack direction={'column'} spacing={2}>
      <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
        {intl.formatMessage({
          id: 'community.members',
        })}
      </Typography>

      <List>
        <ListItemButton onClick={handleOwnersClick}>
          <ListItemIcon>
            <Avatar>
              <LuCrown />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={intl.formatMessage({ id: 'community.owners' })} />
          {ownersOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={ownersOpen} timeout="auto" unmountOnExit>
          {owners &&
            owners.map((u) => (
              <ListItem divider>
                <ListItemAvatar></ListItemAvatar>
                <ListItemText primary={`${u.name} ${u.lastname}`} />
              </ListItem>
            ))}
        </Collapse>
        <ListItemButton onClick={handleModeratorsClick}>
          <ListItemIcon>
            <Avatar>
              <BiShieldAlt2 />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={intl.formatMessage({ id: 'community.moderators' })} />
          {moderatorsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={moderatorsOpen} timeout="auto" unmountOnExit>
          {moderators &&
            moderators.map((u) => (
              <ListItem
                divider
                secondaryAction={
                  authCommunityUser?.userCommunityRole === UserCommunityRole.OWNER ? (
                    <IconButton
                      onClick={(event: React.MouseEvent<HTMLElement>) => {
                        handleClick(event, u.id);
                      }}
                      edge="end"
                    >
                      <MoreVertRounded />
                    </IconButton>
                  ) : null
                }
              >
                <ListItemAvatar></ListItemAvatar>
                <ListItemText primary={`${u.name} ${u.lastname}`} />
              </ListItem>
            ))}
        </Collapse>
        <ListItemButton onClick={handleMembersClick}>
          <ListItemIcon>
            <Avatar>
              <GrGroup />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={intl.formatMessage({ id: 'community.members' })} />
          {membersOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={membersOpen} timeout="auto" unmountOnExit>
          {members &&
            members.map((u) => (
              <ListItem
                divider
                secondaryAction={
                  authCommunityUser?.userCommunityRole === UserCommunityRole.OWNER ||
                  authCommunityUser?.userCommunityRole === UserCommunityRole.MODERATOR ? (
                    <IconButton
                      onClick={(event: React.MouseEvent<HTMLElement>) => {
                        handleClick(event, u.id);
                      }}
                      edge="end"
                    >
                      <MoreVertRounded />
                    </IconButton>
                  ) : null
                }
              >
                <ListItemAvatar></ListItemAvatar>
                <ListItemText primary={`${u.name} ${u.lastname}`} />
              </ListItem>
            ))}
        </Collapse>
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

export default CommunityUsers;
