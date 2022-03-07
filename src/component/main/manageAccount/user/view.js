import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import RouteEnum from 'service/enum/route';

import ListComponent from './list';
import DetailComponent from './detail'

const UserHtml = () => {
    
    return (
        <Switch>
            <Route exact path={RouteEnum.PAGE.MANAGE_ACCOUNT.USER._} component={ListComponent}/>
            <Route path={RouteEnum.PAGE.MANAGE_ACCOUNT.USER.DETAIL} component={DetailComponent}/>
            <Redirect to={RouteEnum.PAGE.MANAGE_ACCOUNT.USER._} />
        </Switch>
    )
}

export default UserHtml;