import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import RouteEnum from 'service/enum/route';
import ListMemComponent from './list';
import DetailComponent from './detail/info'
const UserHtml = () => {

    return (
        <Switch>
            <Route exact path={RouteEnum.PAGE.MANAGE_LOYALTY.MEMBER._} component={ListMemComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_LOYALTY.MEMBER.DETAIL} component={DetailComponent} />
            <Redirect to={RouteEnum.PAGE.MANAGE_LOYALTY.MEMBER._} />
        </Switch>
    )
}

export default UserHtml;