import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import CreateComponent from './create';
import ListComponent from './list';
import DetailComponent from "./detail";

const MangeNotifyHtml = () => {
    
    return (
        <Box sx={{ p: 3, backgroundColor: "#fff" }}>
            <Switch>
                <Route exact path={RouteEnum.PAGE.MANAGE_NOTIFY._} component={ListComponent}/>
                <Route exact path={RouteEnum.PAGE.MANAGE_NOTIFY.CREATE} component={CreateComponent}/>
                <Route exact path={RouteEnum.PAGE.MANAGE_NOTIFY.DETAIL} component={DetailComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_NOTIFY._} />
            </Switch>
        </Box>
    )
}

export default MangeNotifyHtml;