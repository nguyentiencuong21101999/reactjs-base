import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import RouteEnum from 'service/enum/route';

import ListMenuComponent from './list';
import DetailMenuComponent from './detail/info';
import CreateMenuComponent from './create'
import EditMenuComponent from './detail/edit'
const MenuHtml = () => {

    return (
        <Switch>
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.CATEGORY._} component={ListMenuComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.CATEGORY.CREATE} component={CreateMenuComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.CATEGORY.DETAIL} component={DetailMenuComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.CATEGORY.EDIT} component={EditMenuComponent} />
            <Redirect to={RouteEnum.PAGE.MANAGE_MENU.CATEGORY._} />
        </Switch>
    )
}

export default MenuHtml;