import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import RouteEnum from 'service/enum/route';

import ListComponent from './list';
import CreateComponent from './create';
import EditComponent from './detail/edit';
import DetailComponent from './detail/info';

const FoodHtml = () => {

    return (
        <Switch>
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.FOOD._} component={ListComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.FOOD.CREATE} component={CreateComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.FOOD.DETAIL} component={DetailComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_MENU.FOOD.EDIT} component={EditComponent} />
            <Redirect to={RouteEnum.PAGE.MANAGE_MENU.FOOD._} />
        </Switch>
    )
}

export default FoodHtml;