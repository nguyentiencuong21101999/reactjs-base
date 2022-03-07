import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import RouteEnum from 'service/enum/route';
import ListComponent from './list';
import DetailComponent from './detail';
import CreateComponent from './create';

const UserHtml = () => {
    
    return (
        <Switch>
            <Route exact path={RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN._} component={ListComponent}/>
            <Route exact path={RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.CREATE} component={CreateComponent}/>
            <Route path={RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.DETAIL} component={DetailComponent}/>
            <Redirect to={RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN._} />
        </Switch>
    )
}

export default UserHtml;