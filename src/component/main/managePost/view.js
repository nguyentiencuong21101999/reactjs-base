import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import PostComponent from './post'
import CategoryComponent from './category'
import TeachingPregnancyComponent from './teachingPregnancy'

const MangePostHtml = () => {
    
    return (
        <Box sx={{ p: 3, backgroundColor: "#fff" }}>
            <Switch>
                <Route  path={RouteEnum.PAGE.MANAGE_POST.POST._} component={PostComponent}/>
                <Route  path={RouteEnum.PAGE.MANAGE_POST.CATEGORY._} component={CategoryComponent}/>
                <Route  path={RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY._} component={TeachingPregnancyComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_POST.POST._} />
            </Switch>
        </Box>
    )
}

export default MangePostHtml;