import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import RouteEnum from 'service/enum/route';
import CreateRewardComponent from './create';
import DetailRewardComponent from './detail/info';
import EditRewardComponent from './detail/edit';
import ListRewardComponent from './list';
const RewardHtml = () => {

    return (
        <Switch>
            <Route exact path={RouteEnum.PAGE.MANAGE_LOYALTY.REWARD._} component={ListRewardComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_LOYALTY.REWARD.CREATE} component={CreateRewardComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_LOYALTY.REWARD.DETAIL} component={DetailRewardComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_LOYALTY.REWARD.EDIT} component={EditRewardComponent} />
            <Redirect to={RouteEnum.PAGE.MANAGE_LOYALTY.REWARD._} />
        </Switch>
    )
}

export default RewardHtml;