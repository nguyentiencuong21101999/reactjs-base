
import React from 'react';
import {
    NavLink as RouterLink,
    useLocation
  } from 'react-router-dom';
  import { matchPath } from "react-router";
  import PropTypes from 'prop-types';
  import { Button, ListItem } from '@material-ui/core';

  const NavItem = ({
    href,
    icon: Icon,
    title,
    ...rest
  }) => {
    const location = useLocation();

    const active = href ? !!matchPath(location.pathname, {
      path: href,
      end: false,
      exact: true,
    }) : false;

    return (
      <ListItem
        disableGutters
        sx={{
          display: 'flex',
          py: 0
        }}
        {...rest}
      >
        <Button
          component={RouterLink}
          sx={{
            color: '#7a7a7a',
            fontWeight: 'medium',
            justifyContent: 'flex-start',
            letterSpacing: 0,
            py: 1.25,
            textTransform: 'none',
            paddingLeft: 0,
            paddingRight: 0,
            width: '100%',
            '& svg': {
              mr: 1
            }
          }}
          to={href}
        >
          {Icon && (
            <Icon size="20"  style={{
              ...(active && {
                color: '#ff8585'
              })
            }} />
          )}
          <span style={{
            ...(active && {
              color: '#ff8585'
            })
          }}>
            {title}
          </span>
        </Button>
      </ListItem>
    );
  };

  NavItem.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.elementType,
    title: PropTypes.string
  };

  export default NavItem;
