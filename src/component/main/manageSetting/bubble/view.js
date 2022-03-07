import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import ListComponent from './list';
import CreateComponent from './create';
import EditComponent from './edit';


const MangeBubbleHtml = () => {

    return (
        <Box>
            <Switch>
                <Route exact path={RouteEnum.PAGE.MANAGE_SETTING.BUBBLE._} component={ListComponent} />
                <Route exact path={RouteEnum.PAGE.MANAGE_SETTING.BUBBLE.CREATE} component={CreateComponent} />
                <Route exact path={RouteEnum.PAGE.MANAGE_SETTING.BUBBLE.EDIT} component={EditComponent} />
                <Redirect to={RouteEnum.PAGE.MANAGE_SETTING.BUBBLE._} />
            </Switch>
        </Box>
    )
}

export default MangeBubbleHtml;