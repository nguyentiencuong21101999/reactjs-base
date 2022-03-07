/**
 * Created By Nguyen Cong Thanh on 07/24/2020 11:03.
 *
 * Copyright intelIn 2020.
 */

import React, { Component } from "react";
import { Redirect, Switch } from "react-router-dom";
import 'url-search-params-polyfill'

import BaseAction from "base/action";

import Logger from "service/logger";
import Helper from "service/helper";
import Auth from "service/auth";
import RouteEnum from "service/enum/route";
import AuthEnum from "service/enum/auth";
import Localize from 'service/localize'

import LoginRoute from "component/login/route";
import LoginComponent from "component/login";

import MainRoute from "component/main/route"
import MainComponent from "component/main"

import PasswordRoute from "component/password/route"
import PasswordComponent from "component/password"
class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info(`AppComponent execute UNSAFE_componentWillMount`);

    } catch (e) {
      Logger.error(`AppComponent execute UNSAFE_componentWillMount ${e.toString()}`);
    }
  }

  componentDidMount() {
    try {
      Logger.info(`AppComponent execute componentDidMount`);
      const { messageCenterUpdate } = this.props;
      const now = new Date().getTime();
      const expired = Auth.getPackageExpired();
      const auth = Auth.getPackageAuth();
      const role = Auth.getRole();
      Logger.debug(`AppComponent execute componentDidMount receive auth in cookies`, auth);
      if (!Helper.isEmpty(expired) && !Helper.isEmpty(auth) && !Helper.isEmpty(role) && now < auth.expireAt) {
        Auth.setRole(AuthEnum.ROLE.USER);
        BaseAction.setToken(auth.token);
        Auth.handleSetTimeoutTokenExpired(messageCenterUpdate);
      } else {
        Auth.handleLogout();
        Auth.setRole();
      }
      this.setState({ loading: false });
    } catch (e) {
      Logger.error(`AppComponent execute componentDidMount ${e.toString()}`);
    }
  }

  render() {
    const { loading, ui } = this.state;

    return (
      <>
        {loading ? null : (
          <Switch>
            <LoginRoute exact path={RouteEnum.PAGE.LOGIN} component={LoginComponent} />
            <PasswordRoute exact path={RouteEnum.PAGE.PASSWORD.RESET} component={PasswordComponent} />
            <MainRoute path={RouteEnum.PAGE.MAIN} component={MainComponent} />
            <Redirect to={Auth.getRedirect()} />
          </Switch>
        )}
      </>
    )
  }
}

export default AppComponent;
