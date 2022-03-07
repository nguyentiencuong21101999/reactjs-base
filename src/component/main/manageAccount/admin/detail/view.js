import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import RouteEnum from 'service/enum/route';
import DetailComponent from './info';
import EditComponent from './edit'

const UserHtml = () => {
    
    return (
        <Switch>
            <Route exact path={RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.DETAIL} component={DetailComponent}/>
            <Route exact path={RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.EDIT} component={EditComponent}/>
            <Redirect to={RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.DETAIL } />
        </Switch>
    )
}

export default UserHtml;