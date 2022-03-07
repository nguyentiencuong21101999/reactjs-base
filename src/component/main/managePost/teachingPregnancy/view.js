import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import ListTeachingPregnancyComponent from './list'
import CreateTeachingPregnancyComponent from './create'
import DetailTeachingPregnancyComponent from './detail/info'
import EditTeachingPregnancyComponent from './detail/edit'

const MangeUserHtml = () => {
    
    return (
        <Box>
            <Switch>
                <Route exact  path={RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY._} component={ListTeachingPregnancyComponent}/>
                <Route exact  path={RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY.CREATE} component={CreateTeachingPregnancyComponent}/>
                <Route exact  path={RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY.DETAIL} component={DetailTeachingPregnancyComponent}/>
                <Route exact  path={RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY.EDIT} component={EditTeachingPregnancyComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY._} />
            </Switch>
        </Box>
    )
}

export default MangeUserHtml;