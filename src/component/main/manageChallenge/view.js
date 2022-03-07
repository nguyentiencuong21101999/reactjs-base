import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import CreateComponent from './create';
import ListComponent from './list';
import DetailComponent from "./detail";

const MangeChallengeHtml = () => {
    
    return (
        <Box sx={{ p: 3, backgroundColor: "#fff" }}>
            <Switch>
                <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE._} component={ListComponent}/>
                <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.CREATE} component={CreateComponent}/>
                <Route path={RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL} component={DetailComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_CHALLENGE._} />
            </Switch>
        </Box>
    )
}

export default MangeChallengeHtml;