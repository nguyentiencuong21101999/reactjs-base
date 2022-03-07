import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import SettingComponent from './setting'
import BubbleComponent from './bubble'


const MangeSettingHtml = () => {

    return (
        <Box sx={{ p: 3, 
            backgroundColor: "#fff" 
        }}>
            <Switch>
                <Route path={RouteEnum.PAGE.MANAGE_SETTING.CONFIG._} component={SettingComponent}/>
                <Route path={RouteEnum.PAGE.MANAGE_SETTING.BUBBLE._} component={BubbleComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_SETTING.CONFIG._} />
            </Switch>
        </Box>
    )
}

export default MangeSettingHtml;
