import { labels as i18nLabels } from '@infoshare/i18n';
import getRandomInt from '@infoshare/utils/getRandomInt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import HelpIcon from '@mui/icons-material/Help';
import KeyIcon from '@mui/icons-material/Key';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppContext } from 'contexts/AppContext';
import { useAuthContext } from 'contexts/AuthContext';
import React, { FC, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Link, NavLink } from 'react-router-dom';
import { AppBar, Drawer, DrawerHeader } from './Header.style';

const Header: FC = () => {
  const intl = useIntl();
  const theme = useTheme();
  const { user, signOut } = useAuthContext();
  const { language, setLanguage } = useAppContext();
  const matches = useMediaQuery(theme.breakpoints.up('xl'));
  const [open, setOpen] = React.useState(matches);
  const [randomPicture, setRandomPicture] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const gender = ['women', 'men'][getRandomInt(0, 2)];
    const index = getRandomInt(1, 100);
    setRandomPicture(`https://randomuser.me/api/portraits/${gender}/${index}.jpg`);
  }, []);

  useEffect(() => {
    setOpen(matches);
  }, [matches]);

  const onlyVisibleFor = (roles: string[]) => {
    return user && roles.every((r) => user.claims.includes(r));
  };

  const menuItems = [
    {
      label: intl.formatMessage({ id: 'generic.dashboard' }),
      link: '/',
      icon: <DashboardIcon />,
      visible: true, // visible to all users
    },
    {
      label: intl.formatMessage({ id: 'generic.policyHolder' }),
      link: '/policy-holder',
      icon: <FolderIcon />,
      visible: true, //onlyVisibleFor([OrganizationTypeNames.PRODUCT_OWNER, OrganizationTypeNames.BROKER]),
    },
    {
      label: intl.formatMessage({ id: 'generic.submission' }),
      link: '/submission',
      icon: <LibraryBooksIcon />,
      visible: true,
    },
    {
      label: intl.formatMessage({ id: 'generic.policy' }),
      link: '/policy',
      icon: <DescriptionIcon />,
      visible: true,
    },
    {
      label: intl.formatMessage({ id: 'generic.claimsManagement' }),
      link: '/claims-management',
      icon: <LineStyleIcon />,
      visible: true,
    },
    {
      label: intl.formatMessage({ id: 'generic.lossManagement' }),
      link: '/loss-management',
      icon: <AutoAwesomeMotionIcon />,
      visible: true,
    },
    {
      label: intl.formatMessage({ id: 'generic.accessManagement' }),
      link: '/access-management',
      icon: <KeyIcon />,
      visible: true,
    },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLanguageChange = useCallback(
    (event: any) => {
      setLanguage(event.target.value);
    },
    [setLanguage]
  );

  return (
    <>
      <AppBar color="transparent" open={open} sx={{ boxShadow: 'none', background: '#F4F5FA' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box flexGrow={1} justifyContent={'space-between'}>
            {/* <Button component={Link} color="inherit" to="/">
              {intl.formatMessage({ id: 'home', defaultMessage: 'Home' })}
            </Button> */}
          </Box>

          <Stack spacing={1} direction="row" sx={{ mr: 3 }}>
            <Tooltip title={intl.formatMessage({ id: 'generic.help' })}>
              <IconButton component={Link} to="/help">
                <HelpIcon color="action" />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip title={intl.formatMessage({ id: 'generic.notifications' })}>
              <IconButton component={Link} to="/notifications">
                <Badge badgeContent={5} max={99} color="error">
                  <NotificationsIcon color="action" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            {user && (
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Avatar sx={{ width: '32px', height: '32px', mx: 1 }} src={randomPicture} />

                <Typography>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <IconButton
                  onClick={handleMenuOpen}
                  size="small"
                  aria-controls={isMenuOpen ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen ? 'true' : undefined}
                >
                  <KeyboardArrowDownIcon fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem component={Link} to="/settings">
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    {intl.formatMessage({ id: 'generic.settings' })}
                  </MenuItem>
                  <MenuItem onClick={signOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    {intl.formatMessage({ id: 'generic.signOut' })}
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            justifyContent: 'space-between',
            paddingLeft: '20px',
            mb: '70px',
          }}
        >
          <Typography variant={'h1'} color="primary" align="center" sx={{ opacity: open ? 1 : 0 }}>
            infoshare
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {menuItems
            .filter((item) => item.visible) // Hide menu items if the current user has no access
            .map((item, index) => (
              <NavLink to={`${item.link}`} key={index}>
                {({ isActive }) => (
                  <ListItemButton
                    selected={isActive}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: '20px',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                )}
              </NavLink>
            ))}
        </List>
        <Divider sx={{ flexGrow: '0.9', border: 'none' }} />
        <Box sx={{ pl: 2, opacity: open ? 1 : 0 }}>
          <Select size={'small'} value={language} onChange={handleLanguageChange}>
            {Object.keys(i18nLabels).map((lang) => (
              <MenuItem key={lang} value={lang}>
                {i18nLabels[lang]}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
