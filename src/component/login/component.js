/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import Auth from 'service/auth'
import AuthEnum from 'service/enum/auth'

import View from './view'
import { ModelView, ModelRequest } from './model'

class LoginComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleLoginSuccess: this.handleLoginSuccess.bind(this),
        handleUserNotExisted: this.handleUserNotExisted.bind(this),
        handlePasswordWrong: this.handlePasswordWrong.bind(this),
        handleAccountDoNotHaveRole: this.handleAccountDoNotHaveRole.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
        handleAdminIsBan: this.handleAdminIsBan.bind(this),
      },
      ui: {
        isShowBtn: true,
      },
      ref: {
        username: React.createRef(),
        password: React.createRef(),
      }
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }
  handleLoginSuccess(response) {
    try {
      Logger.info('LoginComponent execute handleLoginSuccess')
      Logger.debug('LoginComponent execute handleLoginSuccess receive response', response)
      const { ui, timeout } = this.state
      const { messageCenterUpdate } = this.props
      timeout.setTimeout(false)
      response.role = AuthEnum.ROLE.USER
      Auth.handleLoginSuccess(response)
      Auth.handleSetTimeoutTokenExpired(messageCenterUpdate)
      this.handleRedirectWithState(Auth.getRedirect())
    } catch (e) {
      Logger.error(`LoginComponent handleLoginSuccess ${e.toString()}`)
    }
  }

  handleUserNotExisted(response) {
    try {
      Logger.info('LoginComponent execute handleUserNotExisted')
      Logger.debug('LoginComponent execute handleUserNotExisted receive response', response)
      const { ref, timeout } = this.state
      timeout.setTimeout(false, 'all', 'LC_LOGIN_WRONG');
      setTimeout(() => {
        ref.username.focus()
      })
    } catch (e) {
      Logger.error(`LoginComponent handleUserNotExisted ${e.toString()}`)
    }
  }

  handlePasswordWrong(response) {
    try {
      Logger.info('LoginComponent execute handlePasswordWrong')
      Logger.debug('LoginComponent execute handlePasswordWrong receive response', response)
      const { ref, timeout } = this.state
      timeout.setTimeout(false, 'all', 'LC_LOGIN_WRONG');
      setTimeout(() => {
        ref.password.focus()
      })
    } catch (e) {
      Logger.error(`LoginComponent handlePasswordWrong ${e.toString()}`)
    }
  }

  handleAccountDoNotHaveRole(response) {
    try {
      Logger.info('LoginComponent execute handleAccountDoNotHaveRole')
      Logger.debug('LoginComponent execute handleAccountDoNotHaveRole receive response', response)
      const { ref, timeout } = this.state
      timeout.setTimeout(false, 'all', 'LC_SYSTEM_BUSY')
    } catch (e) {
      Logger.error(`LoginComponent handleAccountDoNotHaveRole ${e.toString()}`)
    }
  }

  handleAdminIsBan(response) {
    try {
      Logger.info('LoginComponent execute handleAdminIsBan')
      Logger.debug('LoginComponent execute handleAdminIsBan receive response', response)
      const { ref, timeout } = this.state
      timeout.setTimeout(false, 'all', 'LC_LOGIN_BANNED_BY_ADMIN');
      setTimeout(() => {
        ref.username.focus()
      })
    } catch (e) {
      Logger.error(`LoginComponent handleAdminIsBan ${e.toString()}`)
    }
  }

  handleSystemError(response) {
    try {
      Logger.info('LoginComponent execute handleAccountDoNotHaveRole')
      Logger.debug('LoginComponent execute handleAccountDoNotHaveRole receive response', response)
      const { ref, timeout } = this.state
      timeout.setTimeout(false, 'all', 'LC_SYSTEM_BUSY')
    } catch (e) {
      Logger.error(`LoginComponent handleAccountDoNotHaveRole ${e.toString()}`)
    }
  }
  componentWillUnmount() {
    try {
      Logger.info('LoginComponent execute componentWillUnmount')
      this.state.timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`LoginComponent componentWillUnmount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('LoginComponent execute UNSAFE_componentWillMount')
      const { ui } = this.state
    } catch (e) {
      Logger.error(`LoginComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() { }



  handleOnRef(name, element) {
    try {
      const { ref } = this.state
      ref[name] = element
      if (name === 'username') {
        ref[name].focus()
      }
    } catch (e) {
      Logger.error(`LoginComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('LoginComponent execute handleOnChange')
      Logger.debug('LoginComponent execute handleOnChange receive name', name)
      Logger.debug('LoginComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value
      const status = !(Object.values(data).findIndex(item => item.toString() === '') == -1)
      if (status !== ui.isShowBtn) {
        ui.isShowBtn = status
        this.setState({ ui })
      }
    } catch (e) {
      Logger.error(`LoginComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnSubmit(event) {
    try {
      Logger.info('LoginComponent execute handleOnSubmit')
      if (event) event.preventDefault()
      const { timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`LoginComponent handleOnSubmit ${e.toString()}`)
      const { timeout } = this.state
      timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('LoginComponent execute handleRequest')
      const { timeout, data } = this.state;
      const { login } = this.props;
      const payload = new ModelRequest()
        .setUsername(data['username'])
        .setPassword(data['password'])
      Logger.debug('LoginComponent execute handleRequest receive payload', payload)
      login(timeout.key, payload)
    } catch (e) {
      Logger.error(`LoginComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  render() {
    const { timeout, ui } = this.state
    return (
      <View
        ui={ui}
        timeout={timeout}
        handleOnRef={this.handleOnRef}
        handleOnChange={this.handleOnChange}
        handleOnSubmit={this.handleOnSubmit}
      />
    )
  }
}

export default BaseComponent(LoginComponent)
