import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import Helper from 'service/helper'
import AdminEnum from 'service/enum/admin'
import RouteEnum from 'service/enum/route'
import Localize from 'service//localize'

import View from 'component/main/manageAccount/admin/detail/edit/view'
import { ModelView, ModelRequest } from './model'

class CreateAdminComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleCreateAdminTempSuccess: this.handleCreateAdminTempSuccess.bind(this),
        handleRegisterTempSuccess: this.handleRegisterTempSuccess.bind(this),
        handleExistedUsername: this.handleExistedUsername.bind(this),
        handleForbidden: this.handleForbidden.bind(this),
        handleExistedEmail: this.handleExistedEmail.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
        handleCreateAdminTempExistedEmail: this.handleCreateAdminTempExistedEmail.bind(this),
        handleCreateAdminTempExistedUsername: this.handleCreateAdminTempExistedUsername.bind(this),
      },
      data: new ModelView(),
      ui: {
        data: {},
        gender: [
          {
            text: AdminEnum.GENDER_PARSE[AdminEnum.GENDER.MALE],
            value: AdminEnum.GENDER.MALE,
          },
          {
            text: AdminEnum.GENDER_PARSE[AdminEnum.GENDER.FEMALE],
            value: AdminEnum.GENDER.FEMALE,
          }
        ],
        currentGender: {

        },
        isShowBtn: false,
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      }
    }

    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)

  }
  handleSystemError() {
    try {
      Logger.info('EditPostComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleForbidden() {
    try {
      Logger.info('CreateAdminComponent execute handleForbidden')
      const { ui, timeout } = this.state
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    } catch (e) {
      Logger.error(`CreateAdminComponent handleForbidden ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleCreateAdminTempSuccess(response) {
    try {
      Logger.info('CreateAdminComponent execute handleCreateAdminTempSuccess')
      Logger.debug('CreateAdminComponent execute handleCreateAdminTempSuccess receive response', response)
      const { ui, timeout } = this.state
      timeout.setTimeout(false)
      const { toast } = this.props
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ACCOUNT_CREATE_SUCCESS") })
      this.handleOnBack()
    } catch (e) {
      Logger.error(`CreateAdminComponent handleCreateAdminTempSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleExistedUsername() {
    try {
      Logger.info('CreateAdminComponent execute handleExistedUsername')
      const { ui, timeout } = this.state
      timeout.setTimeout(false, 'email', Localize.getLocalize("LC_USERNAME_EXISTED"));
      setTimeout(() => {
        ref.username.focus()
      })
    } catch (e) {
      Logger.error(`CreateAdminComponent handleExistedUsername ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleExistedEmail() {
    try {
      Logger.info('CreateAdminComponent execute handleExistedEmail')
      const { ui, timeout, ref } = this.state
      timeout.setTimeout(false, 'email', Localize.getLocalize("LC_EMAIL_EXISTED"));
      setTimeout(() => {
        ref.email.focus()
      })
    } catch (e) {
      Logger.error(`CreateAdminComponent handleExistedEmail ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info('CreateAdminComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      ui.currentGender = !Helper.isEmpty(ui.data.gender) ? ui.gender.find(item => item.value === ui.data.gender) : ui.gender[0]
      data['gender'] = ui.currentGender.value
    }
    catch (e) {
      Logger.error(`CreateAdminComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('CreateAdminComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`CreateAdminComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('CreateAdminComponent execute handleRequest')
      const { ui, timeout, data } = this.state
      const { create } = this.props
      const payload = new ModelRequest().setGender(data['gender'])
        .setDob(data['dob'])
        .setUserName(data['username'])
        .setEmail(data['email'])
        .setFullName(data['fullName'])
        .setPhoneNumber(data['phoneNumber'])
      Logger.debug('CreateAdminComponent execute handleRequest receive payload', payload)
      create(timeout.key, payload)
    } catch (e) {
      Logger.error(`CreateAdminComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }


  handleRegisterTempSuccess(response) {
    try {
      Logger.info('CreateAdminComponent execute handleRegisterTempSuccess')
      Logger.debug('CreateAdminComponent execute handleRegisterTempSuccess receive response', response)
      const { ui, timeout, data } = this.state
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`CreateAdminComponent handleRegisterTempSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }



  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault()
      }
      Logger.info('CreateAdminComponent execute handleSubmit')
      const { ui, timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`CreateAdminComponent handleSubmit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
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
      Logger.error(`CreateAdminComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('CreateAdminComponent execute handleOnChange')
      Logger.debug('CreateAdminComponent execute handleOnChange receive name', name)
      Logger.debug('CreateAdminComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value
      if (name == 'gender') {
        ui.currentGender = ui.gender.find(item => item.value == value)
        this.setState({ ui })
      }
      let temp = { ...data }
      delete temp['phoneNumber']
      const status = (Object.values(temp).findIndex(item => item.toString() === '') == -1)
      if (status !== ui.isShowBtn) {
        ui.isShowBtn = status
        this.setState({ ui })
      }
    } catch (e) {
      Logger.error(`CreateAdminComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleCreateAdminTempExistedEmail() {
    try {
      Logger.info('CreateAdminComponent execute handleCreateAdminTempExistedEmail')
      const { ui, timeout, ref } = this.state
      timeout.setTimeout(false, 'email', "LC_EMAIL_EXISTED");
      setTimeout(setTimeout(() => {
        ref['email'].focus()
      }, 0))
    } catch (e) {
      Logger.error(`CreateAdminComponent handleCreateAdminTempExistedEmail ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleCreateAdminTempExistedUsername() {
    try {
      Logger.info('CreateAdminComponent execute handleCreateAdminTempExistedUsername')
      const { ui, timeout, ref } = this.state
      timeout.setTimeout(false, 'username', "LC_USERNAME_EXISTED");
      setTimeout(setTimeout(() => {
        ref['username'].focus()
      }, 0))
    } catch (e) {
      Logger.error(`CreateAdminComponent handleCreateAdminTempExistedUsername ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnBack() {
    try {
      Logger.info('InfoAdminComponent execute handleOnBack')
      const { ui, data } = this.state
      const { tab } = this.props.location.state
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN._, { tab: tab })
    } catch (e) {
      Logger.error(`InfoAdminComponent handleAdminIsBan ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  render() {
    const { ui, timeout } = this.state
    return <View ui={ui} timeout={timeout} handleSubmit={this.handleSubmit}
      handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange}
      handleOnBack={this.handleOnBack}
    />
  }
}

export default BaseComponent(CreateAdminComponent)