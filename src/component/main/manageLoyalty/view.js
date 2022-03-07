import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import RewardComponent from './reward'
import MemberComponent from './member'


const MangeLoyaltyHtml = () => {

    return (
        <Box sx={{ p: 3, 
            backgroundColor: "#fff" 
        }}>
            <Switch>
                <Route path={RouteEnum.PAGE.MANAGE_LOYALTY.REWARD._} component={RewardComponent}/>
                <Route path={RouteEnum.PAGE.MANAGE_LOYALTY.MEMBER._} component={MemberComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_LOYALTY.REWARD._} />
            </Switch>
        </Box>
    )
}

export default MangeLoyaltyHtml;
