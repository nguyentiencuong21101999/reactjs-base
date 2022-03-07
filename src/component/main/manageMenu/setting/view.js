import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import RouteEnum from 'service/enum/route';

import ListComponent from './list';
import EditMenuComponent from './detail/info/editMenu';
import DetailComponent from './detail/info';
import CreateTargetComponent from './detail/info/createTarget';
import EditTargetComponent from './detail/info/editTarget';
const SettingHtml = () => {

    return (
        <Switch>
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.SETTING._} component={ListComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.SETTING.DETAIL} component={DetailComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.SETTING.EDIT_MENU} component={EditMenuComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.SETTING.CREATE_TARGET} component={CreateTargetComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.SETTING.EDIT_TARGET} component={EditTargetComponent} />
            <Redirect to={RouteEnum.PAGE.MANAGE_MENU.FOOD._} />
        </Switch>
    )
}

export default SettingHtml;