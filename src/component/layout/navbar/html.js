import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';

import { useHistory } from "react-router-dom";

import Auth from 'service/auth'
import Breadcrumb from "core/breadcrumb";

const Logo = (props) => (
    <img
      alt="Logo"
      src="https://static.intelin.vn/meiji/44614270-6216-11ec-93ee-d34f159b3ce6.png"
      {...props}
    />
  );



const Navbar = ({ onMobileNavOpen, handleLogout, ui, ...rest }) => {
  const [notifications] = useState([]);

  const handleOnLogout = () => {
    handleLogout()
  }


  let history = useHistory();

  return (
    <AppBar
      elevation={0}
      {...rest}
      sx={{
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: 'rgb(34 34 34 / 10%) 0px 1px 5px',
        color: 'rgb(74, 74, 74)',
        zIndex: 911
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <RouterLink to="/">
            <Logo height={34}/>
          </RouterLink>
          <Breadcrumb history={history}/>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
          {/* noti icon */}
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton color="inherit" onClick={handleOnLogout} >
            <InputIcon/>
          </IconButton>
          </Stack>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handleOnLogout} >
            <InputIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  onMobileNavOpen: PropTypes.func, 
  handleLogout: PropTypes.func,
};

export default Navbar;
