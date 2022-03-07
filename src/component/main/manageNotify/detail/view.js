import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import RouteEnum from 'service/enum/route';
import DetailComponent from './info';

const UserHtml = () => {
    
    return (
        <Switch>
            <Route exact path={RouteEnum.PAGE.MANAGE_NOTIFY.DETAIL} component={DetailComponent}/>
            <Redirect to={RouteEnum.PAGE.MANAGE_NOTIFY.DETAIL } />
        </Switch>
    )
}

export default UserHtml;