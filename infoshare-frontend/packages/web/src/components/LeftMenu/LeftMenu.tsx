import React, { FC } from 'react';
import Root from './LeftMenu.style';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useIntl } from 'react-intl';
import { useGetUserCommunities } from 'services/communityService';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const LeftMenu: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const { data } = useGetUserCommunities();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Root>
      <Box sx={{ width: '100%', maxWidth: 360 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('./communities/create-community')}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={intl.formatMessage({ id: 'community.createCommunity' })} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('./communities')}>
              <ListItemText primary={intl.formatMessage({ id: 'generic.communities' })} />
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={handleClick}>
            <ListItemText primary={intl.formatMessage({ id: 'community.joinedCommunities' })} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {data &&
              data.data?.map((c) => (
                <ListItem key={c.id} component="div" disablePadding>
                  <ListItemButton onClick={() => navigate(`./communities/${c.id}`)}>
                    <ListItemIcon>
                      <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        alt="Community Image"
                        src={c.imageUrl !== null ? c.imageUrl : undefined}
                      >
                        C
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={c.name}
                      secondary={intl.formatMessage(
                        { id: 'community.memberCount' },
                        { memberCount: c.memberCount }
                      )}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </Collapse>
        </List>
      </Box>
    </Root>
  );
};

export default LeftMenu;
