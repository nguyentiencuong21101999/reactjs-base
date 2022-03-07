/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

 import React, { Component, useState, Fragment } from 'react'
 import { Route, Redirect } from 'react-router-dom'
 
 import Auth from 'service/auth'
 import AuthEnum from 'service/enum/auth'
 
 const LoginRoute = ({ component: Component, ...rest }) => {
   return (
     <Route
       {...rest}
       render={(props) => Auth.getRole() === AuthEnum.ROLE.USER
         ? <Component {...props} />
         : <Redirect to={{
           pathname: Auth.getRedirect(),
           state: { from: props.location }
         }} />
       }
     />
   )
 }
 
 export default LoginRoute