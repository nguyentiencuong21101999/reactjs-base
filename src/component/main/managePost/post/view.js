import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import CreateComponent from './create';
import ListComponent from './list';
import DetailComponent from "./detail";

const MangeUserHtml = () => {
    
    return (
        <Box >
            <Switch>
                <Route exact path={RouteEnum.PAGE.MANAGE_POST.POST._} component={ListComponent}/>
                <Route exact path={RouteEnum.PAGE.MANAGE_POST.POST.CREATE} component={CreateComponent}/>
                <Route path={RouteEnum.PAGE.MANAGE_POST.POST.DETAIL} component={DetailComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_POST.POST._} />
            </Switch>
        </Box>
    )
}

export default MangeUserHtml;