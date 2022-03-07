import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import UserComponent from './user';
import AdminComponent from './admin';

const MangeUserHtml = () => {

    return (
        <Box sx={{ p: 3, 
            backgroundColor: "#fff" 
        }}>
            <Switch>
                <Route path={RouteEnum.PAGE.MANAGE_ACCOUNT.USER._} component={UserComponent}/>
                <Route path={RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN._} component={AdminComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_ACCOUNT.USER._} />
            </Switch>
        </Box>
    )
}

export default MangeUserHtml;
