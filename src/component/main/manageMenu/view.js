import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import CategoryComponent from './category'
import FoodComponent from './food'
import SettingComponent from './setting'


const MangeMenuHtml = () => {

    return (
        <Box sx={{ p: 3, 
            backgroundColor: "#fff" 
        }}>
            <Switch>
                <Route path={RouteEnum.PAGE.MANAGE_MENU.CATEGORY._} component={CategoryComponent}/>
                <Route path={RouteEnum.PAGE.MANAGE_MENU.FOOD._} component={FoodComponent}/>
                <Route path={RouteEnum.PAGE.MANAGE_MENU.SETTING._} component={SettingComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_MENU.CATEGORY._} />
            </Switch>
        </Box>
    )
}

export default MangeMenuHtml;
