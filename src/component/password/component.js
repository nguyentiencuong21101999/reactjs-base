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
import RouteEnum from 'service/enum/route'
import Helper from 'service/helper'
import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import View from './view'
import { ModelView, ModelRequest } from './model'
import Localize from 'service/localize'

class PasswordComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleGetTokenSuccess: this.handleGetTokenSuccess.bind(this),
        handleResetPasswordSuccess: this.handleResetPasswordSuccess.bind(this),
        handleTokenUsed: this.handleTokenUsed.bind(this),
        handleTokenExpired: this.handleTokenExpired.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
      ui: {
        isShowBtn: false,
        isToken: {
          current: 0,
          resetPassword: 0,
          used: 1,
          expired: 2
        }
      },
      ref: {
        username: React.createRef(),
        password: React.createRef(),
      },
      action: {
        current: 0,
        getToken: 0,
        resetPassword: 1,
      }
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleConfirmPopUp = this.handleConfirmPopUp.bind(this)
  }
  handleResetPasswordSuccess(response) {
    try {
      Logger.info('PasswordComponent execute handleResetPasswordSuccess')
      Logger.debug('PasswordComponent execute handleResetPasswordSuccess receive response', response)
      const { ref, timeout } = this.state
      const { logout, updateModal } = this.props
      logout(null)
      timeout.setTimeout(false)
      Auth.handleLogout();
      Auth.setRole();

      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.RESET_PASSWORD)
      dialog.setTitle(Localize.getLocalize("LC_SET_PASSWORD_SUCCESS_TITLE"))
      dialog.setContent(Localize.getLocalize("LC_SET_PASSWORD_SUCCESS_CONTENT"))
      dialog.setButton(Localize.getLocalize("LC_UNDERSTAND"))
      dialog.setHandleConfirm(() => {
        this.handleConfirmPopUp()
      })
      updateModal(dialog)

      // this.handleRedirectWithState(RouteEnum.PAGE.LOGIN)
    } catch (e) {
      Logger.error(`PasswordComponent handleResetPasswordSuccess ${e.toString()}`)
    }
  }

  handleTokenExpired(response) {
    try {
      Logger.info('PasswordComponent execute handleTokenExpired')
      Logger.debug('PasswordComponent execute handleTokenExpired receive response', response)
      const { ui, timeout } = this.state
      timeout.setTimeout(false)
      ui.isToken = ui.isToken.expired
      this.setState({ ui })
    } catch (e) {
      Logger.error(`PasswordComponent handleTokenExpired ${e.toString()}`)
    }
  }

  handleTokenUsed(response) {
    try {
      Logger.info('PasswordComponent execute handleTokenUsed')
      Logger.debug('PasswordComponent execute handleTokenUsed receive response', response)
      const { ui, timeout } = this.state
      timeout.setTimeout(false)
      ui.isToken = ui.isToken.used
      this.setState({ ui })
    } catch (e) {
      Logger.error(`PasswordComponent handleTokenUsed ${e.toString()}`)
    }
  }

  handleSystemError(response) {
    try {
      Logger.info('PasswordComponent execute handleAccountDoNotHaveRole')
      Logger.debug('PasswordComponent execute handleAccountDoNotHaveRole receive response', response)
      const { ref, timeout } = this.state
      timeout.setTimeout(false, 'all', "LC_SYSTEM_BUSY")
    } catch (e) {
      Logger.error(`PasswordComponent handleAccountDoNotHaveRole ${e.toString()}`)
    }
  }
  componentWillUnmount() {
    try {
      Logger.info('PasswordComponent execute componentWillUnmount')
      this.state.timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`PasswordComponent componentWillUnmount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('PasswordComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const params = window.location.href.split('?token=')
      if (Helper.isEmpty(params[1])) {
        this.handleRedirectWithState(Auth.getRedirect())
        return
      }
      data['token'] = params[1]
    } catch (e) {
      Logger.error(`PasswordComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() {
    try {
      Logger.info('PasswordComponent execute componentDidMount')
      const { ui, data, timeout, action } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`PasswordComponent componentDidMount ${e.toString()}`)
    }
  }

  handleGetTokenSuccess(response) {
    try {
      Logger.info('PasswordComponent execute handleGetTokenSuccess')
      Logger.debug('PasswordComponent execute handleGetTokenSuccess receive response', response)
      const { ui, timeout, data, action } = this.state
      const { messageCenterUpdate } = this.props

      action.current = action.resetPassword
      timeout.setTimeout(false)
      Object.keys(response).forEach(
        key => data[key] = response[key]
      )
    } catch (e) {
      Logger.error(`PasswordComponent handleGetTokenSuccess ${e.toString()}`)
    }
  }


  handleOnRef(name, element) {
    try {
      const { ref } = this.state
      ref[name] = element
      if (name === 'username') {
        ref[name].focus()
      }
    } catch (e) {
      Logger.error(`PasswordComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('PasswordComponent execute handleOnChange')
      Logger.debug('PasswordComponent execute handleOnChange receive name', name)
      Logger.debug('PasswordComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value
      let temp = { ...data }
      delete temp['token']
      delete temp['tokenId']
      const status = (Object.values(data).findIndex(item => item.toString() === '') == -1)
      if (status !== ui.isShowBtn) {
        ui.isShowBtn = status
        this.setState({ ui })
      }
    } catch (e) {
      Logger.error(`PasswordComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnSubmit(event) {
    try {
      Logger.info('PasswordComponent execute handleOnSubmit')
      if (event) event.preventDefault()
      const { timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`PasswordComponent handleOnSubmit ${e.toString()}`)
      const { timeout } = this.state
      timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('PasswordComponent execute handleRequest')
      const { timeout, data, ui, action } = this.state;
      switch (action.current) {
        case action.getToken:
          Logger.info('PasswordComponent execute handleRequest receive action getToken')
          const { getToken } = this.props
          getToken(timeout.key, data['token'])
          break;
        case action.resetPassword:
          const { reset } = this.props
          const payload = new ModelRequest()
            .setTokenId(data['tokenId'])
            .setToken(data['token'])
            .setPassword(data['password'])
          Logger.debug('PasswordComponent execute handleRequest receive action resetPassword payload', payload)
          reset(timeout.key, payload)
          break;
      }
    } catch (e) {
      Logger.error(`PasswordComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleConfirmPopUp() {
    try {
      Logger.info('PasswordComponent execute handleOnSubmit')
      const { timeout } = this.state
      this.handleRedirectWithState(RouteEnum.PAGE.LOGIN)
    } catch (e) {
      Logger.error(`PasswordComponent handleOnSubmit ${e.toString()}`)
      const { timeout } = this.state
      timeout.setTimeout(false)
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
        handleConfirmPopUp={this.handleConfirmPopUp}
      />
    )
  }
}

export default BaseComponent(PasswordComponent)
