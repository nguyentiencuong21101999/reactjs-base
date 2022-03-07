import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import {
    Box,
} from '@material-ui/core';

import RouteEnum from 'service/enum/route';
import ListCategoryComponent from './list'
import CreateCategoryComponent from './create'
import DetailCategoryComponent from './detail/info'
import EditCategoryComponent from './detail/edit'

const MangeUserHtml = () => {
    
    return (
        <Box>
            <Switch>
                <Route exact  path={RouteEnum.PAGE.MANAGE_POST.CATEGORY._} component={ListCategoryComponent}/>
                <Route exact  path={RouteEnum.PAGE.MANAGE_POST.CATEGORY.CREATE} component={CreateCategoryComponent}/>
                <Route exact  path={RouteEnum.PAGE.MANAGE_POST.CATEGORY.DETAIL} component={DetailCategoryComponent}/>
                <Route exact  path={RouteEnum.PAGE.MANAGE_POST.CATEGORY.EDIT} component={EditCategoryComponent}/>
                <Redirect to={RouteEnum.PAGE.MANAGE_POST.CATEGORY._} />
            </Switch>
        </Box>
    )
}

export default MangeUserHtml;