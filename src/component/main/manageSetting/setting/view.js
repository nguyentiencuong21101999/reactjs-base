import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import ListComponent from './list';


const MangeUserHtml = () => {
    
    return (
        <Box>
            <Switch>
                <Route exact path={RouteEnum.PAGE.MANAGE_SETTING.CONFIG._} component={ListComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_SETTING.CONFIG._} />
            </Switch>
        </Box>
    )
}

export default MangeUserHtml;