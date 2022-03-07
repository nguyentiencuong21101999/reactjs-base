import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  Button,
  Stack
} from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import {
  Dashboard, PeopleOutlineOutlined, AdminPanelSettingsOutlined,
  MenuBookOutlined, Notifications, FitnessCenterOutlined, LoyaltyOutlined, EmojiPeopleOutlined,
  CategoryOutlined, SettingsApplicationsOutlined, PregnantWomanOutlined, FoodBankOutlined, FastfoodOutlined, InfoOutlined
  , SettingsSuggestOutlined
} from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';

import RouteEnum from 'service/enum/route';
import AdminEnum from 'service/enum/admin';
import NavItem from '../navItem';
import Auth from 'service/auth'
import Helper from 'service/helper'
import Localize from "service/localize"
import Copyright from 'core/hook/footer'

const items = [
  {
    list: [
      {
        href: RouteEnum.PAGE.DASHBOARD,
        title: Localize.getLocalize("LC_DASHBOARD"),
        icon: Dashboard
      }
    ],
    divider: true
  },
  {
    header: Localize.getLocalize("LC_ACCOUNT_MANAGE"),
    list: [
      {
        href: RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN._,
        title: Localize.getLocalize("LC_ADMIN"),
        icon: AdminPanelSettingsOutlined
      },
      {
        href: RouteEnum.PAGE.MANAGE_ACCOUNT.USER._,
        title: Localize.getLocalize("LC_USER"),
        icon: PeopleOutlineOutlined
      },
    ],
    divider: true
  },
  {
    header: Localize.getLocalize("LC_POST_MANAGE"),
    list: [
      {
        href: RouteEnum.PAGE.MANAGE_POST.CATEGORY._,
        title: Localize.getLocalize("LC_CATEGORY"),
        icon: CategoryOutlined

      },
      {
        href: RouteEnum.PAGE.MANAGE_POST.POST._,
        title: Localize.getLocalize("LC_POST"),
        icon: MenuBookOutlined
      },
      {
        href: RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY._,
        title: Localize.getLocalize("LC_PRENATAL_EDU"),
        icon: PregnantWomanOutlined
      },
    ],
    divider: true
  },
  {
    list: [
      {
        href: RouteEnum.PAGE.MANAGE_NOTIFY._,
        title: Localize.getLocalize("LC_NOTI"),
        icon: Notifications,
      },
    ],
    divider: true
  },
  {
    list: [
      {
        href: RouteEnum.PAGE.MANAGE_CHALLENGE._,
        title: Localize.getLocalize("LC_CHALLENGE"),
        icon: FitnessCenterOutlined,
      },
    ],
    divider: true
  },
  {
    header: Localize.getLocalize("LC_LOYALTY_MANAGE"),
    list: [

      {
        href: RouteEnum.PAGE.MANAGE_LOYALTY.REWARD._,
        title: Localize.getLocalize("LC_REWARD"),
        icon: LoyaltyOutlined
      },
      {
        href: RouteEnum.PAGE.MANAGE_LOYALTY.MEMBER._,
        title: Localize.getLocalize("LC_MEMBER"),
        icon: EmojiPeopleOutlined
      },
    ],
    divider: true
  },
  {
    header: Localize.getLocalize("LC_MENU_MANAGE"),
    list: [
      {
        href: RouteEnum.PAGE.MANAGE_MENU.CATEGORY._,
        title: Localize.getLocalize("LC_CATEGORY"),
        icon: FoodBankOutlined
      },
      {
        href: RouteEnum.PAGE.MANAGE_MENU.FOOD._,
        title: Localize.getLocalize("LC_FOOD"),
        icon: FastfoodOutlined
      },
      {
        href: RouteEnum.PAGE.MANAGE_MENU.SETTING._,
        title: Localize.getLocalize("LC_CONFIG"),
        icon: SettingsSuggestOutlined
      }
    ],
    divider: true
  },
  {
    header: Localize.getLocalize("LC_CONFIG_MANAGE"),
    list: [
      {
        href: RouteEnum.PAGE.MANAGE_SETTING.CONFIG._,
        title: Localize.getLocalize("LC_SYSTEM"),
        icon: SettingsApplicationsOutlined,
      },
      {
        href: RouteEnum.PAGE.MANAGE_SETTING.BUBBLE._,
        title: Localize.getLocalize("LC_BUBBLE"),
        icon: InfoOutlined,
      },
    ],
    divider: false
  },
];

const Sidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(Auth.getPackageProfile());
  }, [])

  const handleRedirectProfile = (e) => {
    if (e) {
      e.preventDefault()
    }
    history.push("/profile", user);
  }

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        {!Helper.isEmptyObject(user) && user.avatar ? <Avatar
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
        /> : <Avatar>{!Helper.isEmptyObject(user) && user.username ? user.username[0] : "-"}</Avatar>}
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.username || "-"}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="flex-end">
          <Typography
            color="textSecondary"
            variant="body2"
            sx={{ display: 'flex', alignItems: 'flex-start' }}
          >
            {!Helper.isEmpty(user.userType) ? AdminEnum.USER_TYPE_PARSE[user.userType] : "-"}
            <EditIcon fontSize="inherit" onClick={handleRedirectProfile} sx={{ cursor: 'pointer', marginLeft: '5px' }} />
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: '23px', height: '100%' }}>
        <List
          sx={{
            '& li': { padding: 0 }
          }}
        >
          {items.map((item, index) => (
            <Fragment key={index}>
              {item.header ? <ListSubheader>{item.header}</ListSubheader> : null}
              {item.list.map((prop) => (
                <NavItem
                  href={prop.href}
                  key={prop.title}
                  title={prop.title}
                  icon={prop.icon}
                />
              ))}
              {item.divider ? <Divider /> : null}
            </Fragment>
          ))}
        </List>
        <Box sx={{ flexDirection: 'column', flexGrow: 1 }}>
          <Divider />
          <Box sx={{ height: 63, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>

    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

Sidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

Sidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default Sidebar;
